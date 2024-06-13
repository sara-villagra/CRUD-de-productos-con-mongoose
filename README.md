
# Actividad:

 CRUD de Productos con Mongoose



## Autor

- https://github.com/sara-villagra

## Para Comenzar:
Primero, para inicializar el proyecto :

- npm init -y

Luego, agregar las siguientes dependencias:

- npm i express mongoose morgan

Abrir http://localhost:3008 en tu browser para ver los primeros resultados.

## Conexion con mongoDB:
Deberas regitrarte en MongoDB 
- https://www.mongodb.com/
- Crear un cluster.
- Crear un usuario y contraseña para la base de datos, que usarás para conectar MongoDB con MongoDB-Compass. Además se requerirá para la conexión con el editor de texto(Visual Studio Code)
#### importe: guardar el usuario y contraseña

## MongoDB Compass
-  descargar MongoDB Compass
- https://www.mongodb.com/products/compass
- Crear una base de datos llamada: componentesDB
- Crear dentro una colección para los productos llamada: componentes
- Agregar los productos del archivo productos.json de este repositorio

## Environment Variables
Para correr este proyecto, deberás modificar el archivo _env copy por .env.
En  la cadena de conexión  MONGODB_URLSTRING , colocar el usuario y password que guardaste con anterioridad.
 Ejemplo: MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster -->

## Rutas
En el archivo api.http se puede realizar las pruebas CRUD para :

- Obtener a la pagina principal

- Mostrar todos los componentes

- Mostrar los productos de una cierta categoría(con o sin tildes) y aceptando minúsculas

- Mostrar un producto por id

- Agregar un producto

- Borrar un producto por id

- Modificar/Actualizar un producto parcialmente

- Modificar/Actualizar un producto completamente

- Obtener los productos con un importe mayor al especificado.

- Obtener los productos con un importe menor al especificado.

- Obtener lista  de todas categorias disponibles

- Buscar productos por nombre total o parcial y aceptando minúsculas

- Obtener productos por rango de precio

