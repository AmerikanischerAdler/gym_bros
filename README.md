# Gym Bros

## Description

Gym Bros is a social media app for the gym. It seeks to connect users around the
world to foster a supportive and motivating environment, designed to encourage
and develop each user by providing a means of tracking growth toward goals,
sharing prgress with other users, and competing with friends or against others
of one's particular body type. 

### User Story

As a gym bro (or gym girl) I want to track & share my progress so that I can stay motivated and build a competitive & constructive community at my gym and around the world. 

### Stack:

| Type  | Structure | Style | Elements   | Routes  | Database |
| :---: | :-------: | :---: | :--------: | :-----: | :------: |
| Flask | HTML5     | CSS3  | JavaScript | Python3 | MYSQL    |

### Main Features:

1) Accountability 

* Users can choose to have their goals made public to the entire world, exclusively to those who follow them, just to friends, or only to themselves
* Users may set their own goals, whether in a particular lift or in weight
  loss/gain (see below NOTE)

**NOTE**: Minimum goals are assigned based upon body type, natty status, gender, and
  other factors in order to maintain fairness in competition

2) Competition

* Users can join a worldwide leaderboard to measure their progress against that
  of others
* Users can create their own competitions around a certain goal and invite other
  users
* Users can participate in monthly challenges hosted by the Gym Bros Team, with
  chances to win discounts on their gym memberships or free Gym Bro drip from
  our Drip Store

3) Progress 

* Progress is tracked through goals set by user, and visible through timelines
  in profile, as well as through progress pictures
* Users are tasked to provide a starting photo of themselves before beginning in
  the app. Every month, users receive a notification prompting them to submit an
  update photo, which will be appended to the progress timeline in profile.
  Through this users can visibly measure their own aesthetics and feel a sense
  of accomplishment over time.

*More Coming Soon!*

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
    feed_filter VARCHAR(50) NULL,
    social_link VARCHAR(250) NULL,
    life_motto VARCHAR(250) NULL,
    bio TEXT NULL,
    birthday DATE NULL,
    gender VARCHAR(50) NULL,
    relationship_status VARCHAR(50) NULL,
    natty_status VARCHAR(50) NULL,
    bench_now INT NULL,
    squat_now INT NULL,
    clean_now INT NULL,
    deadlift_now INT NULL,
    bench_future INT NULL,
    squat_future INT NULL,
    clean_future INT NULL,
    deadlift_future INT NULL,
    dream_build VARCHAR(250) NULL,
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

*Create Follows Table:*

```mysql
CREATE TABLE follows (
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (follower_id, followed_id),
    FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users(user_id) ON DELETE CASCADE
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

## Contributions

Contributions are welcome from developers of all skill levels!

### Acknowledgements

* Ty Peachey

*Check Out JustPeachy Store Here:* https://www.justpeachy.store

## Inspiration

I love the gym, but find it difficult to share in a community of like-minded peers. This platform is designed to facilitate positive social interaction between guys and girls who are passionate about physical fitness.

