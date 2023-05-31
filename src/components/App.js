import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import api from "../utils/Api";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      setSelectedCard
    ) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    setSelectedCard,
  ]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleLikeCard(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({});
  }

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddCard={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleLikeCard}
          onCardDelete={handleCardDelete}
          cards={cards} />
        <Footer />

        <PopupWithForm name="profile" title="Редактировать профиль"
          btnText="Обновить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <input type="text" required name="name" id="name-input" className="popup__info popup__info_type_name"
            maxLength="40"
            minLength="2" placeholder="Имя Профиля" />
          <span className="popup__info-error name-input-error" />
          <input type="text" required name="about" id="intro-input" className="popup__info popup__info_type_intro"
            maxLength="200" minLength="2" placeholder="Описание Профиля" />
          <span className="popup__info-error intro-input-error" />
        </PopupWithForm>

        <PopupWithForm name="add-card" title="Новое место"
          btnText="Обновить"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <input type="text" name="name" id="title-input" className="popup__info popup__info_type_title"
            maxLength="30" minLength="2" placeholder="Название" required />
          <span className="popup__info-error name-input-error" />
          <input type="url" name="link" id="link-input" className="popup__info popup__info_type_link"
            minLength="2"
            placeholder="Ссылка на картинку" required />
          <span className="popup__info-error intro-input-error" />
        </PopupWithForm>

        <PopupWithForm name="avatar" title="Обновить аватар"
          btnText="Обновить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <input type="url" name="avatar" id="avatar" className="popup__info popup__info_type_link" minLength="2"
            placeholder="Ссылка на картинку" required></input>
          <span className="popup__info-error avatar-error" />
        </PopupWithForm>

        <PopupWithForm name="delete-card" title="Вы уверены?" btnText="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
