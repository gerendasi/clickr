Servo myservo;  // create servo object to control a servo

int startPos = 0; // clickr starting position
int clickPos = 180;    // clickr clicked position
int timeDown = 1000; // time for servo to remain pressed

char settingsBundle[64] = "0,180,1000"; // Bundled settings for sending back to the app

// EEPROM storage for settings
uint8_t startPosByte;
uint8_t clickPosByte;
uint8_t timeDownByte;

int startAddr = 1;
int clickAddr = 2;
int timeDownAddr = 3;

void loadSettingsFromEEPROM() {
    uint8_t startPosByte = EEPROM.read(startAddr);
    uint8_t clickPosByte = EEPROM.read(clickAddr);
    //uint8_t timeDownByte = EEPROM.read(timeDownAddr);
    
    startPos = (int) startPosByte;
    clickPos = (int) clickPosByte;
    //timeDown = (int) timeDownByte;
    
    String values = "";
    values += startPos;
    values += ",";
    values += clickPos;
    values += ",";
    values += timeDown;
    
    values.toCharArray(settingsBundle, 64);
}

void setup() {
  // Servo pin allocation
  myservo.attach(D0);

  // Publically accessible functions
  Particle.function("settings", setClickrSettings);
  Particle.function("press", press);

  // Publically accessible variables
  Particle.variable("startPos", &startPos, INT);
  Particle.variable("clickPos", &clickPos, INT);
  Particle.variable("timeDown", &timeDown, INT);
  Particle.variable("settings", &settingsBundle, STRING);
  
  loadSettingsFromEEPROM();
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
    
    startPosByte = (uint8_t) startPos;
    clickPosByte = (uint8_t) clickPos;
    timeDownByte = (uint8_t) timeDown;
    
    EEPROM.write(startAddr, startPosByte);
    EEPROM.write(clickAddr, clickPosByte);
    //EEPROM.write(timeDownAddr, timeDownByte);
    
    values.toCharArray(settingsBundle, 64);
    
    toStart();

    return 0;
}