import css from "./ImageGallery.module.css";
import { ImageCard } from "../ImageCard/ImageCard";

export const ImageGallery = ({ arr }) => {
  return (
    <ul className={css.list}>
      {arr.map((item) => (
        <li key={item.id} className={css.listItem}>
          <ImageCard
            img={item.urls.small}
            desc={item.alt_description}
            text={item.description}
            likes={item.likes}
          />
        </li>
      ))}
    </ul>
  );
};
