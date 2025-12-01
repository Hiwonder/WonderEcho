/*
 wonderecho package
*/
//% weight=10 icon="\uf025" color=#ff7f00
namespace wonderecho {
    let ASR_I2C_ADDR = 0x34
    let ASR_RESULT_ADDR = 0x64
    let ASR_SPEAK_ADDR = 0x6e
    let ASR_CMDMAND = 0x00
    let ASR_ANNOUNCER = 0xff

    export enum WORD_RESULT {
        //% block="Going straight"
        GO_STRAIGHT = 0x01,
        //% block="Going backward"
        GO_BACKWARD,
        //% block="Turning left"
        TURN_LEFT,
        //% block="Turning right"
        TURN_RIGHT,
        //% block="Lean forward"
        LEAN_FORWARD,
        //% block="Lean back"
        LEAN_BACK,
        //% block="Lean left"
        LEAN_LEFT,
        //% block="Lean right"
        LEAN_RIGHT,
        //% block="Stop"
        STOP,
        //% block="Attention"
        ATTENTION,
        //% block="Get down"
        GET_DOWN,
        //% block="Sit down"
        SIT_DOWN,
        //% block="Speed up"
        SPEED_UP,
        //% block="Slow down"
        SLOW_DOWN,
        //% block="Raise"
        EXECUTE_ACTION_ONE,
        //% block="Lower
        EXECUTE_ACTION_TWO,
        //% block="Barks once"
        EXECUTE_ACTION_THREE,
        //% block="Turn on the light"
        TURN_ON_THE_LIGHT,
        //% block="Turn off the light"
        TURN_OFF_THE_LIGHT,
        //% block="Open the door"
        OPEN_THE_DOOR,
        //% block="Close the door"
        CLOSE_THE_DOOR,
        //% block="Turn on the water pump"
        TURN_ON_THE_WATER_PUMP,
        //% block="Turn off the water pump"
        TURN_OFF_THE_WATER_PUMP,
        //% block="Unfold the airing rack"
        UNFOLD_THE_AIRING_RACK,
        //% block="Fold the aring rack"
        FOLD_THE_ARING_RACK,
        //% block="Hello"
        HELLO,
        //% block="Introduce yourself"
        INTRODUCE_YOURSELF,
        //% block="Show a skill"
        SHOW_A_SKIII,
        //% block="March"
        MARCH,
        //% block="Shake head"
        SHAKE_HEAD,
        //% block="Dive forward"
        DIVE_FORWARD,
        //% block="Dive backward"
        DIVE_BACKWARD,
        //% block="Combat mode"
        COMBAT_MODE,
        //% block="Squat down"
        SQUAT_DOWN,
        //% block="Shake it off"
        SHAKE_IT_OFF
    }

    export enum WORD_SPEAK_PLAY {
        //% block="Recyclable waste"
        RECYCLABLE_WASTE = 0x01,
        //% block="Kitchen waster"
        KITCHEN_WASTE,
        //% block="Hazardous Waste"
        HAZARDOUS_WASTE,
        //% block="Other waster"
        OTHER_WASTE,
        //% block="Abstacle ahead"
        ABSTACLE_AHEAD,
        //% block="Parking completed"
        PARKING,
        //% block="Restart departure"
        RESTART_DEPARTURE,
        //% block="Left turn detected"
        DETECT_LEFT_TURN,
        //% block="Right turn detected"
        DETECT_RIGHT_TURN,
        //% block="Parking detected"
        DETECT_PARKING,
        //% block="Red light detected"
        DETECT_RED_LIGHT,
        //% block="Green light detected"
        DETECT_GREEN_LIGHT,
        //% block="U-turn detected"
        DETECT_U_TURN,
        //% block="Turn detected"
        DETECT_TURN,
        //% block="Hello welcome"
        WELCOME_YOU
    }

    export enum WORD_CMD_PLAY {
        //% block="Going straight"
        GO_STRAIGHT = 0x01,
        //% block="Going backward"
        GO_BACKWARD,
        //% block="Turning left"
        TURN_LEFT,
        //% block="Turning right"
        TURN_RIGHT,
        //% block="Lean forward"
        LEAN_FORWARD,
        //% block="Lean back"
        LEAN_BACK,
        //% block="Lean left"
        LEAN_LEFT,
        //% block="Lean right"
        LEAN_RIGHT,
        //% block="Copy that"
        COPY_THAT,
        //% block="Turn on the light"
        TURN_ON_THE_LIGHT = 0x12,
        //% block="Turn off the light"
        TURN_OFF_THE_LIGHT,
        //% block="The door is open"
        OPEN_THE_DOOR,
        //% block="The door is closed "
        CLOSE_THE_DOOR,
        //% block="Turn on the water pump"
        TURN_ON_THE_WATER_PUMP,
        //% block="Turn off the water pump"
        TURN_OFF_THE_WATER_PUMP,
        //% block="Unfold the airing rack"
        UNFOLD_THE_AIRING_RACK,
        //% block="Fold the airing rack"
        FOLD_THE_ARING_RACK,
        //% block="Hi"
        HELLO,
        //% block="Hello, i'm Hiwonder, and i can talk and dance."
        INTRODUCE_YOURSELF
    }

    export enum VOICE_TYPE {
        //% block="Speak"
        SPEAK_TYPE = 0xff,
        //% block="Command"
        CMD_TYPE = 0x00
    }

    function asr_i2Cwrite(cmd: number, id: number): number {
        let buf = pins.createBuffer(3);
        buf[0] = ASR_SPEAK_ADDR
        buf[1] = cmd;
        buf[2] = id;
        let rvalue = pins.i2cWriteBuffer(ASR_I2C_ADDR, buf);
        return rvalue;
    }

    function asr_i2Cread(): number {
        pins.i2cWriteNumber(ASR_I2C_ADDR, ASR_RESULT_ADDR, NumberFormat.UInt8BE)
        let val = pins.i2cReadNumber(ASR_I2C_ADDR, NumberFormat.UInt8BE);
        return val;
    }
    /**
     * Read WonderEcho recognize result
    */
    //% weight=100 blockId=readASRResult block="Read WonderEcho recognize result is %value"
    export function readASRResult(value: WORD_RESULT): Boolean {
        let result = asr_i2Cread()
        return (result == value)
    }

    /**
    * Read WonderEcho recognize result world ID
    */
    //% weight=98 blockGap=50 blockId=readASRResultID block="Read WonderEcho recognize result world ID"
    export function readASRResultID() {
        return asr_i2Cread()
    }

    /**
    * WonderEcho play world
    */
    //% weight=96 blockId=playASRCmdWorld block="Play WonderEcho command world ID %value"
    export function playASRCmdWorld(value: WORD_CMD_PLAY) {
        asr_i2Cwrite(ASR_CMDMAND, value)
    }

    /**
    * WonderEcho play world
    */
    //% weight=94 blockId=playASRSpeakWorld block="Play WonderEcho speak world ID %value"
    export function playASRSpeakWorld(value: WORD_SPEAK_PLAY) {
        asr_i2Cwrite(ASR_ANNOUNCER, value)
    }
    
    /**
    * WonderEcho play world ID
    * @param value eg: 1
    */
    //% weight=92 blockId=playASRWorldID block="Play WonderEcho world |type %vtype| ID %value"
    export function playASRWorldID(vtype: VOICE_TYPE, value: number) {
        asr_i2Cwrite(vtype, value)
    }
}
