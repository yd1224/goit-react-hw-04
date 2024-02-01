import "./ SearchBar/SearchBar";
import "./ImageGallery/ImageGallery";
import { SearchBar } from "./ SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import axios from "axios";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
const YOUR_ACCESS_KEY = "fXQHg9ptFikyE-Qr2hmDcUEOUtfUMXVDow0dA66Idg4";
function App() {
  const [data, Setdata] = useState({
    items: [],
    loading: false,
    error: false,
  });
  const SearchImages = async (query) => {
    try {
      Setdata({
        items: [],
        loading: true,
        error: false,
      });

      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${YOUR_ACCESS_KEY}&query=${query}&lang=en`
      );

      console.log(response.data.results);
      Setdata((prev) => {
        return { ...prev, items: response.data.results };
      });
    } catch (error) {
      Setdata((prev) => {
        return { ...prev, error: true };
      });
    } finally {
      Setdata((prev) => {
        return { ...prev, loading: false };
      });
    }
  };
  return (
    <>
      <SearchBar onSearch={SearchImages} />
      {data.loading && (
        <div className="color-ring-wrapper-box">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}
      {data.items.length > 0 && <ImageGallery arr={data.items} />}
    </>
  );
}

export default App;
