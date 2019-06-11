import Joi from '@hapi/joi';
import _ from 'lodash';

let persons = [
    {
        rut: '186820223',
        name: 'eduardo reveco',
        age: 25
    },
    {
        rut: '192983940',
        name: 'david guerrero',
        age: 23,
    }
];

export default [
    { // devolvemos el arreglo completo de personas
        method: 'GET',
        path:'/api/persons',
        handler: async (request, h) => {
            try {
                return { 
                    ok: persons
                };
            } catch (error) {
                throw error;
            }
        }
    },
    { // buscamos la persona que tenga el rut suministrado
        method: 'GET',
        path:'/person/{rut}',
        handler: async (request, h) => {
            try {
                let rut = request.params.rut;

                let findUser = _.filter(persons, function(el) {
                    return el.rut == rut;
                });

                if(findUser[0]) {
                    return {
                        ok: findUser[0]
                    };
                };

                return {
                    err: `No se ha encontrado la persona de rut ${rut}`
                };
            } catch (error) {
                throw error;
            }
        }
    },
    {   // agregamos la persona con los datos suministrados
        method: 'POST',
        path: '/api/person',
        options: {
            handler: async (request, h) => {
                try {
                    let reqData = {
                        rut: request.payload.rut,
                        name: request.payload.name,
                        age: request.payload.age,
                    };

                    let findUser = _.filter(persons, function(el) {
                        return el.rut == reqData.rut;
                    });
                    
                    if(!findUser[0]) {
                        persons.push({
                            rut: reqData.rut,
                            name: reqData.name,
                            age: reqData.age
                        });

                        return {
                            ok: reqData
                        };
                    };

                    return {
                        err: `Ya existe una persona de rut ${reqData.rut}`
                    };
                } catch (error) {
                    throw error;
                }
            },
            validate: {
                payload: Joi.object().keys({
                    rut: Joi.string().required(),
                    name: Joi.string().required(),
                    age: Joi.number().required()
                })
            }
        }
    },
    {   // modificamos la persona que tenga el rut suministrado
        method: 'PUT',
        path: '/api/person',
        options: {
            handler: async (request, h) => {
                try {
                    let reqData = {
                        rut: request.payload.rut,
                        name: request.payload.name,
                        age: request.payload.age,
                    }

                    let arrayWithoutUser = _.filter(persons, function(el) {
                        return el.rut != reqData.rut;
                    });
                    
                    arrayWithoutUser.push({
                        rut: reqData.rut,
                        name: reqData.name,
                        age: reqData.age
                    })

                    persons = arrayWithoutUser;

                    return {
                        ok: reqData
                    };
                } catch (error) {
                    throw error;
                }
            },
            validate: {
                payload: Joi.object().keys({
                    rut: Joi.string().required(),
                    name: Joi.string().required(),
                    age: Joi.number().required()
                })
            }
        }
    },
    {   // eliminamos la persona que tenga el rut suministrado
        method: 'DELETE',
        path: '/api/person/{rut}',
        handler: async (request, h) => {
            try {
                let rut = request.params.rut;

                persons = _.filter(persons, function(el) {
                    return el.rut != rut;
                });
                
                return {
                    ok: 'persona eliminada correctamente'
                };
            } catch (error) {
                throw error;
            }
        },
    }
];