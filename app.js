
var P=[
["Tomatoes","🍅","Vegetables",60,"500 g"],["Carrots","🥕","Vegetables",50,"500 g"],["Spinach","🥬","Vegetables",35,"250 g"],
["Foxtail millet","🌾","Grains",120,"1 kg"],["Brown rice","🍚","Grains",140,"1 kg"],["Whole wheat flour","🌾","Grains",75,"1 kg"],
["Toor dal","🫘","Pulses",160,"1 kg"],["Moong beans","🫘","Pulses",150,"1 kg"],
["Wild honey","🍯","Pantry",350,"500 g"],["Cold-pressed groundnut oil","🥜","Pantry",420,"1 L"],["Turmeric powder","🟡","Spices",110,"200 g"],["Cumin seeds","🌿","Spices",95,"100 g"]];
var S=[["Tomatoes",60,45],["Brown rice",140,109],["Wild honey",350,299],["Turmeric powder",110,89]];
var R=[["Meera S.","5","The tomatoes taste like the ones from my grandmother's garden."],["Rahul P.","5","Delivery was on time and the packing was plastic-free."],["Anita D.","4","Great millets. I would like more pulse varieties."]];

var $=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var cat="All";
function drawP(){var pl=$("plist");if(!pl)return;
var cats=["All"].concat(P.map(function(p){return p[2]}).filter(function(v,i,a){return a.indexOf(v)==i}));
$("filters").innerHTML=cats.map(function(c){return '<button class="'+(c==cat?"on":"")+'" data-c="'+c+'">'+c+'</button>'}).join("");
pl.innerHTML=P.filter(function(p){return cat=="All"||p[2]==cat}).map(function(p){
return '<div class="card"><div class="em">'+p[1]+'</div><h3>'+p[0]+'</h3><span class="tag">'+p[2]+'</span><p style="margin:8px 0 2px;color:var(--mute)">'+p[4]+'</p><div class="price">\u20b9'+p[3]+'</div></div>'}).join("")}
if($("filters"))$("filters").onclick=function(e){if(e.target.dataset.c){cat=e.target.dataset.c;drawP()}};
drawP();
if($("slist"))$("slist").innerHTML=S.map(function(s){
var em=(P.filter(function(p){return p[0]==s[0]})[0]||[0,"\ud83c\udf3f"])[1];
return '<div class="card sale"><div class="em">'+em+'</div><h3>'+s[0]+'</h3><span class="off">'+Math.round((1-s[2]/s[1])*100)+'% off</span><div class="price" style="margin-top:8px">\u20b9'+s[2]+'<s>\u20b9'+s[1]+'</s></div></div>'}).join("");
function drawR(){if(!$("reviews"))return;$("reviews").innerHTML=R.map(function(r){
return '<div class="card"><h3>'+esc(r[0])+' <span class="tag">'+"\u2605".repeat(+r[1])+'</span></h3><p style="margin:6px 0 0">'+esc(r[2])+'</p></div>'}).join("")}
try{var sv=JSON.parse(localStorage.getItem("org_reviews")||"[]");R=sv.concat(R)}catch(e){}
drawR();
if($("ffm"))$("ffm").onsubmit=function(e){e.preventDefault();var f=e.target,n=[f.n.value,f.r.value.charAt(0),f.c.value];
R.unshift(n);try{var s=JSON.parse(localStorage.getItem("org_reviews")||"[]");s.unshift(n);localStorage.setItem("org_reviews",JSON.stringify(s))}catch(x){}
drawR();f.reset();$("fmsg").className="msg on"};
if($("cfm"))$("cfm").onsubmit=function(e){e.preventDefault();e.target.reset();$("cmsg").className="msg on"};
