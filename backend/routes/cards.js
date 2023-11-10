const cardsRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  getCardsByIdAndRemove,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cardsRoutes.get('/', getCards);
cardsRoutes.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().length(24),
    }),
  }),
  getCardsByIdAndRemove,
);
cardsRoutes.post(
  '/',

  createCard,
);
cardsRoutes.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().length(24),
    }),
  }),
  likeCard,
);
cardsRoutes.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().required().length(24),
    }),
  }),
  dislikeCard,
);
module.exports = cardsRoutes;
