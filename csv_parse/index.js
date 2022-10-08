const fs = require('fs');
const { parse } = require('csv-parse');

// Define reference planet metadata
const planetMetadata = {
    kepid: '',
    kepoi_name: '',
    kepler_name: '',
    koi_disposition: '',
    koi_pdisposition: '',
    koi_score: '',
    koi_fpflag_nt: '',
    koi_fpflag_ss: '',
    koi_fpflag_co: '',
    koi_fpflag_ec: '',
    koi_period: '',
    koi_period_err1: '',
    koi_period_err2: '',
    koi_time0bk: '',
    koi_time0bk_err1: '',
    koi_time0bk_err2: '',
    koi_impact: '',
    koi_impact_err1: '',
    koi_impact_err2: '',
    koi_duration: '',
    koi_duration_err1: '',
    koi_duration_err2: '',
    koi_depth: '',
    koi_depth_err1: '',
    koi_depth_err2: '',
    koi_prad: '',
    koi_prad_err1: '',
    koi_prad_err2: '',
    koi_teq: '',
    koi_teq_err1: '',
    koi_teq_err2: '',
    koi_insol: '',
    koi_insol_err1: '',
    koi_insol_err2: '',
    koi_model_snr: '',
    koi_tce_plnt_num: '',
    koi_tce_delivname: '',
    koi_steff: '',
    koi_steff_err1: '',
    koi_steff_err2: '',
    koi_slogg: '',
    koi_slogg_err1: '',
    koi_slogg_err2: '',
    koi_srad: '',
    koi_srad_err1: '',
    koi_srad_err2: '',
    ra: '',
    dec: '',
    koi_kepmag: ''
}

// Initialize empty array to hold the data from the file
const habitablePlanets = [];

/**
 * Checks the planet metadata if it meets the criteria to be habitable.
 * 
 * @param { planetMetadata } planet 
 * @returns {boolean} true or false
 */
const isHabitable = planet => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

// Create read stream to read data from the csv file
/* Because we intend to run this code from this project's root directory,
    the file path has been add relative to the root directory.
*/
fs.createReadStream('csv_parse/data/kepler_data.csv')
    /* Pipe the stream contents from the inbuilt fs module to the parse function from
       the csv-parse package.

       `comments` sets it to treat the `#` symbol as a comment
       `columns` sets it to generate a jaavascript object for each csv row where the
            keys are the column headers.

        See the csv-parse docs: https://csv.js.org/parse/options/ for more options.
    */
    .pipe(parse({
        comment: '#',
        columns: true
    }))
    .on('data', data => {
        // Check if the planet is habitable
        if (isHabitable(data)) {
            habitablePlanets.push(data);
        }
    })
    // Handle `error` events from the createReadStream
    .on('error', error => {
        console.log("[ERROR] csv_parse: Encountered an error while creating read stream. --> ", error);
    })
    .on('end', () => {
        console.log(`[INFO] csv_parse: Found ${habitablePlanets.length} habitable planets`);
        console.log("[DEBUG] csv_parse: Habitable planets", habitablePlanets.map(planet => planet['kepler_name']));
    });
