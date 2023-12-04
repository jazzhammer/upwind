# introduction

this **UPWIND** nextjs project is the web application portion of this project: 

<a href="https://miro.com/app/board/uXjVMIfn57A=/?moveToWidget=3458764571933452150&cot=14">UPWIND-miroboard</a>

whose objective is to regulate airflow in the exhaust pipe of a wood-burning stove.

## requirements

### about woodburning stoves
when wood burns, there is some smoke.  if wood is burning efficiently, the smoke is minimized because a large component 
of smoke from a fire is incompletely combusted carbon.
the phases of a fire's life cycle when smoke is more likely generated are: 
- **at the start**, when the temperature is **INcreasing** from ambient to maximal fire temperature ( wood begins to combust at 
 300C and it generates smoke as it approaches this temperature) and 
- **at the end**, when the temperature is **DEcreasing** from maximal temperature to ambient

if a woodburning stove is outdoors, there is plenty of space for the smoke to drift- or be blown away without bothering anyone. 

if the stove is **indoors**, we make special efforts to get the smoke to go outside and this is most important during 
the smokiest phases of the fire.  the flue of the stove is the pipe that conducts smoke from the stove's firebox 
outside.  often, this pipe leads fire-exhaust outside along the shortest route possible. in the case that has inspired 
this project, the pipe leads to a chimney that travels vertically for 40+ft.  and that's where the problems start. 

### about OUR woodburning stove

we burn wood to heat the house. we heat the house when the weather is cold.  the chimney from our stove is filled with 
cold air when there is no fire in the stove. with no fire, the air in the house is warmer than any of the air in the chimney 
and stove.  if the pipe lead quickly out of the house, this difference wouldn't be an issue. but we have a 40+ft column 
of cold dense air that pushes its way into the stove and therefore into the house when the stove door is open: the less 
dense warmer air in the house can't resist the head pressure of 40+ft of heavier air.  this air is especially cold in 
our case because the chimney is installed OUTSIDE the house.  yes, this is dumb. aside from the smoke-issue it causes 
that is described here, we don't benefit from a warm chimney inside the house.  instead, all the heat that reaches the 
chimney is unfortunately lost to the great outdoors. 

the temperature difference means that when we start a fire and when the fire is allowed to die, there is net pressure 
INTO the house and that pressure carries with it any smoke that the fire is producing... and it's a LOT of smoke, my 
friend. 
  
### the objective

the UPWIND project's objective is to automate the operation of a fan to blow air up the flue when the temperature 
difference between the stove's firebox and the air in the chimney would produce net pressure into the house. 

### methodology

- **sensing net pressure**
  
  the difference in pressure between the chimney column and the firebox is complicated by the fact that together, they 
  are a dynamic, open system.  however, even if they were 2 closed, static systems, the pressure difference is slight.
  this is one of those situations where a small difference is negligible in an industrial setting, but causes big 
  problems in a much smaller, domestic setting:  humans can't breathe well in a house full of smoke.

  so,  we don't have access to measurements of a pressure-difference. buuuuuut:  

