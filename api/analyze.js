export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pattern } = req.body;

    if (!pattern || typeof pattern !== 'string') {
      return res.status(400).json({ error: 'Pattern is required and must be a string' });
    }

    // Analyze the pattern
    const lines = pattern.split('\n').filter(line => line.trim());
    const words = pattern.split(/\s+/).filter(word => word);
    const wordCount = words.length;
    const charCount = pattern.length;
    const lineCount = lines.length;

    // Build analysis response
    let analysisText = `Pattern Analysis Results:\n\n`;
    analysisText += `📊 Statistics:\n`;
    analysisText += `• Total characters: ${charCount}\n`;
    analysisText += `• Word count: ${wordCount}\n`;
    analysisText += `• Line count: ${lineCount}\n`;
    analysisText += `• Average words per line: ${lineCount > 0 ? Math.round(wordCount / lineCount) : 0}\n\n`;

    // Pattern insights
    analysisText += `🔍 Insights:\n`;
    
    if (pattern.match(/TODO|FIXME|HACK|NOTE/i)) {
      analysisText += `• Contains action items or notes\n`;
    }
    
    if (pattern.match(/\d+/)) {
      analysisText += `• Contains numerical data\n`;
    }

    if (pattern.match(/[A-Z]{2,}/)) {
      analysisText += `• Contains acronyms or constants\n`;
    }

    if (lineCount > 20) {
      analysisText += `• Complex pattern detected (${lineCount} lines)\n`;
    } else if (lineCount > 10) {
      analysisText += `• Medium complexity pattern\n`;
    } else {
      analysisText += `• Simple pattern structure\n`;
    }

    if (wordCount > 100) {
      analysisText += `• Detailed content (${wordCount} words)\n`;
    }

    // Check for common patterns
    if (pattern.match(/function|const|let|var|class/i)) {
      analysisText += `• Appears to contain code\n`;
    }

    analysisText += `\n✅ Analysis completed successfully`;

    return res.status(200).json({ 
      analysis: analysisText,
      metadata: {
        wordCount,
        charCount,
        lineCount,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ 
      error: 'Failed to analyze pattern',
      message: error.message 
    });
  }
}
