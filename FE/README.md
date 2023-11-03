unzip the folder
drag to the directory where you want to store the folder
open wamp (wait for it to start)
open mysqlworkbench
run the query in mysqlworkbench root server: create schema wad2 
run the query in mysqlworkbench root server: alter database wad2 character set utf8
open folder in vscode
create a new terminal
command in terminal: cd fe (change directory to FE folder)
command in terminal: npm install (and wait for it to finish)
navigate to BE/src/settings.py
change database details as necessary
create another new terminal
command in terminal: cd be (change directory BE folder)
command in terminal: .\Scripts\activate.bat
command in terminal: pip install django
command in terminal: pip install pymysql
command in terminal: pip install djangorestframework
command in terminal: pip install djoser
command in terminal: pip install django-cors-headers
command in terminal: python manage.py makemigrations
command in terminal: python manage.py migrate
command in terminal: python manage.py runserver
command in terminal: python manage.py createsuperuser
terminal will prompt for username: type in admin
terminal will prompt for email address: type in test@gmail.com
terminal will prompt for password: type in wad2is216
go to your browser and paste this link: http://127.0.0.1:8000/admin
login with username admin and password wad2is216
go back to the terminal in the FE directory
command in terminal: npm run dev
login with username admin and password wad2is216