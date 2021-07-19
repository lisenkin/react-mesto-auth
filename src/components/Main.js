import {useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Main(props) {
  const currentUser = useContext(CurrentUserContext);
//все функи переехали в апп


  return (
    <main className="page__content content">
      <section className="page__profile profile">
        <div className="profile__overlay" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt={props.altAvatar} className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__info-textblock">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" onClick={props.onEditProfile}/>
          </div>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={props.onAddPlace}/>
      </section>
      <section className="page__places places">
      </section>
      {props.isLoading
        ? <p>Loading...</p>
        : (<section className="places__list page__places places">
          {props.cards.map(item => (
            <Card
              key={item._id}
              card={item}
              handleClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )
          )}
        </section>)
      }
    </main>
  );
}
export default Main
