import { NextRequest, NextResponse } from 'next/server';

interface GeminiResponse {
  RecommendedPlants: Array<{
    'Plant Name': string;
    'Recommendation'?: string;
  }>;
}

export async function POST(request: NextRequest) {
  const { query, imageData } = await request.json();

  if (!query && !imageData) {
    return NextResponse.json({ error: 'Query or image data is required' }, { 
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    let geminiRequestBody: any = {
      contents: [
        {
          role: 'user',
          parts: [
            { 
              text: `You are a plant expert. Analyze the provided ${imageData ? 'image' : 'query'} and give plant recommendations in JSON format:\n\n{ "RecommendedPlants": [ { "Plant Name": "string", "Recommendation": "Short description of care, growing conditions, and any specific observations if an image is provided." } ] }\n\nKeep answers practical and location-specific if mentioned. ${query ? `The query is: ${query}` : ''}`
            }
          ]
        }
      ]
    };

    if (imageData) {
      geminiRequestBody.contents[0].parts.push({
        inline_data: {
          mime_type: 'image/jpeg',
          data: imageData
        }
      });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(geminiRequestBody)
      }
    );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Gemini API error:', geminiResponse.status, JSON.stringify(errorData, null, 2));
      throw new Error(`Failed to get recommendations: ${geminiResponse.status} ${errorData.error?.message || 'Unknown error'}`);
    }

    const geminiData = await geminiResponse.json();
    const recommendationsText = geminiData.candidates[0].content.parts[0].text;
    const cleanJson = recommendationsText.replace(/\`\`\`json\n|\n\`\`\`/g, '').trim();
    
    let parsedResponse: GeminiResponse;
    try {
      parsedResponse = JSON.parse(cleanJson);
      if (!parsedResponse.RecommendedPlants || !Array.isArray(parsedResponse.RecommendedPlants)) {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (parseError) {
      console.error('Error parsing recommendations:', parseError);
      throw new Error('Failed to parse plant recommendations');
    }

    const plantRecommendations = parsedResponse.RecommendedPlants.map(plant => ({
      name: plant['Plant Name'],
      recommendation: plant['Recommendation']
    }));

    return NextResponse.json(plantRecommendations, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Error getting plant recommendations:', error);
    return NextResponse.json({ error: 'Failed to get plant recommendations' }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

