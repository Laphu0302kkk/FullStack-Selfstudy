let xp=0
let health=100
let gold= 50
let currentWeapon = 0
let fighting;
let monterHealth ;
let inventory=["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
	{
		name: "stick",
		power: 5
	},
	{
		name: "dagger",
		power: 30
	},
	{
		name: "claw hammer",
		power: 50
	},
	{
		name: "sword",
		power: 100
	}
];
const monsters = [
    {
      name: "slime",
      level: 2,
      health: 15
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60
    },
    {
      name: "dragon",
      level: 20,
      health: 300
    }
  ];
  

const locations=[{
    name:"town square",
    "button text":["Go to store","Go to cave","Fight dragon"],
    "button functions":[gostore,goCave,fightDragon],
    text:"you enter the town square. You see the sign that says \"strore\"."
},
{
    name:"store",
    "button text":["buy 10 health(10 gold)","buy weapon(30 gold)","go Town"],
    "button functions":[buyHealth,buyWeapon,goTown],
    text:"you enter the store"
},{
    name:"cave",
    "button text":["Fight slime","fight fanged beast","Go Town square"],
    "button functions":[fightSlime,fightFangedBeast,goTown],
    text:"you enter the cave. See some monters."
},{
    name:"fight",
    "button text":["Attack","Dodge","Run"],
    "button functions":[attack,dodge,goTown],
    text:"you are fighting a monster"
},{
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
},{
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
},
{
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
},
{
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
}
]

button1.onclick=gostore;
button2.onclick=goCave;
button3.onclick=fightDragon;

function update(location){
    monsterStats.style.display="none";
    button1.innerText=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];
    button1.onclick=location["button functions"][0];
    button2.onclick=location["button functions"][1];
    button3.onclick=location["button functions"][2];
    text.innerText=location.text;
}

function goTown(){
update(locations[0]);
    
}
function gostore(){
update(locations[1]);
}
function goCave(){
update(locations[2]);
}

function buyHealth(){
    if(gold>=10){
        gold-=10;
        health+=10;
        goldText.innerText=gold;
        healthText.innerText=health;
    }
    else{
        text.innerText="you do not have enough gold to buy health";
    }
}
function buyWeapon(){
if(currentWeapon<weapons.length-1){
    if (gold>=30){
        gold-=30;
        currentWeapon++;
        text.innerText="you now have a "+weapons[currentWeapon].name;
        goldText.innerText=gold;
        inventory.push(weapons[currentWeapon].name);
        text.innerText="in your inventory now have a "+inventory;
                }
        else{
        text.innerText="you do not have enough gold to buy weapon";
    
        }   
}else{
    text.innerText="you already have the most powerfful a weapon";
    button2.innerText="sell weapon for 15 gold";
    button2.onclick=sellWeapon;
}
}
function sellWeapon(){
if (inventory.length>1){
gold+=15;
goldText.innerText=gold;
let currentWeapon=inventory.shift();
text.innerText="you sold your "+currentWeapon;
text.innerText="in your inventory now have a "+inventory;
}else{
text.innerText="you can not sell your last weapon";

}


}

function fightSlime(){
    fighting=0;
    gofight();
}
function fightFangedBeast(){
fighting=1;
gofight();

}
function fightDragon(){
fighting=2;
gofight();
}
function gofight(){
update(locations[3]);
monterHealth=monsters[fighting].health;
monsterStats.style.display="block";
monsterNameText.innerText=monsters[fighting].name;
monsterHealthText.innerText=monterHealth;
}
function attack(){
    text.innerText="the"+monsters[fighting].name+"attack";
    text.innerText="you attack it with your "+weapons[currentWeapon].name+".";
    if(ismontehit()){
        health-=getmonterAttack(monsters[fighting].level);
    }else{
        text.innerText+= "you missed";
    }
    monterHealth-=weapons[currentWeapon].power+Math.floor(Math.random()*xp)+1;
    healthText.innerText=health;
    monsterHealthText.innerText=monterHealth;
if(health<=0){
    lose();
}else if (monterHealth<=0){
    fighting===2 ? wingame() : defeatMonter();
}
if(Math.random()<=.1 && inventory.length!==1){
text.innerText+="you lost your "+inventory.pop();
currentWeapon--;
}
}


   function getmonterAttack(level){
    let hit=(level*5)-(Math.floor(Math.random()*xp) );
    console.log(hit);
    return hit;   
    }

    function ismontehit(){
        
        return Math.random()>.2 || health < 20;
    }
function dodge(){
text.innerText="you dodge the "+monsters[fighting].name+" attack";

}
function defeatMonter(){
    gold+=Math.floor(monsters[fighting].level*6.7);
    xp+=monsters[fighting].level;
    goldText.innerText=gold;
    xpText.innerText=xp;
    update(locations[4]);
}
function lose(){
update(locations[5]);
}
function wingame(){
update(locations[6]);
}
function restart(){
    xp=0;
    health=100; 
    gold=50;
    currentWeapon=0;
    inventory=["stick"];
    goldText.innerText=gold;
    xpText.innerText=xp;    
    healthText.innerText=health;
    goTown();
}
function easterEgg(){
    update(locations[7]);
}
function pickTwo(){
    pick(2);
}
function pickEight(){
    pick(8);
}
function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health
        if (health <= 0) {
          lose();
        }
    }
}