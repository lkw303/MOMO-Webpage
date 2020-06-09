# MOMO Webpage
this webpage is created do that a user can send messages which will be displayed on the Neopixel Matirices on the sides of the MOMO bot.

## How it Works
<img src = "images/momo_rosgraph.png" width = "500"><br>Figure 1.1</img>

Using the ROS-JS library, the webpage publishle messages users input intp the page to the "led" topic via rosbridge. The Rosserial node which is subscribed to this topic recieves it and sends it via I2C to the Arduino Uno that is connected directly to the Neopixel Matrix.

The code for the Arduino Unos can be found in my ROS Neopixel Matrix repository.

## Instructions
> roscore

> rosrun rosserial_python serial_node.py

> roslaunch rosbridge_server rosbridge_websocket.launch

## Dependencies