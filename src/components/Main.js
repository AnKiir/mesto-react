export default function Main() {
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__image" 
                    src="<%=require('./img/profile/Avatar.png')%>" 
                    alt="Фото пользователя" />
                </div>

                <div className="profile__data">
                    <div className="profile__info">
                        <h1 className="profile__name">РептилиЯ</h1>
                        <p className="profile__intro">Осторожно, чешуя</p>
                    </div>
                    <button className="profile__edit-button" type="button" title="Редактировать профиль"></button>
                </div>

                <button className="profile__add-button" type="button" title="Загрузить фотографию"></button>
            </section>
            <section className="elements">
            </section>
        </main>
    )
}