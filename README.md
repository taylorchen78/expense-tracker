# Expense tracker

A simple website using Node.js and Express.

The website can add/delete/browser/modify/classify your expense.

## Feature

User can browse customized expense data show total amount.

User can can classify expense data by catogory and date.

User can add/delete/modify expense data.

User can register account by email and facebook account.

![Screenshot](/public/img/screenshot_expense.JPG)

## Test account
| email          | password |
| ---------------| -------- |
| tony@stark.com | 1234     |

## Web package
- Node.js v10.15.0
- Express v4.17.1
- Express-Handlebars v5.1.0
- Express-session v1.17.1
- Mongoose v5.9.25
- Passport v0.4.1
- Passport-facebook v3.0.0
- Passport-local v1.0.0
- bcryptjs v2.4.3
- connect-flash v1.19.0
- dotenv v8.2.0

## Installation
1. Open terminal and download project
```
git clone https://github.com/taylorchen78/expense-tracker.git
```

2. Enter project folder
```
cd expense-tracker
```

3. Install npm
```
npm install express
```

4. Set environment parameter
```
Rename .env.example to .env

Rename following environment setting
FACEBOOK_ID=<Your facebook app ID>
FACEBOOK_SECRET=<Your facebook app ID>
```

5. Run seed generator
```
npm run seed
```

6. Run project
```
nodemon app.js or npm run dev
```

## Open expense website
Browse http://localhost:3000 in local

Browse https://afternoon-escarpment-38115.herokuapp.com with Heroku server 