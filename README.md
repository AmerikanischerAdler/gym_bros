# Gym Bros

## Description

This is a social media app, joining gym goers from around the world to celebrate progress and encourage one another. Users can post about their progress and view the words of other people, who are just as driven to succeed as they are.

### Stack:

**Type**: Flask

**Structure**: HTML5

**Style**: CSS3

**Elements**: JavaScript

**Routes**: Python3

**Database**: MYSQL

## Installation

1) Open Terminal and Clone Repository:

```bash
git clone https://github.com/AmerikanischerAdler/gym_bros
```

2) Install Python:

If python3 is not installed on your machine, run:

**MacOS:**

```bash
brew update 
brew install python3
``` 

**TIP**: For MacOS, be sure that homebrew is installed on your machine. If not, visit https://brew.sh to install.

**Ubuntu:**

```bash
sudo apt update 
sudo apt install python3
```

3) Set Up Virtual Environment:

```bash
pip3 install virtualenv
python3 -m venv env
source env/bin/activate
```

4) Install Dependencies:

```bash
pip install -r requirements.txt
```

5) Terminate Virtual Environment:

```bash 
deactivate
```

6) Set Up MYSQL Environment Variable:

Once you have created your MYSQL account, run this command in the terminal, substituting your own password for "my_password":

```bash
echo 'export MYSQLPW="my_password"' >> ~/.bashrc
```

Do the same to set up your own secret key, substituting its value for "my_secret_key":

```bash
echo 'export SECRET_KEY="my_secret_key"' >> ~/.bashrc
```

**TIP**: This implies that you are using bash as your current shell. If not, run
the command, substituting your own shell config file for ".bashrc"

7) Create MYSQL Database and Tables:

Once you are logged into your MYSQL environment, run the following commands:

*Create GymBros Database:*

```mysql
CREATE DATABASE GymBros;
```

*Create Users Table:*

```mysql
USE GymBros;
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(255), 
    email VARCHAR(255), 
    username VARCHAR(255), 
    password VARCHAR(255),
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    UNIQUE(email),
    UNIQUE(username)
);
``` 

*Create Posts Table:*

```mysql
USE GymBros;
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    text TEXT NOT NULL,
    image LONGBLOB NULL,
    image_mime_type VARCHAR(50) NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    author INT NOT NULL,
    FOREIGN KEY (author) REFERENCES users(user_id) ON DELETE CASCADE
);
```

*Create Comments Table:*

```mysql
USE GymBros;
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(200) NOT NULL,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    author INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (author) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
```

*Create Likes Table:*

```mysql
USE GymBros;
CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
    author INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (author) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
```

## Usage

1) Open Terminal

2) Navigate to gym_bros Directory:

```bash
cd gym_bros
```

3) Start Virtual Environment

```bash
python3 -m venv env
source env/bin/activate
```

**TIP**: To terminate your virtual environment, run:

```bash
deactivate
```

4) Start Flask App:

*This will spin up a local backend server*

```bash
python3 app.py
```

**TIP**: To terminate your local server, press CTRL-C

4) Open Web Browser to New Tab or Window

5) Enter Server Address in Search Bar:

You may be able to simply click this link: http://127.0.0.1:5000/

## Inspiration

I love the gym, but find it difficult to share in a community of like-minded peers. This platform is designed to facilitate positive social interaction between guys and girls who are passionate about physical fitness.

