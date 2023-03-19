In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Додаток для навчання

Застосунок працює з використанням API

```
https://www.postman.com/aninix/workspace/genesis-front-end-school/overview
```

### Сторінки додатку

- Головна сторінка з курсами

```
<Route path="/" element={<Courses />} />
```

- Сторінка для перегляду курсу

```
<Route path="/:id" element={<Course />} />
```

### Детально про головну сторінку

- Сторінка показує по 10 курсів. В собі містить:
  - Фото курсу (При наведенні програється відео)
  - Заголовок
  - Кількість уроків
  - Рейтинг
  - Опис
  - Навички
  - Кнопку-посилання (переходить на сторінку перегляду курсу)
- При виборі сторінки - автоматичний підйом до початку перегляду

### Детально про сторінку перегляду курсу

- Сторінка показує відео, деталі курсу та список уроків. Також містить:
  - Кнопку для повернення на головну сторінку
  - Відеоплеєр
    - Якщо обрати будь-який урок, то у лівому верхньому кутку буде його назва
    - Picture-In-Picture у правому верхньому кутку програвача
    - Спеціальні комбінації:
      - Alt + 1 збільшує швидкість програвача на 0.5
      - Alt + 2 зменшує швидкість програвача на 0.5
      - Alt + 3 повертає швидкість програвача на 1
  - Дату запуску і рейтинг
  - Опис
  - Список навичок
  - Загальний час курсу і кількість уроків
  - Список уроків
    - Кожен урок має назву і час
    - Заблоковані курси показані напівпрозорим сірим кольором
    - При натисканні відео встановиться у програвач і відбудеться автоматичний скрол до програвача
