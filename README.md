# LifePad

A notion-like text-editor that enables:
<ul>
  <li>Backlinking</li>
  <li>Spell check</li>
  <li>Sentiment analysis</li>
</ul>


## Technologies
<ul>
  <li> React & Wepack</li>
  <li>Django REST</li>
  <li>AWS S3 Instances and Cloud Storage</li>
  <li>Python NLP</li>
</ul>


## Dev Experience
<ol>
  <li> <code> git clone git@github.com:StefanCodes17/Capstone.git </code> </li>
  <li> <code> npm install </code> </li>
  <div>
    <strong> Your NodeJS must be up to date for tailwind scripts to work </strong> <br/>
  If you encounter an error like 
    <code>
    Tailwindcss is not recognized ... 
    </code>
    or anything of the sort, and you've installed all dependencies it is because of the node version discrepency <br/>
    Easiest way to keep track of node version is to use <code> nvm </code> (Node Version Manager) <br/>
    If on Mac procede just follow the steps as Mac uses bash under the hood. <br/>
    If on Windows your best bet is to go to Windows App Store and get the Ubuntu terminal subprocess or use the <strong> git terminal </strong> </br/>
    To install NVM:
    <ul>
      <li> <code> curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh </code> </li>
      <li> <code> bash install_nvm.sh </code> </li>
      <li> Restart your terminal and in another instance of bash type <code> command -v nvm
     </code> to test if you succesfully installed it</li>
    </ul>
  </div>
  Once you have <code>nvm </code> installed type in the following commands:
    <ul> 
    <li> <code> nvm install 16</code> </li>
    <li> <code> nvm use 16</code> </li>
    </ul>
  After that you should be all ready to run the dev servers: </br>
  In the <code> /client </code>:
  <ul>
    <li> <code> npm run start </code>, which should start the webpack server</li>
    <li> <code> npm run watch:css </code>, which should start the tailwind-css listener</li>
  </ul>
  Make your way to the localhost instance and begin deving
</ol>

### Setting up the backend

1. Open a terminal in the root of the project
2. If this is your first time running the project, you need to create the virtual environment
```
$ python -m venv capstone
$ chmod u+x capstone/bin/activate
```
3. Activate it with `$ ./capstone/bin/activate`
4. Your terminal will now have a `(capstone)` prefix
5. If this is your first time installing the project, you need to install the required libraries
```
$ pip3 install -r requirements.txt
```
6. Now start the server:
```
$ python3 api/manage.py runserver
```

