import React from "react"

export default function ImagePopup(name, isOpen, onClose) {
    return (
        <div className="popup popup-element" id="openImage">
            <div className="popup__container-element">
                <button className="popup__button popup__button_type_close" 
                onClick={onClose}
                type="button" 
                id="closeImage" />
                <img className="popup__image" 
                alt="Фотография" />
                <p className="popup__subtitle"></p>
            </div>
        </div>
    )
}