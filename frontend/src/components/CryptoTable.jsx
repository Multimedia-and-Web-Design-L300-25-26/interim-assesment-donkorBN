import { useState, useEffect } from 'react';
import api from '../api/axios';

const tabs = ['Tradable', 'Top gainers', 'New on Crypto App'];

/* ── Helpers ── */
const formatPrice = (price) => {
	if (price == null) return '--';
	return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/* ── Icons ── */
const ArrowDown = () => (
	<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
		<path d="M9.5 8.5L2.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M9.5 3.5V8.5H4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);
const ArrowUp = () => (
	<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
		<path d="M2.5 3.5L9.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M2.5 8.5V3.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
);

/* ── Asset row ── */
const AssetRow = ({ asset }) => {
	const changeStr = asset.change24h;
	const isNegative = changeStr.startsWith('-');
	const changeValue = Math.abs(parseFloat(changeStr.replace('%', '')));
	const changeColorClass = isNegative ? 'text-[#F0616D]' : 'text-[#27AD75]';

	return (
		<div className="flex flex-col w-full py-4 border-b border-white/[0.08] transition-colors duration-150 hover:bg-white/[0.04] rounded-lg cursor-pointer">
			<div className="flex items-center justify-between w-full gap-4">
				{/* Icon + name */}
				<div className="flex items-center gap-4 min-w-0 grow">
					<img
						src={asset.image}
						alt={asset.name}
						width="32"
						height="32"
						className="shrink-0 rounded-full bg-gray-80"
						onError={(e) => {
							e.currentTarget.src = `https://placehold.co/32x32/32353D/ffffff?text=${asset.symbol.slice(0, 2)}`;
						}}
					/>
					<div>
						<p className="text-xl font-semibold text-white m-0 truncate">{asset.name}</p>
						<p className="text-sm text-gray-40 m-0 uppercase">{asset.symbol}</p>
					</div>
				</div>

				{/* Price + change */}
				<div className="flex flex-col items-end px-2 py-0.5">
					<span className="text-base font-normal text-white">{formatPrice(asset.price)}</span>

					<div className={`flex items-center gap-1 mt-1 ${changeColorClass}`}>
						{isNegative ? <ArrowDown /> : <ArrowUp />}
						<span className="text-base leading-[1em] font-normal tabular-nums">
							{changeValue.toFixed(2)}%
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

/* ── Skeleton ── */
const SkeletonRow = () => (
	<div className="flex items-center justify-between w-full py-4 border-b border-white/[0.08] animate-pulse">
		<div className="flex items-center gap-4">
			<div className="w-8 h-8 rounded-full bg-gray-80" />
			<div className="w-24 h-5 rounded bg-gray-80" />
		</div>
		<div className="flex flex-col items-end gap-1">
			<div className="w-20 h-4 rounded bg-gray-80" />
			<div className="w-14 h-3 rounded bg-gray-80" />
		</div>
	</div>
);

/* ── Main ── */
const CryptoTable = () => {
	const [activeTab, setActiveTab] = useState('Tradable');
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCoins = async () => {
			setLoading(true);
			try {
				let endpoint = '/crypto';
				if (activeTab === 'Top gainers') endpoint = '/crypto/gainers';
				if (activeTab === 'New on Crypto App') endpoint = '/crypto/new';

				const { data } = await api.get(endpoint);
				setCoins(data);
				setError(null);
			} catch (err) {
				setError('Failed to load crypto data');
			} finally {
				setLoading(false);
			}
		};

		fetchCoins();
	}, [activeTab]);

	return (
		<div className="flex flex-col w-full bg-[#16181C] border border-[#23262B] rounded-2xl p-6 min-h-[538px]">
			{/* Tabs */}
			<div className="flex gap-4 mb-4">
				<div className="flex flex-row items-center relative w-fit" role="tablist">
					{tabs.map((tab) => {
						const isActive = activeTab === tab;
						return (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								role="tab"
								aria-selected={isActive}
								className={`
									flex items-center justify-center px-4 h-10 min-w-[100px]
									border-none rounded-full whitespace-nowrap
									text-label-1 cursor-pointer transition-all duration-200
									${isActive
										? 'bg-[#0052FF] text-white'
										: 'bg-transparent text-gray-40 hover:bg-white/10 hover:text-white'
									}
								`}
							>
								{tab}
							</button>
						);
					})}
				</div>
			</div>

			{/* List */}
			<div className="flex flex-col">
				{loading ? (
					<>
						<SkeletonRow /><SkeletonRow /><SkeletonRow />
						<SkeletonRow /><SkeletonRow /><SkeletonRow />
					</>
				) : error ? (
					<div className="flex items-center justify-center py-12">
						<p className="text-gray-40 text-sm text-center">
							{error}<br />Check your connection.
						</p>
					</div>
				) : coins.length === 0 ? (
					<div className="flex items-center justify-center py-12 text-gray-40 text-sm">
						No cryptocurrencies found.
					</div>
				) : (
					coins.map((asset) => (
						<AssetRow key={asset._id} asset={asset} />
					))
				)}
			</div>
		</div>
	);
};

export default CryptoTable;
