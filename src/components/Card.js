import React from 'react';

export default function Card({ card, onCardClick }) {
    function handleClick() {
        onCardClick(card);
    }
    return (
            <div className="element">
                <img className="element__image"
                    alt={card.name}
                    src={card.link}
                    onClick={() => handleClick(card)} />
                <button type="button"
                    className="element__delete-button"
                    aria-label="Удалить фото" />
                <div className="element__info">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__like-container">
                        <button className="element__like-button"
                            type="button" 
                            aria-label="Поставить лайк"/>
                        <p className="element__like-counter">{card.likes.length}</p>
                    </div>
                </div>
            </div>
    )
}