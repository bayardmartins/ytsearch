const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const SearchController = require('./controllers/SearchController');

const routes = express.Router();

routes.get('/search', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        terms: Joi.string().required(),
        sunday: Joi.number().required().min(0).max(1440),
        monday: Joi.number().required().min(0).max(1440),
        tuesday: Joi.number().required().min(0).max(1440),
        wednesday: Joi.number().required().min(0).max(1440),
        thursday: Joi.number().required().min(0).max(1440),
        friday: Joi.number().required().min(0).max(1440),
        saturday: Joi.number().required().min(0).max(1440),
    })
}), SearchController.index);

//routes.post('/search',SearchController.index);

module.exports = routes;
