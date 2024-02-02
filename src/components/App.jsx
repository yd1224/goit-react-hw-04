import "./ SearchBar/SearchBar";
import "./ImageGallery/ImageGallery";
import { SearchBar } from "./ SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import { FetchImages } from "../api";

function App() {
  const [query, SetQuery] = useState("");
  const [page, SetPage] = useState(1);
  const [data, Setdata] = useState({
    items: [],
    loading: false,
    error: false,
  });
  const SearchImages = async (newQuery) => {
    SetQuery(`${Date.now()}/${newQuery}`);
    SetPage(1);
    Setdata({
      items: [],
      loading: true,
      error: false,
    });
  };
  const handleLoadMore = () => {
    SetPage(page + 1);
  };
  useEffect(() => {
    if (query === "") {
      return;
    }
    async function FetchData() {
      try {
        Setdata((prev) => ({ ...prev, loading: true, error: false }));

        const response = await FetchImages(query, page);

        console.log(response);
        Setdata((prev) => {
          return { ...prev, items: [...prev.items, ...response] };
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
    }
    FetchData();
    console.log(query);
  }, [query, page]);
  return (
    <>
      <SearchBar onSearch={SearchImages} />
      {data.error && <p className="error">Ooooops... Try reloading the page</p>}
      {data.items.length > 0 && <ImageGallery arr={data.items} />}
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
      {data.items.length > 0 && !data.loading && (
        <button onClick={handleLoadMore} className="app-btn">
          Load more
        </button>
      )}

      <Toaster position="top-right"></Toaster>
    </>
  );
}

export default App;
