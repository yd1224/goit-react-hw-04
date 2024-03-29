import css from "./SearchBar.module.css";
import toast from "react-hot-toast";
import { forwardRef } from "react";
export const SearchBar = forwardRef((props, ref) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.elements.query.value.trim() === "") {
      toast.error("Empty string!");
      return;
    }
    props.onSearch(event.target.elements.query.value);
    event.target.reset();
  };
  return (
    <header className={css.header}>
      <form ref={ref} className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
});
