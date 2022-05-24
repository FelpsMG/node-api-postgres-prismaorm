import {query} from 'express-validator';
import {ControllerPrisma} from './controllers/ConformityController';

export const Routes = [
  {
    method: 'get',
    route: '/conforme/point',
    controller: ControllerPrisma,
    action: 'findIntersections',
    validation: [
      query('longitude')
        .isFloat()
        .withMessage('longitude precisa ser um número real'),
      query('latitude')
        .isFloat()
        .withMessage('latitude precisa ser um número real'),
    ],
  },
  {
    method: 'get',
    route: '/conforme',
    controller: ControllerPrisma,
    action: 'verifyConformity',
    validation: [
      query('longitude')
        .isFloat()
        .withMessage('longitude precisa ser um número real'),
      query('latitude')
        .isFloat()
        .withMessage('latitude precisa ser um número real'),
      query('documento')
        .isLength({max: 14, min: 11})
        .withMessage('documento precisa ter 11 ou 14 caracteres numéricos'),
      query('documento')
        .isInt()
        .withMessage('documento precisa ter apenas caracteres numéricos'),
    ],
  },
];
