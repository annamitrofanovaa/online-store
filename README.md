Выполнили:
<li>Frontend: Пронина Надежда Викторовна, 21.Б11-пу</li>
<li>Backend: Митрофанова Анна Сергеевна, 21.Б11-пу</li>
<br>
<hr>
<br>

# Описание

Сайт предназначен для просмотра информации о книгах и их стоимости.<br> Предоставляется возможность - в зависимости от прав доступа - добавлять книги, просматривать, сохранять в корзину <br>
## Наименование  
Bookworm
<h4>Предметная область</h4> 
Информация о книгах <br>
<h2>Данные</h2> 

<details> 
  
<summary> <h4>Book</h4> </summary>

|Название|Тип|Ограничение|
|-:|:-:|:-|
|id|int64|not null, >0|
|name|string|not null, len>0|
|author_id|int64| >0, not null|
|price|float| >=0, not null|
|genre_id|int64| >0, not null|

</details>


<details> 
  
<summary> <h4>Busket_items</h4> </summary>

|Название|Тип|Ограничение|
|-:|:-:|:-|
|id|int64|not null, >0|
|author_id|int64| >0, not null|
|backet_id|int64| >0, not null|

</details>


<details> 
  
<summary> <h4>Busket</h4> </summary>

|Название|Тип|Ограничение|
|-:|:-:|:-|
|id|int64|not null, >0|
|user_id|int64| >0, not null|

</details>


<details> 
  
<summary> <h4>User</h4> </summary>

|Название|Тип|Ограничение|
|-:|:-:|:-|
|id|int64|not null, >0|
|email|string| len > 0, not null|
|password|string| len > 0, not null|
|role|string| len > 0, not null|

</details>

<details> 
  
<summary> <h4>Book_info</h4> </summary>

|Название|Тип|Ограничение|
|-:|:-:|:-|
|id|int64|not null, >0|
|book_id|int64| >0, not null|
|title|string| len > 0, not null|
|email|description| len > 0, not null|


</details>


<details> 
  
<summary> <h4>Genre</h4> </summary>

|Название|Тип|Ограничение|
|-:|:-:|:-|
|id|int64|not null, >0|
|name|string| len > 0, not null|


</details>

<details> 
  
<summary> <h4>Author</h4> </summary>

|Название|Тип|Ограничение|
|-:|:-:|:-|
|id|int64|not null, >0|
|name|string| len > 0, not null|

</details>


## Для каждого элемента данных - ограничения
## Общие ограничения целостности
# Пользовательские роли

Админ - добавить, редактировать <br>
Пользователь - просмотр, добавление в корзину

## Для каждой роли - наименование, ответственность, количество пользователей в этой роли?
# UI / API 
## API
  - Реализована страничка с документацией по каждому возможному запросу(сваггер)
  - Авторизация будет производиться с помощью jwt token
<details><summary> <h3>Методы API<h3></summary>
<p>
    
* Документация API с использованием Swagger JSDoc
* подробная информация в файле server/swagger.json или по адресу http://localhost:5000/api-docs/#/

1) Admin - Admin operations
- POST
- /api/admin/assignRole
- Assign a role to a user

2) Authors - Author management
* POST
- /api/author
- Create a new author

* GET
- /api/author
- Get all authors

3) Books - Book management



POST
/api/book
Create a new book

Jump to definition

GET
/api/book
Get all books
Jump to definition

GET
/api/book/{id}
Get a book by ID
Jump to definition

DELETE
/api/book/{id}
Delete a book by ID

Jump to definition

PUT
/api/book/{id}
Edit a book by ID

Jump to definition
Genres
Genre management



POST
/api/genre
Create a new genre

Jump to definition

GET
/api/genre
Get all genres
Jump to definition
Root
Root endpoint



GET
/
Get information about the API
Jump to definition
Users
User management



POST
/api/user/registration
Register a new user
Jump to definition

POST
/api/user/login
Login to the system
Jump to definition

GET
/api/user/auth
Check if the user is authenticated
</p></details>



# Технологии разработки
Frontend:
<li>HTML, CSS, JavaScript</li>
<li>Vue.js - фреймворк JavaScript </li>
<li>Quasar - фреймворк Vue </li> 
<li>Axios - библиотека для ассинхронной логики </li>
<br>
<br>
Backend:
<li>Node.js</li>
<li>Express</li>
<li>PostgreSQL - система управления базами данных</li>
<li>Sequelize - ORM для реляционных баз данных на node.js</li>

# Тестирование
