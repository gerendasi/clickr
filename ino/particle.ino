Servo myservo;  // create servo object to control a servo

int startPos = 0; // clickr starting position
int clickPos = 180;    // clickr clicked position
int timeDown = 1000; // time for servo to remain pressed

void setup() {
  // Servo pin allocation
  myservo.attach(A0);

  // Publically accessible functions
  Spark.function("settings", setClickrSettings);
  Spark.function("press", press);

  // Publically accessible variables
  Spark.variable("startPos", &startPos, INT);
  Spark.variable("clickPos", &clickPos, INT);
  Spark.variable("timeDown", &timeDown, INT);
}

void loop() {
}

int toStart() {
	myservo.write(startPos);

	return 0;
}

int press(String value) {
	myservo.write(clickPos);
	delay(timeDown);
	myservo.write(startPos);
	
	return 0;
}

// Values parses in "startValue, clickValue, timeDownValue"
int setClickrSettings(String values) {
	String startValue = "";
	String clickValue = "";
	String timeDownValue = "";
	
	int startPoint = 0;
	int currentPoint = values.indexOf(',');
	int i = 0;

	while (currentPoint != -1) {
		if (i == 0) {
			startValue += values.substring(startPoint, currentPoint);
		} else if (i == 1) {
			clickValue += values.substring(startPoint, currentPoint);
		} else if (i == 2) {
			timeDownValue += values.substring(startPoint, currentPoint);
		}

		startPoint = currentPoint + 1;
		currentPoint = values.indexOf(',', startPoint);
		i++;
	}

    startPos = startValue.toInt();
    clickPos = clickValue.toInt();
    timeDown = timeDownValue.toInt();
    
    toStart();

    return 0;
}