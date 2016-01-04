# Assimilate-URL
A url shortener app that takes a url and turns it into a hash. Then uses that hash to take users to that website.  
[Assimilate URL Heroku link](https://assimilateurls.herokuapp.com/)  

# Tech Used
* Node.js
* Sequelize
* ejs
* bcrypt node module
* Bootstrap
* jQuery

# How it works
1. Input a url into the input field.
2. url gets sent to a databse for storage.
3. The unique id of that database object gets sent back and ran through bcryt and returned as a hash.
4. When that hash is put in as a parameter for the index page, it gets run through bcrypt to decipher it.
5. The deciphered id is used to lookup the url in the databse.
6. User gets redirected to the url.

# Key Features
* Shorten long urls
* See top urls visited.
