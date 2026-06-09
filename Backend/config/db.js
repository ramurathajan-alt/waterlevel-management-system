//import mongoose from "mongoose";

//export const connectDB = async () => {
   // await mongoose.connect('mongodb+srv://ramurathajan:%40ramu2002@cluster0.izrau.mongodb.net/ramurathajan').then(()=>console.log("DB Connected"));
//}
//import mongoose from "mongoose";

//export const  connectDB = async () =>{

 //   await mongoose.connect('mongodb+srv://ramurathajan:ramu2002@event.gs1cy.mongodb.net/mr-event').then(()=>console.log("DB Connected"));
   

//}
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://ramurathajan:ramu2002@event-shard-00-00.gs1cy.mongodb.net:27017,event-shard-00-01.gs1cy.mongodb.net:27017,event-shard-00-02.gs1cy.mongodb.net:27017/mr-event?ssl=true&replicaSet=atlas-6oceum-shard-0&authSource=admin&retryWrites=true&w=majority"
    );

    console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
};