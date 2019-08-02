# Ejemplo más simple

Este ejemplo se ha creado con el siguiente comando:

```
sls create --template aws-nodejs --path hello
```

El ejemplo muestra como crear un lambda con un API gw que simplemente proxea
cada requerimiento.

## Desplegar

```
sls deploy
```

Tomar nota de la salida del comando, o utilizar:

```
sls info
```

La salida del comando anterior, indica los endpoints:

```
Service Information
service: public-hello
stage: dev
region: us-east-1
stack: public-hello-dev
resources: 10
api keys:
  None
endpoints:
  GET - https://<API gw ID>.execute-api.us-east-1.amazonaws.com/dev/hello
functions:
  hello: public-hello-dev-hello
layers:
  None
```
> Asumimos la región y stage por defecto que son us-east-1 y dev respectivamente

## Probar el endpoint

Probarlo desde diferentes dispositivos dado que los headers tienen información
importante que puede ser útil para la toma de decisiones.


