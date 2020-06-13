// Connecting to ROS
  // -----------------

  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });

  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });

  // Publishing a Topic
  // ------------------

 
  var led = new ROSLIB.Topic({
    ros : ros,
    name : '/led',
    messageType : 'std_msgs/String'
  });

  

  let sendButton = document.getElementById("submit");
  var text = ''
  
  sendButton.onclick = function(){
    text = document.getElementById("text").value;
    alert("Text in this box is: " + text);
    console.log(text);
    var newText = new ROSLIB.Message({
        data: text
     });

    led.publish(newText);
  }

  // Subscribing to command velocity

  var cmd_vel = new ROSLIB.Topic({
    ros: ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'


  })

  Plotly.plot("chart",[{
    y:[0],
    type:"line"
    }]);

  let run = true;
  function print_vel(msg){
          var currentTime=new Date();
           var hours=currentTime.getHours();
           var minutes=currentTime.getMinutes();
           var seconds=currentTime.getSeconds();
           var timeNow = hours+ ":" + minutes + ":"+ seconds ;
    console.log(timeNow);
    console.log(msg);
    let abs_vel = ((msg.linear.x)**2 + (msg.linear.y)**2+ (msg.linear.z)**2)**0.5;
    console.log(`The absolute velocity is ${abs_vel}`);
    let ang_vel = msg.angular.z;
    console.log(`The angular velocity is ${ang_vel}`);
    Plotly.extendTraces("chart",{y:[[abs_vel]]}, [0]);

   
  }
  cmd_vel.subscribe(function(msg){print_vel(msg)});

  
  //displaying command velocity as a graph

 
   // Subscribing to the pose message
   var pose = new ROSLIB.Topic({
    ros : ros,
    name : '/robot_pose',
    messageType : 'geometry_msgs/Pose'
  });
  
  pose.subscribe(function(position){

    turtleBot.x = position.position.x;
    turtleBot.y = position.position.y;
  })
  
  

// creating a map
//function init() {

  // Create the main viewer.
  var viewer = new ROS2D.Viewer({
    divID : 'map',
    width : 600,
    height : 500,


  });


  // Setup the map client.
  var gridClient = new ROS2D.OccupancyGridClient({
  ros : ros,
  rootObject : viewer.scene
});

 // adding the arrow pose of turtleBot to the map
 var turtleBot = new ROS2D.NavigationArrow({
  size:0.001,
  strokeSize: 0.1,
  pulse: true
})

  gridClient.rootObject.addChild(turtleBot) ;


  // Scale the canvas to fit to the map
  gridClient.on('change', function(){
    viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
  
  });
  
//}






