Выполнили:
<li>Frontend: Пронина Надежда Викторовна, 21.Б11-пу</li>
<li>Backend: Митрофанова Анна Сергеевна, 21.Б11-пу</li>
<br>
<hr>
<br>
<h3>Описание</h3> 
Сайт предназначен для просмотра информации о книгах и их стоимости.<br> Предоставляется возможность - в зависимости от прав доступа - добавлять книги, просматривать, сохранять в корзину <br>
<h4>Наименование</h4>  
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

Админ - добавить, редактировать
Пользователь - просмотр, добавление в корзину

## Для каждой роли - наименование, ответственность, количество пользователей в этой роли?
# UI / API 
# Технологии разработки
## Язык программирования
## СУБД
# Тестирование
