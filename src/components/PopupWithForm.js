export default function PopupWithForm(props) {
    return (
        <>
            <div className={`popup ${props.name} ${props.isOpen && "popup_opened"}`}>
                <div className="popup__container">
                    <h2 className="popup__title">{props.title}</h2>
                    <form className="popup__form" name={props.name} noValidate>
                        {props.children}
                        <button 
                        className="popup__button popup__button_type_submit" 
                        type="submit">{props.textButton}</button>
                    </form>
                    <button onClick={props.onClose}
                    className="popup__button popup__button_type_close" 
                    type="button"></button>
                </div>
            </div>
        </>
    )
}