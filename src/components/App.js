import React from "react";
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";

function App() {
  return (
<div className="page">
    <Header />
    <Main />
    <Footer />

    <section class="popup popup-delete" id="deleteElement">
        <div class="popup__container">
            <h2 class="popup__title">Вы уверены?</h2>
            <form class="popup__form" novalidate>
                <button class="popup__button popup__button_type_submit" type="submit">Да</button>
            </form>
            <button class="popup__button popup__button_type_close" type="button"></button>
        </div>
    </section>

    <template class="element-template" id="element-template">
        <acticle class="element">
            <img class="element__image" alt="Фотография" name="name" />
            <button type="button" class="element__delete-button" aria-label="Удалить фото"></button>
            <div class="element__info">
                <h2 class="element__title" name="link"></h2>
                <div class="element__like-container">
                    <button class="element__like-button" type="button" aria-label="Поставить лайк" name="like"></button>
                    <p class="element__like-counter"></p>
                </div>
            </div>
        </acticle>
    </template>

</div>

  );
}

export default App;
