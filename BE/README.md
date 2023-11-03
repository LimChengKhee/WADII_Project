# BE

This template is a guide for setting up our backend.

## Activate your virtual environment
The virtual environment will be activated and you’ll see “(BE)” next to the command prompt to designate that. Each time you start a new command prompt, you’ll need to activate the environment again.
```sh
BE\Scripts\activate.bat
```

## Download Django
```sh
python -m pip install Django
```

## Download Django Rest Framework
```sh
pip install djangorestframework
```

### Run Django Server

```sh
python manage.py runserver
```
### Migration of Database Tables

```sh
python manage.py migrate
```


### Remedy Actions
Problem: If Cannot detect python
activate.bat change to your current path
set VIRTUAL_ENV=C:\Users\<user>\Documents\wad2\WADII_Project\BE

Problem: If Cannot detect mysqlclient
1. Run this command 
```sh
pip install pymysql
```
Insert into settings.py
```sh
import pymysql
pymysql.install_as_MySQLdb()
```

Change password to "" if cannot connect

run "Create Schema wad2" to create schema

