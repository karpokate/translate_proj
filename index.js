'use strict';

const TelegramBot = require('node-telegram-bot-api');

const telegram = new TelegramBot("734939855:AAH1GE4-wDrHOUc9ZFsGpI88MMclqficdTE", { polling: true })
const translate = require('node-google-translate-skidz')

telegram.on("text", (message) => {
  translate({
    text: message.text,
    target: 'it',
  }, (result) => telegram.sendMessage(message.chat.id, result.translation))
})

clas Tranlator {

//array with languages 
 let language = {
    English :"en",
    Russian :"ru",
    Ukraiinian : "uk",
    German : "de",
    French :"fr"
};

// array for default languages 
let default_lang = {
from : "ru",
to : "en"
};


let word;
let to="";
let from="auto";

let url = "https://translate.google.com/translate_a/single?client=webapp&sl={$from}&tl={$to}&hl={$from}&dt=bd&dt=ex&dt=ld&dt=md&dt=qc&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&prev=btn&rom=1&ssel=3&tsel=4&tk=520078|504525&q=".encodeURIComponent(word);

//function for get content (translated)

function url_get_content(url) {
    if (!function_exists('curl_init')){ 
        log('CURL is not installed!');
      }else{
        ch = curl_init();
        
        curl_setopt(ch, CURLOPT_URL, url);
        curl_setopt(ch, CURLOPT_RETURNTRANSFER, true);
        output = curl_exec(ch);
        
        if(curl_errno(ch)){
          log('cURL Error : ' . curl_error(ch));
          output = false;
        }
        curl_close($ch);
        
        return output;
} 





telegram.on("inline_query", (query) => {
  if (query.query !== '') {
    translate({
      text: query.query,
      target: 'it',
    }, (result) => {
      telegram.answerInlineQuery(query.id, [
        {
          type: "article",
          id: "translatearticle",
          title: "Traducime esto",
          input_message_content: {
            message_text: result.translation
          }

        }
      ])
    })
  }
  
})

}