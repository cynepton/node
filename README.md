# Node Snippet Collection

Collection of code snippets implemented for Node.

The goal here is to never have to redo any implementation of an application feature twice and the code here can be copied out and used when a similar implementation need to be done.

## Modules

### CSV Parse

[Module Folder 📁](csv_parse/)

Module implementing the [csv-parse](https://csv.js.org/parse/) to parse data from a [CSV file](csv_parse/data/kepler_data.csv) containing data on the Kepler planets from the [NASA exoplanet archive](https://exoplanetarchive.ipac.caltech.edu/docs/data.html).

This module implements:

- Streaming data from a file
- Parsing CSV data
- Filtering Javascript objects based on the object properties.

#### Third party packages used

- [csv-parse](https://www.npmjs.com/package/csv-parse) **`^5.3.0`** : `npm install csv-parse`