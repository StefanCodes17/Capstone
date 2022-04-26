# Capstone

# Installation

1. Clone this repository
2. Create a Python virtual environment in the repo:
```
python3 -m venv capstone
```

3. Activate it with `./capstone/bin/activate`
4. For all future steps, cd into django-react
5. Install python dependencies: `pip3 install -r requirements.txt`
6. Change into the frontend folder and install node dependencies: `npm install`
7. You need Node Version Manager to use Node 16:
```
source .bashrc
nvm use 16
```

# Running in Development

**Make sure you pull**, and run database migrations if necessary
```
python3 manage.py migrate
```

1. In django-react/frontend: `npm run dev`
2. In django-react/frontend: `npm run watch:css`
3. Activate python virtual environment. In django-react: `python3 manage.py runserver`
