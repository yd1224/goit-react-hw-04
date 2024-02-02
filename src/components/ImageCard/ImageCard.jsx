import css from "./ImageCard.module.css";
export const ImageCard = ({ img, desc }) => {
  return (
    <div>
      <img className={css.img} src={img} alt={desc} width={350} height={240} />
    </div>
  );
};
