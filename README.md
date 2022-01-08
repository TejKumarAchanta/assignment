1. Please make sure to install and running the redis server first.
2. Go to assignment folder and open command prompt.
3. Run the command npm i to install node modules.
4. start the server using the command npm start.
5. Check the server is running on port 3000.
6. Head over to postman.
7. paste the URL http://localhost:3000/getBalancesBatch.
8. Add the address in the body in the below format: 
{
    "addresses": [
        "0x5e14ed9dCeE22ba758E8de482301028b261c4a14",
        "0xF1D8c2eED95D5fC2EaDe4E6Bb15a5969453E89a9"
    ]
}
9. Make a post call
10. We can find the data for each address.