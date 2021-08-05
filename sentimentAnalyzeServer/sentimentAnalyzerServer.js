const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
function getNLUInstance(){
    let api_key = process.env.apikey;
    let api_url = process.env.url;
    const NaturalLanguagegetUnderstandingV1=require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');
    const naturalLanguageUnderstanding = new NaturalLanguagegetUnderstandingV1({
        version: '2021-07-26',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}
const app = new express();

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



// New code
const express = require('express');
	const app = new express();
	app.use(express.static('client'))
	 
	const cors_app = require('cors');
	app.use(cors_app());
	 
	//This should be added by the learner on the basis of the learning in the modules 
	const dotenv = require('dotenv');
	const { request } = require('express');
	 dotenv.config();
	const api_key = process.env.API_KEY;
	const api_url = process.env.API_URL;
	 
	app.get("/",(req,res)=>{
	 res.render('index.html');
	 });
	 
	 
	

	

	 
	//add the getNLUInstance method here
	 
	const getNLUInstance = ()=>{
	 
	 const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
	 const { IamAuthenticator } = require('ibm-watson/auth');
	 
	 const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
	 version: '2020-08-01',
	 authenticator: new IamAuthenticator({
	 apikey: api_key,
	 }),
	 serviceUrl: api_url,
	 });
	 return naturalLanguageUnderstanding;
	}
	 
	app.get("/url/emotion", (req,res) => {
	 
	 const analyzeParams = {
	 'url': req.query.url,
	 'features': {
	 'entities': {
	 'emotion': true,
	 'limit': 1
	 }
	 }
	 }
	 
	 const naturalLanguageUnderstanding = getNLUInstance();
	 
	 naturalLanguageUnderstanding.analyze(analyzeParams)
	 .then(analysisResults => {
	     console.log(analysisResults);
	 console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
	 return res.send(analysisResults.result.entities[0].emotion,null,2);
	 //return res.send(analysisResults);
	 })
	 .catch(err => {
	 return res.send("Could not do desired operation "+err);
	 });
	 
	});
	 
	app.get("/url/sentiment", (req,res) => {
	    const analyzeParams = {
	 'url': req.query.url,
	 'features': {
	 'entities': {
	 'sentiment': true,
	 'limit': 1
	 }
	 }
	 }
	 
	 const naturalLanguageUnderstanding = getNLUInstance();
	 
	 naturalLanguageUnderstanding.analyze(analyzeParams)
	 .then(analysisResults => {
	     console.log(analysisResults);
	 console.log(JSON.stringify(analysisResults.result.entities[0].sentiment,null,2));
	 return res.send(analysisResults.result.entities[0].sentiment.label,null,2);
	 //return res.send(analysisResults);
	 })
	 .catch(err => {
	 return res.send("Could not do desired operation "+err);
	 });
	 
	});
	 
	app.get("/text/emotion", (req,res) => {
	 const analyzeParams = {
	 'text': req.query.text,
	 'features': {
	 'entities': {
	 'emotion': true,
	 'limit': 1
	 }
	 }
	 }
	 
	 const naturalLanguageUnderstanding = getNLUInstance();
	 
	 naturalLanguageUnderstanding.analyze(analyzeParams)
	 .then(analysisResults => {
	     console.log(analysisResults);
	 //console.log(JSON.stringify(analysisResults.result.entities[0].emotion,null,2));
	return res.send(analysisResults.result.entities[0].emotion,null,2);
	 //return res.send(analysisResults);
	 })
	 .catch(err => {
	 return res.send("Could not do desired operation "+err);
	 });
	 
	});
	 
	app.get("/text/sentiment", (req,res) => {
	 const analyzeParams = {
	 'text': req.query.text,
	 'features': {
	 'entities': {
	 'sentiment': true,
	 'limit': 1
	 }
	 }
	 }
	 
	 const naturalLanguageUnderstanding = getNLUInstance();
	 
	 naturalLanguageUnderstanding.analyze(analyzeParams)
	 .then(analysisResults => {
	     console.log(analysisResults);
	 console.log(JSON.stringify(analysisResults.result.entities[0].sentiment,null,2));
	 return res.send(analysisResults.result.entities[0].sentiment.label,null,2);
	 //return res.send(analysisResults);
	 })
	 .catch(err => {
	 return res.send("Could not do desired operation "+err);
	 });
	 
	});
	 
	let server = app.listen(8080, () => {
	 console.log('Listening', server.address().port)
	})
