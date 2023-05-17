import React, { useEffect, useState } from "react";
import Card from "./Card";
import { api } from "../utils/Api"


export default function Main({ onEditAvatar, onEditProfile, onAddCard, onCardClick }) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState("");

    useEffect(() => {
        api
            .getUserData()
            .then(
                (userInfo) => (
                    setUserName(userInfo.name),
                    setUserDescription(userInfo.about),
                    setUserAvatar(userInfo.avatar)
                )
            )
            .catch((err) => console.log(`Ошибка ${err}`))
    }
    )

    useEffect(() => {
        api
            .getInitialCards()
            .then((cards) => setCards(cards))
            .catch((err) => console.log(`Ошибка ${err}`))
    }, [])

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img className="profile__image"
                        src={userAvatar}
                        alt="Фото пользователя" />
                </div>

                <div className="profile__data">
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <p className="profile__intro">{userDescription}</p>
                    </div>
                    <button className="profile__edit-button" type="button" title="Редактировать профиль"></button>
                </div>

            </section>
            {/* <div className="elements">
                {cards.map((card) => (
                    <Card card={card} key={card._id} onCardClick={onCardClick} />
                ))}
            </div> */}
        </main>
    )
}