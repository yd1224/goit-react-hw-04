import css from "./ImageCard.module.css";
export const ImageCard = ({ img, desc, text, likes }) => {
  return (
    <div>
      <img className={css.img} src={img} alt={desc} width={372} height={240} />
    </div>
  );
};
