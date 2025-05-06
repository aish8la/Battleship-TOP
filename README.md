# **Webpack Template Repository**

This repository serves as a **template for Webpack projects**. It provides a structured Webpack setup with support for **CSS, images, and HTML**, ensuring easy configuration and extensibility.

---

## **1. Installing Required Dependencies and Configurations**

### **1.1 CSS Loaders (For Processing CSS Files)**

#### Installation:
```bash
npm install --save-dev style-loader css-loader
```

#### Configuration:
Modify `webpack.common.js` to include the CSS processing rules:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

### **1.2 HtmlWebpackPlugin (For Generating HTML Files and Injecting Scripts)**

#### Installation:
```bash
npm install --save-dev html-webpack-plugin
```

#### Configuration:
Modify `webpack.common.js` to include the HTML plugin:

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
```

### **1.3 HTML Loader (For Importing HTML Files in JavaScript)**

#### Installation:
```bash
npm install --save-dev html-loader
```

#### Configuration:
Modify `webpack.common.js` to include HTML processing:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
```

### **1.4 Asset Modules (For Handling Images and Static Files)**

#### Installation:
```bash
npm install --save-dev file-loader
```

#### Configuration:
Modify `webpack.common.js` to handle images and static files:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```

### **1.5 Babel Loader (For Transpiling Modern JavaScript)**

#### Installation:
```bash
npm install -D babel-loader @babel/core @babel/preset-env webpack
```

#### Configuration:
Modify `webpack.common.js` to include Babel processing:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }
    ]
  }
};
```

---

## **2. Project Structure**
Ensure your project has the following structure:
```
my-project/
├── src/
│   ├── index.js
│   ├── index.html
│   ├── styles.css
│   ├── assets/
│   │   ├── image.png
├── dist/
├── package.json
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
```

---

## **3. Available npm Scripts**

Modify `package.json` to include useful scripts:

```json
"scripts": {
  "start": "webpack serve --open --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

#### **Script Descriptions:**
- **`start`** → Runs the Webpack development server with live reloading.
- **`build`** → Creates a production-ready bundle.
- **`lint`** → Runs ESLint for code quality checks.
- **`format`** → Uses Prettier to format the code.

---

## **4. Running Webpack**

After installing dependencies and configuring Webpack, start the development server:
```bash
npm run start
```
Or create a production build:
```bash
npm run build
```

Your Webpack project is now set up with **CSS, HTML, images, and essential scripts** for a streamlined workflow! 🚀

