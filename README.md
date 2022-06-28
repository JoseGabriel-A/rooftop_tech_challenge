# rooftop_tech_challeng
To run the program, first yo need install the dependencies, after that, yo can run : **node src/app.js**, with this command, the program get the token fot the user, then obtain the data block, sorted the data block obtained and the last point is check the sorted vector with the api.
the sensitive data are in a .env file in local file.
For the test, I used jest, to run the test, you need run: **npm test**

the .env file need this formart:

TOKEN_URL=https://rooftop-career-switch.herokuapp.com/token?email=usuario@gmail.com

BLOCK_URL=https://rooftop-career-switch.herokuapp.com/blocks?token=

CHECK_URL=https://rooftop-career-switch.herokuapp.com/check?token=


