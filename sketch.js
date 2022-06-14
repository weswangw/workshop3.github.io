

let dataServer;
let pubKey = "pub-c-eb5f6792-172e-4842-b65f-e2947c26f261";
let subKey = "sub-c-2ab7dba1-e634-42df-ba90-fd36daff9ec5";
let secretKey = "sec-c-ODY5M2NkMjItNmZhMy00MDkxLThiZGMtYTQyODJkYjZkNGFh";

let occupancy = 0; 


let channelName = "Wes' App";

  
function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: "Zhe Wang",
      secretKey: secretKey,
      heartbeatInterval: 0,
    });
    dataServer.subscribe({ channels: [channelName],   withPresence: true });
    // listen for messages coming through the subcription feed on this specific channel. 
    dataServer.addListener({ message: readIncoming, presence: whoisconnected });
   
  
  }
  
function draw() {
  background(50);
  textSize(30);
  textAlign(CENTER);
  fill(255,255,102);

 if (occupancy > 0) {

  text("Wow!"+ " You now have " +  occupancy + " people that actually want to be friend with you!", windowWidth/2, windowHeight/2);

 } else {

  text("Hmmm..."+ "You are more lonely than you think!", windowWidth/2, windowHeight/2);

 }
 
}
 

function mousePressed() {

  sendTheMessage();
}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      test: "test"
    },
  });
}

function readIncoming(inMessage) {
    if (inMessage.channel == channelName) {
        console.log(inMessage);
    }
}

function whoisconnected(connectionInfo) {
  console.log(connectionInfo);

  occupancy = connectionInfo.occupancy;

  console.log(occupancy);

  /* connnectionInfo.action == "join"*/
  /* connnectionInfo.action == "leave"*/

}