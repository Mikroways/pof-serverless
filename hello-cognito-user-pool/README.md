# Hello world con auth

Este ejemplo se ha creado con:

```
sls create -t aws-nodejs-ecma-script -p hello-cognito-user-pool
```

El ejemplo muestra como crear dos endpoints, uno público y otro privado. A su
vez, en vez de usar el template de aws-nodejs, acá se usó aws-nodejs-ecma-script
que utiliza babel y webpack.

## Sobre este ejemplo

Acá, la configuración es un tanto más compleja que en el caso anterior, donde
únicamente se desploegaba un lambda y el API gw. Ahora, se depende de otros
recursos:

* Cognito user pool
* ApiGw 
* Lambda
* Y el enganche entre el Api gw con congnito

### Analizar el archivo serverless.yml

Como puede observarse, el arhivo tiene documentados determinados links con info
que explica mejor lo que se está haciendo.
El ejemplo, fue tomado del siguiente [POST en Medium](https://medium.com/@Da_vidgf/using-cognito-for-users-management-in-your-serverless-application-1695fec9e225) y cuyos fuentes originales están en [Github](https://github.com/davidgf/serverless-cognito/)

Lo importante de este archivo `serverless.yml` es evaluar lo siguiente:

* La funcion privada agrega:
  * Como authorizer el tipo **COGNITO_USER_POOLS**
  * El recurso que se emplea como authorizador, se configura como Resource en
    esa sección del yaml.
  * La configuración de CORS que se ve en cada endpoint, es simplemente para el
    preflight que usan los navegadores. El código del handler debe incluso
agergar algunso de los headers también.
        * Leer el siguiente [blog que lo explica
          bien](https://serverless.com/blog/cors-api-gateway-survival-guide/)
* La función pública es muy similar al ejemplo anterior
* Los recursos se configuran con variables que admite la interpolación del
  framework serverless, así como además CloudFormation 

Algo importante a destacar del ejemplo, y que bien menciona el Post de Medium que da
origen a esta explicación, es que Cognito no puede configurarse absolutamente
desde el framewrok serverless. Es por ello, que una vez desplegado todo,
tendremos que realizar dos pasos manuales:

* Configurar una aplicación Cliente (tomando nota del ID)
  * Marcar el pool a usar (es posible federar con otras redes sociales)
  * Cargar las URL del callback de login con localhost, para poder probar los
    endpoints
  * Tildar los flujos. Es posible tildar implicir y Auhorization Code
  * Habilitar los scopes (permisos que se requieran)
  * Será posible configurar más permisos desde **Resource servers** 
      * Una vez creados nuevos permisos, aparecerán para tildar desde la conf de
        la aplicación cliente
* Dar un dominio válido a la aplicación para poder probar el login embebido que
  provee cognito

Se recomienda seguir estos pasos desde el [POST en Medium](https://medium.com/@Da_vidgf/using-cognito-for-users-management-in-your-serverless-application-1695fec9e225)

## Desplegar

 
```
sls plugin install -n serverless-webpack # Solo la primera vez
sls deploy
```

Tomar nota de la salida del comando, o utilizar:

```
sls info
```

La salida del comando anterior, indica los endpoints:

```
Service Information
service: hello-cognito-user-pool
stage: dev
region: us-east-1
stack: hello-cognito-user-pool-dev
resources: 21
api keys:
  None
endpoints:
  GET - https://<API gw ID>.execute-api.us-east-1.amazonaws.com/dev/private
  GET - https://<API gw ID>.execute-api.us-east-1.amazonaws.com/dev/public
functions:
  private: hello-cognito-user-pool-dev-private
  public: hello-cognito-user-pool-dev-public
layers:
  None

```
> Asumimos la región y stage por defecto que son us-east-1 y dev respectivamente

## Probar el endpoint

Probarlo desde diferentes dispositivos dado que los headers tienen información
importante que puede ser útil para la toma de decisiones.

Una de las cosas que más me gustó, es que se dispone del username y de los
grupos creados en cognito. Incluso cuando se federa desde facebook o desde otra
red social, sucede lo mismo.

### Probar el  login

Para poder probar el login, hay que hacer ciertos flujos de OIDC que se
simplifican con un ejemplo js local. El ejemplo está en esta misma carpeta en el
archivo: `index.html` que incluye `config.json`.
Para poder probarlo de forma simple y rápida se propone correr en el mismo
directorio de este README:

```
docker run --rm -p 80:80 -v $PWD:/usr/share/nginx/html:ro nginx
```

El comando anterior, inicia un web server en el puerto 80 sirviendo por defecto
el index.html. Para proceder, deberá copiar y editar los valores de
`config-example.json` en `config.json` según su configuración:

* **ServiceURL:** URL del endpoint privado
* **AuthenticationURL:** URL de Cognito configurada como dominio según POST de
  Medium

> Notar la importancia del redirect_uri en este ejemplo y también en cognito.
> Cognito admite más de un endpoint. Digo esto por dos razones: una es si se
> desea probar el JWT devuelto usando https://openidconnect.net, y otra por si
> se desea iniciar docker en un puerto diferente al 80.

## Importnate

Analizar que la configuración de cors, que está en `serverless.yml` se repite en
`handler.js`.

En el POST mencionado arriba acerca de CORS explica además que exite un paquete
que simplifica esto como midleware: https://middy.js.org/

Analizar los ejemplos entreados que tienen documentación a referencias en el
código.
