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

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
  });

  var twist = new ROSLIB.Message({
    linear : {
      x : 0.1,
      y : 0.2,
      z : 0.3
    },
    angular : {
      x : -0.1,
      y : -0.2,
      z : -0.3
    }
  });
  cmdVel.publish(twist);

  

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
    name: '/turtle1/cmd_vel',
    messageType: 'geometry_msgs/Twist'


  })
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
    document.getElementById("velocity").innerHTML = `Velocity  ${50*abs_vel} Angular Velocity: ${ang_vel}`;
  }

 
  cmd_vel.subscribe(function(msg){print_vel(msg)});

  //displaying command velocity as a graph
  function getData(){
    velocity_array = cmd_vel.subscribe(function(msg){return [msg.linear.x, msg.linear.y];});
    velocity =(velocity_array()[0]**2 + velocity_array()[1]
**2)**0.5;
    return velocity
  };
  

  

  // Calling a service
  // -----------------

  var addTwoIntsClient = new ROSLIB.Service({
    ros : ros,
    name : '/add_two_ints',
    serviceType : 'rospy_tutorials/AddTwoInts'
  });

  var request = new ROSLIB.ServiceRequest({
    a : 1,
    b : 2
  });

  addTwoIntsClient.callService(request, function(result) {
    console.log('Result for service call on '
      + addTwoIntsClient.name
      + ': '
      + result.sum);
  });

