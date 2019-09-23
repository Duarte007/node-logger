# NODE LOGGER

Node Logger is a Nodejs library for make log of your application.

## Installation

Use npm to install foobar.

```bash
npm install node_logger
```

## Usage

```node
const Logger = require('node_logger')
const Log = new Logger('log_table_name')

Log.info({ res, result: 'Success!', status: 200 }, Log.REGISTER_IN_DB);
Log.error({ res, result: err, status: 500, report: 'Erro ao inserir produto no nérus!' },Log.REGISTER_IN_CONSOLE);
Log.warn({ res, report: 'Algum erro que não compromete o programa!' }, Log.REGISTER_IN_BOTH);
```


## Configuration

Lib uses knex to connect the database.
Need to enter some environment variables:
- DB_LOG_HOST
- DB_LOG_PORT
- DB_LOG_NAME
- DB_LOG_USER
- DB_LOG_PASS

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)