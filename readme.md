# BANCA MOVIL API

The Bank App API provides secure access to various wallet account services and functionalities, allowing users to manage their finances conveniently through web application. This RESTful API enables functionalities like:

-   **Authentication and Authorization**: Endpoints for user registration, login, and token generation to ensure secure access to banking services.

## Stack

-   NodeJS
-   Express
-   MongoDB

## Folder Structure

`bash
  back
  |--config
  |    |-- db.ts
  |--controllers // interconecta scheme con services
  |    |-- controller 1
  |    |-- controller 2
  |--models // plantillas de datos
  |    |-- model1
  |    |-- model2
  |--services // endpoint recibe las urls
  |    |-- service 1
  |    |-- service 2
  |--utils // aca van los helpers generales
  |    |-- util 1
  |    |-- util 2
  |--routes // definen las rutas de acceso por cada tipo de servicio (user/get, user/validate, user/login)
  |    |-- route 1
  |    |-- route 2
  |--constants // valores que necesitamos utilizar en todos lados (simbolos, conversion, etc.)
`

## Ramas

main / dev: no se pueden ni pushear no se hace PR tampoco.
dev-back: aca hacemos los PR va ser la integracion de los features.
features/functionality: funcionalidad de algo (ejemplo login) esta rama va a ser la base del PR hacia dev-back.

functionality/config: tiene todo lo de config, plugins, utils, routes, etc. hace PR con features/functionality.

functionality/feat: controller y la integracion con modelos, schema, base de datos, etc. hace PR con features/functionality.

functionality/service: service conexion con controller, todo lo necesario para que el service devuelva el valor. hace PR con features/functionality.
