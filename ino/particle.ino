Servo myservo;  // create servo object to control a servo

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(A0);  // attaches the servo on the A0 pin to the servo object
  Spark.function("setpos", setPosition);
  Spark.variable("getpos", &pos, INT);
}

void loop() {
}

int setPosition(String posValue) {
    pos = posValue.toInt();
    myservo.write(pos);
    return 0;
}