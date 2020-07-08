import mongoose from 'mongoose';


//{"name":"MarcoTulio","subject":"Historia","type":"TrabalhoPratico","value":17.4,"lastModified":"2020-06-19T01:19:24.962Z"}
const schema = mongoose.Schema({
    name:{
            type: String
           ,required: true
           ,default:""
           /*,validate(value){
               
               if(value <1 ){
                   throw new Error("valor não permitido utilizae valores maiores que 0")
               }
           }*/
           } 

   ,subject:{
            type: String
           ,required: true
           ,default:""
           /*,validate(value){
               
               if(value <1 ){
                   throw new Error("valor não permitido utilizae valores maiores que 0")
               }
           }*/
           } 
   ,type:{
            type: String
           ,required: true
           ,default:""
           /*,validate(value){
               
               if(value <1 ){
                   throw new Error("valor não permitido utilizae valores maiores que 0")
               }
           }*/

           }
   ,value:{
            type: Number
           ,required: true
           ,default:0
           ,validate(value){
               
               if(value <0 ){
                   throw new Error("valor não permitido utilize valores maiores que 0")
               }
           }
           }
    ,lastModified:{
            type: Date
           ,required: true
           ,default:Date.now
           /*,validate(value){
               
               if(value <0 ){
                   throw new Error("valor não permitido utilize valores maiores que 0")
               }
           }*/
           }
   });

const modelSchema = mongoose.model('grade',schema)

export default modelSchema