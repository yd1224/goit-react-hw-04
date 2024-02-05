import "./ SearchBar/SearchBar";
import "./ImageGallery/ImageGallery";
import { SearchBar } from "./ SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { useEffect, useState, useRef } from "react";
import { ColorRing } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import { FetchImages } from "../api";
import { useMyCtx } from "../langContext";

function App() {
  const ctxValue = useMyCtx();
  console.log(ctxValue);
  const [query, SetQuery] = useState("");
  const [ShowBtn, SetShowBtn] = useState(true);
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

        const response_ = await FetchImages(query, page);
        const response = response_.results;
        console.log(response);
        Setdata((prev) => {
          return { ...prev, items: [...prev.items, ...response] };
        });
        SetShowBtn(true);
        if (page >= Math.floor(response_.total / 20)) {
          SetShowBtn(false);
        }
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
  /////////////////////
  // const buttoRef = useRef();

  // useEffect(() => {
  //   console.log(buttoRef.current);
  // });
  // const handleClick = () => {
  //   console.log(buttoRef.current);
  // };
  // const [clicks, setClicks] = useState(0);
  // const valueRef = useRef(0);
  // const handleClick = () => {
  //   setClicks(clicks + 1);
  //   console.log(valueRef);
  // };
  // const changeRef = () => {
  //   valueRef.current += 1;
  // };
  // const intervalRef = useRef();
  // useEffect(() => {
  //   intervalRef.current = window.setInterval(() => {
  //     console.log(Date.now());
  //   }, 2000);
  //   return () => {
  //     window.clearInterval(intervalRef.current);
  //   };
  // }, []);
  // const StopInterval = () => {
  //   window.clearInterval(intervalRef.current);
  // };
  ///////////////////////
  const SearchRef = useRef();
  const handleScroll = () => {
    const dims = SearchRef.current.getBoundingClientRect();

    window.scrollTo({
      top: dims.top,
      behavior: "smooth",
    });
  };
  return (
    <>
      <SearchBar ref={SearchRef} onSearch={SearchImages} />
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

      {data.items.length > 0 && !data.loading && ShowBtn && (
        <button onClick={handleLoadMore} className="app-btn">
          Load more
        </button>
      )}
      <Toaster position="top-right"></Toaster>
      {/* <button onClick={handleClick}>
        Click {clicks} {valueRef.current}
      </button>
      <button onClick={changeRef}>Ref {valueRef.current}</button> */}
      {/* <button onClick={StopInterval}>Stop Interval</button> */}
      {data.items.length > 0 && (
        <button onClick={handleScroll} className="scroll">
          Scroll to top
        </button>
      )}
    </>
  );
}

export default App;
