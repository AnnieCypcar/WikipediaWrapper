# Wikipedia Wrapper

The Wikipedia Wrapper offers simplified endpoints for searching the top articles for a month or a week. Additional endpoints provide page views for an article for a week or month. One final endpoint provides the day with the most views of an article in a month.

### Local Develop
After installing nodejs, install the dependency packages and start the server. The server will recompile and restart with every file change while in the development mode.

1. [Install nodejs LTS (v16.17.0)](https://nodejs.org/en/download/) or upgrade your current version
2. npm install
3. npm run start-dev

### Serving
Start the server without recompiling by running 
```
npm start
```

### Testing
Run both unit and integration tests by running
```
npm run test
```

### Sample Curl
Get the top articles for a week given a start date.
```
curl --location --request GET 'http://localhost:4000/articles/top/weekly/1443675600000'
```
Get the top articles for a month given a start date.
```
curl --location --request GET 'http://localhost:4000/articles/top/monthly/1443675600000'
```
Get the page views for an article for a month given a start date.
```
curl --location --request GET 'http://localhost:4000/articles/Special:Book/monthly/1443675600000'
```
Get the page views for an article for a week given a start date.
```
curl --location --request GET 'http://localhost:4000/articles/Special:Book/weekly/1443675600000'
```
Get the maximum page views and day for an article for a month given a start date.
```
curl --location --request GET 'http://localhost:4000/articles/Special:Book/top/monthly/1443675600000'
```

Feedback is a gift! Send me a note: [Anne Cypcar](mailto:annecypcar@gmail.com)


