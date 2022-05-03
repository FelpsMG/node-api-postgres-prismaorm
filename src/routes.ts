import { body, param, query } from "express-validator"
import { ControllerPrisma } from "./controller/ControllerPrisma"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: ControllerPrisma,
    action: "all",
    validation: [],
}, {
    method: "get",
    route: "/users/id=?:id",
    controller: ControllerPrisma,
    action: "one",
    validation: [
        param('id').isInt(),
    ],
}, {
    method: "post",
    route: "/users",
    controller: ControllerPrisma,
    action: "save",
    validation: [
        body('firstName').isString(),
        body('lastName').isString(),
        body('age').isInt({ min: 0 }).withMessage('age must be a positive integer')
    ]
}, {
    method: "delete",
    route: "/users/:id",
    controller: ControllerPrisma,
    action: "remove",
    validation: [
        param('id').isInt(),
    ],
},
{
    method: "get",
    route: "/api/conforme/point",
    controller: ControllerPrisma,
    action: "find_intersection",
    validation: [
        query('longitude').isFloat().withMessage('longitude precisa ser um número real'),
        query('latitude').isFloat().withMessage('latitude precisa ser um número real'),
    ],    
},
{
    method: "get",
    route: "/api/apolice/report",
    controller: ControllerPrisma,
    action: "get_report",
    validation: [
        query('id_proposta').isInt().withMessage('id_proposta precisa ser um número inteiro'),
    ],   
}
]