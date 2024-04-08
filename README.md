# mistral-hackathon

How to run the frontend
```
cd frontend && npm install && npm run dev
```

How to run the backend:
```
cd backend
install all the dependencies (there is no requirements.txt sorry)
python3 manage.py makemigrations && python3 manage.py migrate && python3 manage.py runserver
```

How to create a MySQL Database:
1. Create a .env file in the backend folder and input this:
```
SECRET_KEY='django-insecure-=35njub=lf7%vtv_79xukdf&dhtnuoboj45jl%!)pbxbrh$jid'
FRONTEND_URL=http://localhost:3000
DB_NAME=hackathon_db
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
PRODUCTION=false
```
2. Type in your terminal:
```
mysql -u root
```
Then inside the panel
```
CREATE DATABASE hackathon_db;

