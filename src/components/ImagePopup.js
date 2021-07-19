function ImagePopup(props) {
  const className = `popup popup_dark ${props.card.isOpen ? 'popup_visible' : ''}`;

  //куда исчезла кнопка закрыть блин время час ночи
  return (
    <section className={className} id="popup-image">
      <figure className="popup__figure">
        <button
          className="button popup__close-button"
          type="button"
          onClick={props.onClose}>
        </button>
        <img className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
