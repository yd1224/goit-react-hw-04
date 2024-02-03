import axios from "axios";
const YOUR_ACCESS_KEY = "fXQHg9ptFikyE-Qr2hmDcUEOUtfUMXVDow0dA66Idg4";
export const FetchImages = async (query, page) => {
   const response = await axios.get(
          `https://api.unsplash.com/search/photos?`,
          {
            params: {
              query: query.split("/")[1],
              lang: "en",
              page,
              per_page: 20,
              client_id: YOUR_ACCESS_KEY,
            },
          }
  ); 
  console.log(response.data);
    return response.data;
}