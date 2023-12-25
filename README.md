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
openapi: 3.0.0
info:
  title: Ваш API
  version: 1.0.0
  description: Документация API с использованием Swagger JSDoc
apis:
  - "./routes/*.js"
paths:
  /api/admin/assignRole:
    post:
      summary: Назначить роль пользователю
      tags:
        - Admin
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                userId:
                  type: string
                role:
                  type: string
              required:
                - userId
                - role
      responses:
        200:
          description: Роль успешно назначена
        401:
          description: Неавторизован
        500:
          description: Внутренняя ошибка сервера
  /api/author:
    post:
      summary: Создать нового автора
      tags:
        - Authors
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                biography:
                  type: string
              required:
                - name
      responses:
        201:
          description: Автор успешно создан
        401:
          description: Неавторизован
        500:
          description: Внутренняя ошибка сервера
    get:
      summary: Получить список всех авторов
      tags:
        - Authors
      responses:
        200:
          description: Список авторов
        500:
          description: Внутренняя ошибка сервера
  /api/book:
    post:
      summary: Создать новую книгу
      tags:
        - Books
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                name:
                  type: string
                price:
                  type: number
                genreId:
                  type: string
                authorId:
                  type: string
                info:
                  type: string
                img:
                  type: string
                  format: binary
              required:
                - name
                - price
                - genreId
                - authorId
                - img
      responses:
        200:
          description: Книга успешно создана
        400:
          description: Некорректный запрос
        401:
          description: Неавторизован
        500:
          description: Внутренняя ошибка сервера
    get:
      summary: Получить список всех книг
      tags:
        - Books
      parameters:
        - in: query
          name: genreId
          schema:
            type: string
        - in: query
          name: authorId
          schema:
            type: string
        - in: query
          name: limit
          schema:
            type: integer
        - in: query
          name: page
          schema:
            type: integer
      responses:
        200:
          description: Список книг
        500:
          description: Внутренняя ошибка сервера
  /api/book/{id}:
    get:
      summary: Получить книгу по ID
      tags:
        - Books
      parameters:
        - in: path
          name: id
          required: true
          description: ID книги
          schema:
            type: string
      responses:
        200:
          description: Одна книга
        404:
          description: Книга не найдена
    delete:
      summary: Удалить книгу по ID
      tags:
        - Books
      security:
        - bearerAuth: []
      parameters:
        - in: path
          name: id
          required: true
          description: ID книги
          schema:
            type: string
      responses:
        200:
          description: Книга успешно удалена
        401:
          description: Неавторизован
        404:
          description: Книга не найдена
        500:
          description: Внутренняя ошибка сервера
    put:
      summary: Редактировать книгу по ID

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
