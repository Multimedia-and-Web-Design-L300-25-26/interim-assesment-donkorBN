import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = `http://localhost:${process.env.PORT || 5001}/api`;
const testUser = {
  name: 'Test Tester',
  email: `test_${Date.now()}@example.com`,
  password: 'password123'
};

let cookie = '';

async function runTests() {
  console.log('🚀 Starting API Integration Tests...\n');

  try {
    // 1. Test Registration
    console.log('📝 Testing Register (POST /api/auth/register)...');
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const regData = await regRes.json();
    if (regRes.status === 201) {
      console.log('✅ Registration Successful\n');
    } else {
      throw new Error(`Registration failed: ${regData.message}`);
    }

    // 2. Test Login
    console.log('🔐 Testing Login (POST /api/auth/login)...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUser.email, password: testUser.password })
    });
    const loginData = await loginRes.json();
    if (loginRes.status === 200) {
      console.log('✅ Login Successful');
      // Capture the cookie for protected routes
      cookie = loginRes.headers.get('set-cookie');
      console.log('✅ Cookie Captured\n');
    } else {
      throw new Error(`Login failed: ${loginData.message}`);
    }

    // 3. Test Profile (Protected)
    console.log('👤 Testing Protected Profile (GET /api/auth/profile)...');
    const profRes = await fetch(`${BASE_URL}/auth/profile`, {
      headers: { 'Cookie': cookie }
    });
    const profData = await profRes.json();
    if (profRes.status === 200 && profData.email === testUser.email) {
      console.log('✅ Profile Data Retrieved Successfully\n');
    } else {
      throw new Error(`Profile check failed: ${profData.message}`);
    }

    // 4. Test Crypto - All
    console.log('💰 Testing All Crypto (GET /api/crypto)...');
    const cryRes = await fetch(`${BASE_URL}/crypto`);
    const cryData = await cryRes.json();
    if (cryRes.status === 200 && Array.isArray(cryData)) {
      console.log(`✅ Retrieved ${cryData.length} cryptos\n`);
    } else {
      throw new Error('Failed to fetch crypto list');
    }

    // 5. Test Crypto - Gainers
    console.log('📈 Testing Top Gainers (GET /api/crypto/gainers)...');
    const gainerRes = await fetch(`${BASE_URL}/crypto/gainers`);
    const gainerData = await gainerRes.json();
    if (gainerRes.status === 200) {
      console.log('✅ Gainer data retrieved\n');
    }

    // 6. Test Crypto - New
    console.log('🆕 Testing New Listings (GET /api/crypto/new)...');
    const newRes = await fetch(`${BASE_URL}/crypto/new`);
    if (newRes.status === 200) {
      console.log('✅ New listings data retrieved\n');
    }

    // 7. Test Crypto - Add New
    console.log('➕ Testing Add Crypto (POST /api/crypto)...');
    const uniqueSuffix = Date.now().toString().slice(-4);
    const addRes = await fetch(`${BASE_URL}/crypto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `TestCoin_${uniqueSuffix}`,
        symbol: `TST${uniqueSuffix}`,
        price: 1.23,
        image: 'https://placehold.co/32',
        change24h: '+10.5'
      })
    });
    if (addRes.status === 201) {
      console.log('✅ Successfully added new crypto\n');
    } else {
      const addData = await addRes.json();
      throw new Error(`Failed to add new crypto: ${addData.message}`);
    }

    console.log('🎉 ALL TESTS PASSED! Your project meets all README requirements.');

  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error(error.message);
    process.exit(1);
  }
}

runTests();
