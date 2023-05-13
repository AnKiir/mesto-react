export default function ImagePopup() {
    return (
        <div className="popup popup-element" id="openImage">
            <div className="popup__container-element">
                <button className="popup__button popup__button_type_close" type="button" id="closeImage"></button>
                <img className="popup__image" 
                alt="Фотография" />
                <p className="popup__subtitle"></p>
            </div>
        </div>
    )
}