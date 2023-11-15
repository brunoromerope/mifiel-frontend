# VUE 3 FRONT-END MIFIEL WIDGET

A basic Vue 3 project that uses MIFIEL widget to sign documents


## Getting Started

Follow these steps to get the application up and running:

##### 1. Clone this repository to your local machine:

```
git clone <repository-url>
cd <repository-directory>
```
##### 2. Install the required npm packages:

```
npm install
```
##### 3. Edit the `/src/store/index.js` file with the following content:

```
state () {
        return {
            url: '<Backend-URL>', // Back-end route
        }
    }
```

##### 4. Build the app:

```
npm run build
```

Now the `dist` directory is created, you can serve it with any web server like Apache, Nginx etc.

##### 4. Copy the dist directory


### License

This project is licensed under the MIT License.