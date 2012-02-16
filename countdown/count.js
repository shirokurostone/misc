

var countdown = {};
countdown.limit     = new Date(2012, 2-1, 15, 17, 0, 0);
countdown.message   = "修論/卒論提出〆切まで";

(function(){

   var clickcount = 0;

   function click(){
     clickcount += 1;
   }
   
   function getNormalFormattedString(context, seconds){
     
     var text = "";
     
     if (seconds >= 24*60*60){
       context.font = "100pt Arial";
       text += parseInt(seconds/24/60/60)+"d";
       text += ""+parseInt(seconds/60/60%24/10)+parseInt(seconds/60/60%24%10)+"h";
       text += ""+parseInt(seconds/60%60/10)+parseInt(seconds/60%60%10)+"m";
       text += ""+parseInt(seconds%60/10)+parseInt(seconds%60%10)+"s";
     }
     else if (seconds >= 60*60){
       context.font = "120pt Arial";
       text += ""+parseInt(seconds/60/60%24)+"h";
       text += ""+parseInt(seconds/60%60/10)+parseInt(seconds/60%60%10)+"m";
       text += ""+parseInt(seconds%60/10)+parseInt(seconds%60%10)+"s";
     }
     else if (seconds >= 60){
       context.font = "150pt Arial";
       text += ""+parseInt(seconds/60%60)+"m";
       text += ""+parseInt(seconds%60/10)+parseInt(seconds%60%10)+"s";
     }
     else if (seconds >= 0){
       context.font = "150pt Arial";
       text += ""+parseInt(seconds%60)+"s";
     }
     else{
       context.font = "150pt Arial";
       text += "0s";
     }

     return text;
   }

   function getSecondFormattedString(context, seconds){
     var text = "";

     context.font = "125pt Arial";
     text += ""+parseInt(seconds)+"s";
     
     return text;
   }

   function getMinuteFormattedString(context, seconds){
     var text = "";

     context.font = "150pt Arial";
     text += ""+parseInt(seconds/60)+"m";
     
     return text;
   }

   function getHourFormattedString(context, seconds){
     var text = "";

     context.font = "175pt Arial";
     text += ""+parseInt(seconds/60/60)+"h";
     
     return text;
   }

   function getDayFormattedString(context, seconds){
     var text = "";

     context.font = "200pt Arial";
     text += ""+parseInt(seconds/60/60/24)+"d";
     
     return text;
   }

   function maximize(elem){
     elem.width  = window.innerWidth;
     elem.height = window.innerHeight;
   }

   function draw(seconds, message, textcolor){

     // canvasを最大化する
     var canvas = document.getElementById('canvas');
     maximize(canvas);
     var context = canvas.getContext('2d');

     // 黒で塗りつぶし
     context.fillStyle = "#000000";
     context.fillRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));

     // 残り時間のテキストを取得     
     var text;
     if (seconds >= 0){
       var funcs = [getNormalFormattedString, getDayFormattedString, getHourFormattedString, getMinuteFormattedString, getSecondFormattedString];
       text = funcs[clickcount % funcs.length](context, seconds);
     }
     else{
       context.font = "100pt Arial";
       text = "Finish";
     }
     
     var gradient;
     gradient = context.createLinearGradient(0,window.innerHeight/10*4,0, window.innerHeight/10*6);
     gradient.addColorStop(0, 'black');
     gradient.addColorStop(1, textcolor);

     // 残り時間テキストの描画     
     context.setTransform(1,0,0,1,0,0);
     context.beginPath();
     context.textAlign = "center";
     context.fillStyle = textcolor;
     context.fillText(text,window.innerWidth/2,window.innerHeight/2);
     context.fill();
     
     // 鏡面の描画
     context.beginPath();
     context.textAlign = "center";
     context.fillStyle = "#FFFFFF";
     context.fillStyle = gradient;
     context.setTransform(1,0,0,-1,0,window.innerHeight+20);
     context.fillText(text,window.innerWidth/2,window.innerHeight/2);
     context.fill();

     // メッセージの描画
     context.font = "20pt Arial";

     gradient = context.createLinearGradient(0,window.innerHeight/10*4,0, window.innerHeight/10*6);
     gradient.addColorStop(0, 'black');
     gradient.addColorStop(1, textcolor);

     context.setTransform(1,0,0,1,0,0);
     context.beginPath();
     context.textAlign = "center";
     context.fillStyle = textcolor;
     context.fillText(message,window.innerWidth/2,window.innerHeight/4*3);
     context.fill();

   }

   function run(){
     var now   = new Date();
     draw(parseInt((countdown.limit-now)/1000), countdown.message, "orange");
     setTimeout("countdown.run()", 100);
   }

   countdown.run = run;
   countdown.click = click;
   countdown.run();
   
 })();

