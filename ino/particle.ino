Servo myservo;  // create servo object to control a servo

int pos = 0;    // variable to store the servo position

void setup() {
  myservo.attach(A0);  // attaches the servo on the A0 pin to the servo object
  Spark.function("setPos", setPosition);
  Spark.variable("position", &pos, INT);
}

void loop() {
}

int setPosition(String posValue) {
    pos = posValue.toInt();
    myservo.write(pos);
    return 0;
}