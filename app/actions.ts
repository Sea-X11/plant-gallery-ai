interface PixabayResponse {
  hits: Array<{
    id: number
    webformatURL: string
    largeImageURL: string
    tags: string
    user: string
  }>
  total: number
  totalHits: number
}

interface PlantRecommendation {
  name: string
  recommendation: string
}

export async function fetchPlantImages(query: string = 'plants', page: number = 1) {
  try {
    const response = await fetch(`/api/plant-images?query=${encodeURIComponent(query)}&page=${page}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data: PixabayResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching plant images:', error);
    throw new Error('Failed to fetch images');
  }
}

export async function getPlantRecommendation(query: string, imageData?: string): Promise<PlantRecommendation[]> {
  try {
    const response = await fetch('/api/plant-recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, imageData }),
    });

    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    const plantRecommendations: PlantRecommendation[] = await response.json();
    return plantRecommendations;
  } catch (error) {
    console.error('Error getting plant recommendations:', error);
    throw error;
  }
}

