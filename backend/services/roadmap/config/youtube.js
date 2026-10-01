

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

//search videos by keyword
const searchVideos = async (topic) => {
    try{
        //  1. Search Sheryians Codings first
        let query = `sheryians coding ${topic}`
        let { data } =  await axios.get(BASE_URL, {
            params:{
                part: 'snippet',
                key: process.env.YOUTUBE_API_KEY,
                q: query,
                type: 'video',
                maxResults: 1,
            }
        })
          
        //if sheryians coding has a result
        if(data.items.length > 0){
            const video = data.items[0];

            if(
                video.snippet.channelTitle
                .toLowerCase()
                .includes("sheryians coding")
            ){
                return {
                    title: video.snippet.title,
                    channel: video.snippet.channelTitle,
                    url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                }
            }
        }

        //generally search - if result is empty or not from sheryians coding channel then return specific video
        query = `${topic} tutorial `;
        ({ data } = await axios.get(BASE_URL, {
            params:{
                part: 'snippet',
                key: process.env.YOUTUBE_API_KEY,
                q: query,
                type: 'video',
                maxResults: 1,
            }
        }));
        
        //if result found return video
        if(data.items.length > 0){
            const video = data.items[0];

            return {
                title: video.snippet.title,
                channel: video.snippet.channelTitle,
                url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            }
        }

        return null

    }catch (error) {
        console.error('Error searching videos:', error);
        throw error;
    }
}

export default searchVideos;