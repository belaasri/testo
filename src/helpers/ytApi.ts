export async function ytApi(ytId: string) {
  try {
    const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${ytId}`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com',
      },
    }
    const response = await fetch(url, options)
    const result = await response.json()
    
    // Add a fallback for thumbnail if it's not available
    if (!result.thumbnail || !Array.isArray(result.thumbnail) || result.thumbnail.length === 0) {
      result.thumbnail = [{ url: '/placeholder.svg' }]
    }
    
    return result
  } catch (error) {
    throw new Error(`Failed to fetch YouTube data: ${error.message}`)
  }
}