- **sensing temperature**

  we **DO** have access to temperature measurements. and we don't have to measure the difference between chimney air 
  and firebox air.  we could do that, of course, but we don't have to.  it's enough to know if the temperature in the firebox 
  is less than 300C: ie. the temperature at which: 
  - wood catches fire, and
  - we're pretty confident that:
    - the fire's efficiency is producing a minimum of smoke, maybe even none and
    - there is enough pressure from hot exhaust that net pressure of the air column is UP the chimney, rather than DOWN

  and of course we care about this temperature if there is some kind of fire in the firebox.  in the warmer months, we're 
  not trying to keep a fire going in the firebox, so UPWIND would not care at that time, and would then not be running.

  **the fan**

  if we want to prevent a smoke-filled house, we want to combat the down-draft from the chimney.  typically, we use fans to move 
  air and that's why we're using one in this project. it has to be stronger than the typical down-draft pressure.  again,
  this is not a hurricane-force wind.  even a small pressure difference pushes enough smoke into our house that life is 
  miserable until we can blow all the smoke out of the house with every door and window open.  this is not a comfortable 
  option when the weather is cold enough for us to want to operate the stove.

  we don't need a hurricane-force fan.
  the fan we're using pushes 350cuft/min. with its outflow pointed up the chimney, it will be enough to combat the down-draft
  while a fire in the firebox is operating at < 300C. when installed properly, the fan will drive air up the chimney and 
  a suction force will pull air up from the firebox, so any smoke in the firebox will be sucked up through the chimney 
  rather than being blown into the house.

  **automation**

  we're connecting the temperature sensor( a type-k thermocouple installed to probe the air in the flue just above the 
  firebox) to a microcontroller that will run the logic that operates the fan as a function of temperature.  there are 
  many options for microcontrollers.  we're big fans of python as a programming language, which many DIYers have had 
  great success with, using pyBoards.  However, pyBoards are pretty pricey for many reasons. for our consideration, 
  one could say that we would get what we pay for: python is awesome and would give us a great depth of functionality, 
  but we don't need that much depth for this implementation, so we should probably invest that awe$omene$$ where we 
  really need it: in some other project. maybe in the mill-house to automate the milling of a 16ft tree trunk.  
  raspberry pi is another option, and is cheaper than a pyBoard, but it's also overkill.  we don't need
  a full blown multithreaded operating system and all the hardware facilities that come with a complete PC for this 
  project. we're going to keep it simple: instead of a pyBoard or RPi, we'll be using an arduino. 

  there's plenty of info on the interwebs about arduinos. we won't rehash it here. we WILL talk about the controller-component 
  connections though: 

    - **thermocouple**
    
    this is a bimetal thermometer whose electrical resistance varies as a function of temperature.  there are many types of 
    thermocouples.  one of the most important dimensions in which they differ is the range of temperatures where they 
    provide the most useful information, ie.  the temperature range throughout which electrical resistance is easily 
    measured and varies enough that we have sufficiently granular resolution of temperature values.  we're using a type 
    K thermocouple that just happens to give us sufficient sensitivity and accuracy around the 300C mark. it's actually 
    good for temperatures down to -200C and up past 800C, so it's useful for probably some industrial purposes in 
    addition to our relatively low-range + small-temperature-interval purposes.  it's definitely good enough for us.

    - **thermocouple breakout board**

    breakout boards "break-out" a specific function and provide it to a general microcontroller such as our arduino.

    there are countless breakout boards for arduino.  the one we're using in this project is a MAX31855 for K-type 
    thermocouples.  the function it provides is serialized temperature readings.  ie. when it is powered up, it transmits
    temperature values at a regular interval from the thermocouple.

    - **arduino 2560, with WiFi** 
    
    this board is pretty handy: it has all the pinouts for connecting to the thermocouple breakout, the relay(s) to 
    control the fan motor and we'll be able to add a layer of monitoring to the system through a websocket we can 
    connect via WiFi. 

  the automation logic will be simple for now: 

  - UPWIND is OFF:
    - no automation, fan motor is OFF
  - UPWIND is ON: 
    - monitor temperature(T): 
      - if T < 320C ( will need to watch if this is the right threshold ): => fan motor ON
      - if T >= 320C => fan motor OFF
    - the LCD will display the following: 
      - current temperature (C)
      - current fan motor (ON/OFF)
      
## system operation: 

at any time there is any fire in the firebox, ie. from the moment a fire is started to the moment the fire is 
extinguished, UPWIND must be ON.  otherwise it should be turned off. 

## components: 

- hardware
  - fan motor
  - thermocouple
- lcd
- arduino 2560
- upwind web ( nextjs)
  - front end is reactjs, around which nextjs is built
  - backend is python: fastapi