# Getting started
## Build Docker  
```
docker-compose build
```

## npm install
```
docker-compose run --rm react sh -c "npm install"  
```
## run container  
```
docker-compose up -d  
```

You can see the web site on: http://localhost:3000/react_test/


# Deploy
Build the project first.
```
npm run build
```


```
git subtree push --prefix app/build origin gh-pages
```
