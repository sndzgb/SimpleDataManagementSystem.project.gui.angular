export class BooleanHelpers {

    public static getBoolean(value: any){
        switch (value?.toLocaleLowerCase()) {
             case true:
             case "true":
             case 1:
             case "1":
             case "on":
             case "yes":
                 return true;
             default: 
                 return false;
         }
    }

}