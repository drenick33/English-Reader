const request = require('request');
const uuidv4 = require('uuid/v4');

const wordTranslate = (req, res) => {
  /* This simple app uses the '/translate' resource to translate text from
one language to another. */

  /* This template relies on the request module, a simplified and user friendly
way to make HTTP requests. */
  var eng = req.params.word; //Word from end of url

  //Add Secret Key to headers
  var key_var = 'TRANSLATOR_TEXT_SUBSCRIPTION_KEY';
  if (!process.env[key_var]) {
    throw new Error(
      'Please set/export the following environment variable: ' + key_var
    );
  }
  var subscriptionKey = process.env[key_var];

  //Set URL of the api
  var endpoint_var = 'TRANSLATOR_TEXT_ENDPOINT';
  if (!process.env[endpoint_var]) {
    throw new Error(
      'Please set/export the following environment variable: ' + endpoint_var
    );
  }
  var endpoint = process.env[endpoint_var];

  //Set region
  var region_var = 'TRANSLATOR_TEXT_REGION_AKA_LOCATION';
  if (!process.env[region_var]) {
    throw new Error(
      'Please set/export the following environment variable: ' + region_var
    );
  }
  var region = process.env[region_var];

  /* If you encounter any issues with the base_url or path, make sure that you are
using the latest endpoint: https://docs.microsoft.com/azure/cognitive-services/translator/reference/v3-0-translate */
  //   function translateText() {
  //     let options = {
  //       method: 'POST',
  //       baseUrl: endpoint,
  //       url: 'translate',
  //       qs: {
  //         'api-version': '3.0',
  //         to: ['zh'],
  //       },
  //       headers: {
  //         'Ocp-Apim-Subscription-Key': subscriptionKey,
  //         'Ocp-Apim-Subscription-Region': region,
  //         'Content-type': 'application/json',
  //         'X-ClientTraceId': uuidv4().toString(),
  //       },
  //       body: [
  //         {
  //           text: eng,
  //         },
  //       ],
  //       json: true,
  //     };

  //     request(options, function (err, result, body) {
  //       if (err) {
  //         res.status(500).json(err);
  //       } else {
  //         console.log(JSON.stringify(body, null, 4));
  //         res.status(200).json({ message: 'Translation success', body });
  //       }
  //     });
  //   }

  function dictionaryLookup() {
    let options = {
      method: 'POST',
      baseUrl: endpoint,
      url: 'dictionary/lookup',
      qs: {
        'api-version': '3.0',
        from: 'en',
        to: 'zh',
      },
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
      },
      body: [
        {
          text: eng,
        },
      ],
      json: true,
    };

    request(options, function (err, result, body) {
      if (err) {
        res.status(500).json(err);
      } else {
        let trans = [];
        for (let i of body) {
          console.log('key is: ', Object.keys(i));
          for (k of i['translations']) {
            trans.push(k['normalizedTarget']);
          }
          // Object.values can be used as well in newer versions.
        }
        res.status(200).json({ message: 'Translation success', trans });
      }
    });
  }

  // Call the function to translate text.
  dictionaryLookup();
  //translateText();
};

module.exports = wordTranslate;
