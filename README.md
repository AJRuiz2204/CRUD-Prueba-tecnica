
# Prueba Técnica: Desarrollo de Aplicación CRUD

## Descripción General
La aplicación desarrollada es un sistema CRUD completo que permite gestionar estudiantes a través de una interfaz web construida con **React** y un servidor backend en **Node.js**. La base de datos MySQL almacena la información, y el servidor Express maneja todas las operaciones CRUD.

## Tecnologías Utilizadas
- **Node.js**: Para la creación del servidor backend y manejo de las rutas CRUD.
- **Express.js**: Framework que facilita la creación de APIs RESTful.
- **MySQL**: Base de datos relacional donde se almacenan los datos de los estudiantes.
- **React**: Biblioteca de JavaScript utilizada para el desarrollo del frontend.
- **Axios**: Librería utilizada para realizar las solicitudes HTTP al servidor.
- **Bootstrap**: Framework CSS utilizado para crear una interfaz de usuario responsive y moderna.

## Estructura del Proyecto

El proyecto está dividido en dos partes:
1. **Backend (Node.js + Express)**
2. **Frontend (React)**

## Backend
El backend está construido usando Node.js y Express. Este servidor maneja las operaciones CRUD a través de varias rutas, como se detalla a continuación:

- **Rutas del Backend:**
  - **GET `/`**: Obtiene todos los registros de estudiantes.
  - **GET `/read/:id`**: Obtiene los detalles de un estudiante específico basado en su `id`.
  - **POST `/student`**: Crea un nuevo estudiante.
  - **PUT `/update/:id`**: Actualiza un estudiante existente basado en su `id`.
  - **DELETE `/delete/:id`**: Elimina un estudiante basado en su `id`.

- **Configuración de la base de datos MySQL:**
  - Se utiliza una tabla llamada `student` con los siguientes campos:
    - `id`: Entero, autoincremental.
    - `name`: Cadena de texto.
    - `email`: Cadena de texto.

## Frontend
El frontend de la aplicación está construido usando React y Bootstrap para la interfaz de usuario. La funcionalidad incluye la capacidad de crear, leer, actualizar y eliminar estudiantes.

- **Componentes del Frontend:**
  - **`Home`**: Muestra la lista de estudiantes y ofrece opciones para crear, leer, actualizar o eliminar.
  - **`Create`**: Formulario para agregar un nuevo estudiante.
  - **`Read`**: Muestra los detalles de un estudiante específico.
  - **`Update`**: Permite actualizar los datos de un estudiante específico.

- **Funciones clave en el Frontend:**
  - **Axios** es utilizado para manejar las solicitudes HTTP entre el cliente y el servidor. Cada operación (crear, leer, actualizar, eliminar) se comunica con el servidor a través de peticiones HTTP.

## Pasos para Ejecutar el Proyecto

1. **Clonar el repositorio**:  
   ```
   git clone <url_del_repositorio>
   ```

2. **Instalar dependencias del backend**:  
   ```
   cd backend
   npm install
   ```

3. **Configurar la base de datos MySQL**:
   - Crear una base de datos llamada `CRUD` y una tabla llamada `student` con las columnas mencionadas anteriormente.
   - Configurar la conexión a la base de datos en el archivo de configuración de `db` en el backend.

4. **Ejecutar el servidor**:  
   ```
   npm start
   ```

5. **Instalar dependencias del frontend**:  
   ```
   cd frontend
   npm install
   ```

6. **Ejecutar el servidor de React**:  
   ```
   npm start
   ```

7. **Acceder a la aplicación**:
   - Abrir un navegador y navegar a `http://localhost:3000` para ver la aplicación.

## Operaciones CRUD Implementadas
1. **Create**: El usuario puede agregar un nuevo estudiante ingresando su nombre y correo electrónico. Estos datos son enviados al servidor a través de una solicitud POST.
   
   - Código en el servidor:
     ```javascript
     app.post("/student", (req, res) => {
       const sql = "INSERT INTO student (`name`, `email`) VALUES (?, ?)";
       const values = [req.body.name, req.body.email];
       db.query(sql, values, (err, result) => {
         if (err) return res.json(err);
         return res.json(result);
       });
     });
     ```

2. **Read**: Se pueden visualizar todos los estudiantes, así como ver los detalles de uno en particular mediante su `id`.

   - Código en el servidor:
     ```javascript
     app.get("/read/:id", (req, res) => {
       const sql = "SELECT * FROM student WHERE id = ?";
       const id = req.params.id;
       db.query(sql, [id], (err, result) => {
         if (err) return res.json({ Message: "Error inside server" });
         else res.json(result);
       });
     });
     ```

3. **Update**: El usuario puede modificar los datos de un estudiante existente. La información es enviada al servidor a través de una solicitud PUT.

   - Código en el servidor:
     ```javascript
     app.put("/update/:id", (req, res) => {
       const sql = "UPDATE student SET `name` = ?, `email` = ? WHERE id = ?";
       const id = req.params.id;
       db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
         if (err) return res.json({Mesagge: "Error inside server"});
         return res.json(result);
       });
     });
     ```

4. **Delete**: Se pueden eliminar estudiantes específicos de la base de datos.

   - Código en el servidor:
     ```javascript
     app.delete("/delete/:id", (req, res) => {
       const sql = "DELETE FROM student WHERE id = ?";
       const id = req.params.id;
       db.query(sql, [id], (err, result) => {
         if (err) return res.json({Mesagge: "Error inside server"});
         return res.json(result);
       });
     });
     ```

## Énfasis en la Actualización Dinámica
Uno de los aspectos más importantes y evaluados en esta prueba es la **actualización dinámica** de los datos en la aplicación. Esto significa que cualquier cambio (creación, actualización o eliminación de registros) debe reflejarse inmediatamente en la interfaz de usuario sin la necesidad de recargar manualmente la página.

En la implementación de la aplicación, se ha utilizado **React** para manejar la actualización automática del estado de los componentes. Cada vez que se realiza una operación CRUD, la lista de estudiantes en la página principal se actualiza automáticamente.

**Ejemplo de Actualización Dinámica en la Función de Eliminación:**
```javascript
const handleDelete = (id) => {
  axios
    .delete(`http://localhost:8081/delete/` + id)
    .then((res) => {
      location.reload();
    })
    .catch((err) => console.log(err));
};
```
En este caso, cuando se elimina un estudiante, la página principal se actualiza automáticamente para reflejar la eliminación del registro. La función `location.reload()` garantiza que la lista de estudiantes se actualice sin intervención adicional del usuario.

## Conclusión
La aplicación desarrollada cumple con los requisitos establecidos para la prueba técnica, asegurando una funcionalidad completa del CRUD con un backend robusto y un frontend dinámico. La documentación y las instrucciones proporcionadas permiten una fácil replicación y ejecución del proyecto.
