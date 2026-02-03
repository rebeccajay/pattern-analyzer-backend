# Pattern Analyzer Backend

Backend API for analyzing patterns submitted from the mobile app.

## API Endpoint

`POST /api/analyze`

### Request Body
```json
{
  "pattern": "your pattern text here"
}
```

### Response
```json
{
  "analysis": "Analysis results as text",
  "metadata": {
    "wordCount": 10,
    "charCount": 50,
    "lineCount": 3,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to https://vercel.com
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Click "Deploy"

Your API will be available at: `https://your-project-name.vercel.app/api/analyze`

## Update Your React Native App

After deployment, update the fetch URL in your PatternHelperScreen.tsx:

```typescript
const response = await fetch('https://your-project-name.vercel.app/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ pattern: currentPattern }),
});
```

## Local Development

```bash
npm install -g vercel
vercel dev
```

The API will be available at `http://localhost:3000/api/analyze`
