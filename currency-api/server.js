console.log("SERVER STARTING");

// FUNCTIONS
// http CAN RUN AS A CLIENT
// LOAD FROM FIXER
// READING
let loadCurrencies = () =>{ 
    let data = require('./data/currencies.json');
    return data;
}
let apiCurrencyList = (req,res) =>{
    // ROUTES
    if(req.url == '/currencies'){
        res.end( JSON.stringify (loadCurrencies()));
    }else if(req.url.startsWith('/currency')){
        // EXTRACTING CODE FROM URL
        // some/path/%%% URL PARAMETER
        let code = req.url.split('/').pop();

        let data = loadCurrencies();
        for(let i = 0; i<data.length; i++){
            if(data[i].code==code){
                res.write(JSON.stringify(data[i]));
                break;
            }
        }
    }else{
        res.writeHead(404,{});
        res.end(http.STATUS_CODES[404]);
    }
}

// HTTP SERVER
let http = require('http');
let server = http.createServer(apiCurrencyList);
    server.listen('7777');
console.log(loadCurrencies());