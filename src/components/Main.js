import React from "react";
import Card from "./Card";

export default function Main({ onEditAvatar, onEditProfile, onAddCard, onCardClick, 
    cards, userName, userDescription, userAvatar }) {

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img src={userAvatar}
                        alt="Аватарка"
                        className="profile__image"
                        onClick={onEditAvatar} />
                </div>

                <div className="profile__data">
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <p className="profile__intro">{userDescription}</p>
                    </div>
                    <button className="profile__edit-button"
                        type="button"
                        title="Редактировать профиль"
                        onClick={onEditProfile} />
                </div>
                <button className="profile__add-button"
                    type="button"
                    title="Загрузить фотографию"
                    onClick={onAddCard} />
            </section>

            <div className="elements">
                {cards.map((card) => {
                    return (
                        <Card card={card} key={card._id} onCardClick={onCardClick} />
                    )
                })}
            </div>
        </main>
    )
}
