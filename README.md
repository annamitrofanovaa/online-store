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

|  Название |  Тип   | Ограничение     |
| --------: | :----: | :-------------- |
|        id | int64  | not null, >0    |
|      name | string | not null, len>0 |
| author_id | int64  | >0, not null    |
|     price | float  | >=0, not null   |
|  genre_id | int64  | >0, not null    |

</details>

<details> 
  
<summary> <h4>Busket_items</h4> </summary>

|  Название |  Тип  | Ограничение  |
| --------: | :---: | :----------- |
|        id | int64 | not null, >0 |
| author_id | int64 | >0, not null |
| backet_id | int64 | >0, not null |

</details>

<details> 
  
<summary> <h4>Busket</h4> </summary>

| Название |  Тип  | Ограничение  |
| -------: | :---: | :----------- |
|       id | int64 | not null, >0 |
|  user_id | int64 | >0, not null |

</details>

<details> 
  
<summary> <h4>User</h4> </summary>

| Название |  Тип   | Ограничение       |
| -------: | :----: | :---------------- |
|       id | int64  | not null, >0      |
|    email | string | len > 0, not null |
| password | string | len > 0, not null |
|     role | string | len > 0, not null |

</details>

<details> 
  
<summary> <h4>Book_info</h4> </summary>

| Название |     Тип     | Ограничение       |
| -------: | :---------: | :---------------- |
|       id |    int64    | not null, >0      |
|  book_id |    int64    | >0, not null      |
|    title |   string    | len > 0, not null |
|    email | description | len > 0, not null |

</details>

<details> 
  
<summary> <h4>Genre</h4> </summary>

| Название |  Тип   | Ограничение       |
| -------: | :----: | :---------------- |
|       id | int64  | not null, >0      |
|     name | string | len > 0, not null |

</details>

<details> 
  
<summary> <h4>Author</h4> </summary>

| Название |  Тип   | Ограничение       |
| -------: | :----: | :---------------- |
|       id | int64  | not null, >0      |
|     name | string | len > 0, not null |

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

1. Admin - Admin operations

- POST, /api/admin/assignRole, Assign a role to a user

2. Authors - Author management

- POST, /api/author, Create a new author

- GET, /api/author, Get all authors

3. Books - Book management

- POST, /api/book, Create a new book
- GET, /api/book, Get all books
- GET, /api/book/{id}, Get a book by ID
- DELETE, /api/book/{id}, Delete a book by ID
- PUT, /api/book/{id}, Edit a book by ID

4. Genres - Genre management

- POST, /api/genre, Create a new genre
- GET, /api/genre, Get all genres

5. Root - Root endpoint

- GET / Get information about the API

6. Users - User management

- POST, /api/user/registration, Register a new user
- POST, /api/user/login, Login to the system
- GET, /api/user/auth, Check if the user is authenticated
</p></details>

## UI

- Главная страница, вход, регистрация
- Страница со списком книг, функционалом администратора

<details>
<summary> <h3>Главная страница, вход, регистрация</h3></summary>
Главная страница представляет из себя ознакомительную информацию о функциональных возможностях пользователя. Присутсвуют большая кнопка регистрации и в шапке страницы кнопка входа.<br>
Страницы входа и регистрации имеют поля ввода почты и пароля. 
</details>

<details>
<summary> <h3>Основная страница, админ панель</h3></summary>
Основная страница - это таблица книг, которая может быть представлена в 2х вариантах. Как таблица и как карточки. 
<br>Администратор может давать роль админа пользователям, добавлять жанры и авторов.<br>
Обычный пользователь может добавлять книги, а админ может их еще редактировать и удалять.
</details>

<details>
<summary> <h3>Шапка основной страницы</h3></summary>
Слева вверху отображается роль пользователя -  USER или ADMIN. В правой части имеются 2 кнопки - "Мое избранное" и "Выход". При выходе, заканчивается сессия пользователя. При выборе "Мое избранное" происходит переход на новую страницу. 
</details>

<details>
<summary> <h3>Добавление книги</h3></summary>
Форма добавления книги появляется при нажатии на кнопку "добавить книгу". Представляет из себя поля ввода названия, описания и цены. А также имеются выпадающие списки авторов и жанров. 
</details>

<details>
<summary> <h3>Работа с книгами</h3></summary>
Пользователь может нажать на строку в таблице и появится выбор "посмотреть подробнее" и "добавить в избранное". Если выбрать первое, появится подробная информация о данной книге, включая ее описание.
<br>Выбрав второй вариант, пользователь добавляет книгу в список своих избранных книг. В шапке страницы находится кнопка "Мое избранное", при переходе на которую вы увидите также табличку с любимыми книгами.
</details>

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
