import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT ?? 4000;

if (!process.env.API_TOKEN) {
  console.error('❌ API_TOKEN is not set in .env');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
