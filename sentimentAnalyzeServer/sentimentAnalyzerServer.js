const express = require('express');
const dotenv = require('dotenv')
const app = new express();
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/netural-language-understanding/v1');
    const { IamAuthenticator } =  require ('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator ({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    })
    return naturalLanguageUnderstanding;

}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
const analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {
                'limit': 1
            }
        }
    };
    console.log(analyzeParams);
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResult => {
        const jsonaux = JSON.stringify(analysisResult,null,2)
        console.log(jsonaux);
        return res.send(JSON.stringify(analysisResult.result.emotion.document.emotion));
    })
    .catch(err => {
        console.log('error:',err);
        return res.send('error ocurred, please try again');
    });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {
                'limit': 1
            }
        }
    };
    console.log(analyzeParams);
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResult => {
        const jsonaux = JSON.stringify(analysisResult,null,2)
        console.log(jsonaux);
        return res.send(analysisResult.result.sentiment.document.label);
    })
    .catch(err => {
        console.log('error:',err);
        return res.send('error ocurred, please try again');
    });
    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'limit': 1
            }
        }
    };
    console.log(analyzeParams);
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResult => {
        const jsonaux = JSON.stringify(analysisResult,null,2)
        console.log(jsonaux);
        return res.send(JSON.stringify(analysisResult.result.emotion.document.emotion));
    })
    .catch(err => {
        console.log('error:',err);
        return res.send('error ocurred, please try again');
    });
    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                'limit': 1
            }
        }
    };
    console.log(analyzeParams);
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResult => {
        const jsonaux = JSON.stringify(analysisResult,null,2)
        console.log(jsonaux);
        return res.send(analysisResult.result.sentiment.document.label);
    })
    .catch(err => {
        console.log('error:',err);
        return res.send('error ocurred, please try again');
    });
    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

