import css from "./ImageGallery.module.css";
import { ImageCard } from "../ImageCard/ImageCard";
import Modal from "react-modal";
import { useState } from "react";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
export const ImageGallery = ({ arr }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, SetUrl] = useState("");
  const [altdesc, SetaltDesc] = useState("");
  const [name, SetName] = useState("");
  const [likes, SetLikes] = useState("");
  const [insta, SetInst] = useState("");
  function openModal(url, altdesc, likes, name, insta) {
    setIsOpen(true);
    SetUrl(url);
    SetaltDesc(altdesc);
    SetName(name);
    SetLikes(likes);
    SetInst(insta);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "green";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="div">
      <ul className={css.list}>
        {arr.map((item) => (
          <li
            onClick={() =>
              openModal(
                item.urls.regular,
                item.alt_description,
                item.likes,
                item.user.name,
                item.user.instagram_username
              )
            }
            key={item.id}
            className={css.listItem}
          >
            <ImageCard img={item.urls.small} desc={item.alt_description} />
          </li>
        ))}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <img src={url} alt={altdesc} width={450} height={300}></img>
          {likes && <p>Likes: {likes}</p>}
          {name && <p>Author: {name}</p>}
          {insta && <p>User instagram: {insta}</p>}
        </Modal>
      </ul>
    </div>
  );
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function App() {
  return <div>{/* <button onClick={openModal}>Open Modal</button> */}</div>;
}

export default App;
