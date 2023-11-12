import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { AppContext, CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import * as userAuth from "../utils/UserAuth";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import ConfirmPopup from "./ConfirmPopup";

function App() {
  const [logOutCaption, setLogoutCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmPopupOpen, setIsConfrimPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = useState(false);
  const [isInfoTooltipConfirm, setisInfoTooltipConfirm] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [cardToBeDeleted, setCardToBeDeleted] = useState(null);
  const navigate = useNavigate();

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      userAuth
        .getContent(jwt)
        .then((userData) => {
          if (userData) {
            setLoggedIn(true);
            navigate("/");
            setCurrentUser(userData);
            setUserEmail(userData.email);
            setLogoutCaption("Выйти");
          }
        })
        .catch((err) => {
          console.log(`Sorry, ${err}`);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn, userEmail]);

  useEffect(() => {
    loggedIn ? navigate("/") : navigate("/sign-in");

    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })

        .catch((err) => {
          console.log(`Sorry, ${err}`);
        });
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })

        .catch((err) => {
          console.log(`Sorry, ${err}`);
        });
    }
  }, [loggedIn]);
  function handleRegister({ email, password }) {
    return userAuth
      .register(email, password)
      .then((res) => {
        if (res) {
          setisInfoTooltipConfirm(true);
          setisInfoTooltipOpen(true);
          navigate("/sign-in");
          setTimeout(() => {
            closeAllPopups();
          }, 2000);
        }
      })
      .catch((err) => {
        setisInfoTooltipConfirm(false);
        setisInfoTooltipOpen(true);
        console.log(`Sorry, ${err}`);
      });
  }

  function handleLogin({ email, password }) {
    if (!email || !password) {
      setisInfoTooltipConfirm(false);
      setisInfoTooltipOpen(true);
    }
    userAuth
      .authorize(email, password)

      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch((err) => {
        setisInfoTooltipConfirm(false);
        setisInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api
      .setUserInfo(currentUser.name, currentUser.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLoginOut() {
    setUserEmail("");
    setCurrentUser({});
    setLogoutCaption("");
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }
  function handleCardDelete(card) {
    api
      .removeCard(card)
      .then(() => {
        setCards((state) =>
          state.filter((newCard) => card._id !== newCard._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      });
  }

  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .changeUserAvatar(currentUser.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Sorry, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setisInfoTooltipOpen(false);
    setSelectedCard(null);
    setIsConfrimPopupOpen(false);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handlePopupDeleteClick() {
    setIsConfrimPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  return (
    <AppContext.Provider value={isLoading}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <div className="page">
            <Header
              logOutCaption={logOutCaption}
              outLogin={handleLoginOut}
              email={userEmail}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRouteElement
                    element={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    cards={cards.map((card) => (
                      <Card
                        onCardDeleteClick={handlePopupDeleteClick}
                        card={card}
                        key={card._id}
                        onCardLike={handleCardLike}
                        onCardClick={handleCardClick}
                        cardToBeDeleted={setCardToBeDeleted}
                      />
                    ))}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path="/sign-in"
                element={
                  <>
                    <Login onLogin={handleLogin} />
                  </>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <>
                    <Register onRegister={handleRegister} />
                  </>
                }
              />
            </Routes>
            <Footer />
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
            />
            <AddPlacePopup
              onAddPlace={handleAddPlaceSubmit}
              onClose={closeAllPopups}
              isOpen={isAddPlacePopupOpen}
            />
            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              onClose={closeAllPopups}
              isOpen={isEditAvatarPopupOpen}
            />
            <ConfirmPopup
              cardItem={cardToBeDeleted}
              onSubmit={handleCardDelete}
              isOpen={isConfirmPopupOpen}
              onClose={closeAllPopups}
            />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
              isOpen={selectedCard}
            />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              isConfirm={isInfoTooltipConfirm}
              onClose={closeAllPopups}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
