# El Framework Serverless

El [framework serverless](https://serverless.com/) ofrece una solución cómoda para trabajar con
serverless de forma independiente del proveedor de cloud. Esta independencia
obviamente que está relacionada a la forma en que se programa.

## Instalación

Para instalar el framework:

```
npm install -g serverless
```

El resultado de la instalación es la disponibilidad del comando `serverless` o
`sls`.

## Flujo típico de trabajo

```
sls create -t <template> -p path
cd path
sls deploy
sls info
```

## Documentación

El proyecto tiene una documentación clara, que muestra cómo se trabaja con el
comando en sí, como así también las opciones típicas de cada proveedor sls de
distintos clouds. 
Lo que tiene de beneficioso el framework, es que es simple de extender con
personalizaciones específicas de cada proveedor. Además existen diversos plugins
que simplifican varias tareas repetitivas.

Respecto a guias y ejemplos, el mismo framework mantiene:

* Repositorio en [Github de ejemplos](https://github.com/serverless/examples)
* [Ejemplos del sitio](https://serverless.com/examples/)
* [Blog](https://serverless.com/blog/)

# Ejemplos en este repositorio

* [Ejemplo sin autenticación](hello/README.md)
* [Ejemplo con autenticación usando Cognito](hello-cognito-user-pool/README.md)
