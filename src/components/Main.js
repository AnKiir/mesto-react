import React from "react";
import Card from "./Card";
import { api } from "../utils/Api"


export default function Main({ onEditAvatar, onEditProfile, onAddCard, onCardClick }) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards])
            .then(
                ([userData, cardsData]) => (
                    setUserName(userData.name),
                    setUserDescription(userData.about),
                    setUserAvatar(userData.avatar),
                    console.log(cardsData),
                    setCards(cardsData)
                )
            )
            .catch((err) => console.log(`Ошибка ${err}`))
    }
    )

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
                        <h1 className="profile__name">Репти {userName}</h1>
                        <p className="profile__intro">Чешуя {userDescription}</p>
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