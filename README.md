# Node/Express API with simple JSON-file data source

If you need to set up a quick Node/Express API, this is a good project to begin with. It has a simple MVC structure with the server.ts file kept simple with the Express routes which call the corresponding functions in the model.ts file. This is one simple example of middleware, a logger which writes to a text file each time the API is accessed. The JSON file has more data than is needed so there is a light example of data cleansing from "raw books" to "book", see the IRawBook and IBook interfaces. As all my starter examples, this API uses TypeScript and ES6 modules exclusively. To add a new data source, simply change `model.ts` by swapping out the JSON-file code with code for your data source, e.g. a MongoDB or MySQL database, etc.

![grafik](https://starters.tanguay.eu/images/starters/backendSimpleReadonlyJsonApi.png)

## features

- Node/Express API
- TypeScript
  - two interfaces: `IRawBooks`, `IBooks`
- ES6 modules
- three simple routes:
  - `/` - API instructions
  - `/books` - all books
  - `/books/3` - book with id 3
- simple MVC structure
  - `server.ts` - responsible for req/res routes
  - `model.ts` - responsible for data functions
- simple example of custom middleware (logger)
- `config.ts` has centralized data 
- `test.rest` used for manual testing (need [REST Client VSCode extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client))
- cors implemented

## install

- go to your projects directory
  - e.g. `cd ~/projects`
- in your projects directory, create your new site e.g. **backend001** by cloning this project 
  - `git clone git@github.com:edwardtanguay/backend-simple-readonly-json-api.git backend001`
- open your newly created site in VSCode
  - `code backend001`
- inside VSCode, open the VSCode terminal
  - **CTRL-`**
- delete the connection to this repository by deleting the Git repository
  - `rm -rf .git`
- create a new local Git repository
  - `git init -b main`
- install node_modules
  - `npm i`
- start your site and click given link to view website
  - `npm run dev`

## more starters, templates and frameworks

https://starters.tanguay.eu
