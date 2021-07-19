import React from "react";
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
//update
//прокинем сюда пропсы про card owner

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButton = isOwn
    ? (<button className="place__button-remove" type="button" onClick={handleDeleteClick} />)
    : (null);
  const isLiked = props.card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${isLiked
    ? ('places__like_active')
    : ''}`;

  //вынесем сюда открытие по клику
  //gallery
  function handleImageClick() {
    props.handleClick(props.card)
  }
  //like
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  //delete
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
  return (
    <article className="place">
      <img
        className="place__photo"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleImageClick}
      />

      {cardDeleteButton}
      <div className="place__textarea">
        <h2 className="place__text">{props.card.name}</h2>
        <div className="place__column-block">
        <button className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="place__score-like">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}


export default Card;
