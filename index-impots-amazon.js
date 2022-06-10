var twit = require("twit")
const config = require("./config.json")

const T = new twit({
    consumer_key:config.consumer_key,
    consumer_secret:config.consumer_secret,
    access_token:config.access_token,
    access_token_secret:config.access_token_secret
})

const matchWords = [
    "Impôts Amazon",
    "impôts amazon",
    "impôts @AmazonNewsFR",
    "Impots @AmazonNewsFR",
    "amazon impots",
    "impot amazon",
    "amazon impot",
    "amazon Impots"
]
const RetrievedTweets = [
]
//works for simple bots but poorly implemented
function retweet(){
    matchWords.forEach(word=>{
        T.get('search/tweets', { q: word, count: 100 }, function(err, data, response) {
            for(let i=0;i<data.statuses.length;i++){
                let id = data.statuses[i].id_str;
                if(!RetrievedTweets.includes(id)){
                    T.post("statuses/retweet/" + id, {}, (error, response) => {
                        if (error) {
                            console.log(error.message);
                        }
                    })
                    RetrievedTweets.push(id)
                }
            }
        })
    })
}
setInterval(retweet,10000)