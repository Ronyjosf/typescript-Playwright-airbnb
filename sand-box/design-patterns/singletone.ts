class SingleTone {
    private static instance: SingleTone = null;

    private constructor() { // private, thus can't be accessed
    }
    public static getInstance(){ // access only via public
        if (!SingleTone.instance){
            SingleTone.instance = new SingleTone();
        }
        return SingleTone.instance;
    }
}

// usage;
let instance1 = SingleTone.getInstance();
let instance2 = SingleTone.getInstance();

console.log("instances are equal ?", instance1 === instance1); // '===' is a reference equality. true only if the pointer is the same.
                                                        // here you get 'true'. also let myInstance = instance1. myInstance === instance1 is true.