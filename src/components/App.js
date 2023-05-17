import React from "react";
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      setSelectedCard
    ) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('click', handleOverlayClick);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClick);
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
  function handleOverlayClick(e) {
    if (e.target.classList.contains('popup__opened')) {
      closeAllPopups();
    }
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddCard={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm name="profile" title="Редактировать профиль"
        btnText="Обновить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input type="text" required name="name" id="name-input" className="popup__info popup__info_type_name" maxLength="40"
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
        <input type="url" name="link" id="link-input" className="popup__info popup__info_type_link" minLength="2"
          placeholder="Ссылка на картинку" required />
        <span className="popup__info-error intro-input-error" />
      </PopupWithForm>

      <PopupWithForm></PopupWithForm>

      <PopupWithForm name="delete-card" title="Вы уверены?" btnText="Да" />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
    </div>
  );
}

export default App;