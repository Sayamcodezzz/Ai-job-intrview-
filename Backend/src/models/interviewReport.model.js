const mongoose= require("mongoose")


/**
 * - job description : String ,  
 * - resume text : String ,
 * - self description : String,
 * - 
 *  -  matchScore :Number 
 * - technical questions :
 *     [{
 *       question:" " , 
 *        intention: "" ,
 *        answer :" " ,   
 *    }]
 * - Behavioural question :[{
 *         
 *          question:" " , 
 *        intention: "" ,
 *        answer :" " ,   
 * 
 *     }] 
 * - Skill gaps :[{
 *    skill:" ",
 *    severity: " ",
 *     type : " ",
 *    enum:["low","medium ", "high"],
 *   
 * }]
 * - preparation plan[{
 *    day : Number ,
 *    focus : String ,
 *    task : [String ]
 * 
 * }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
     type:String,
     required:[true,"Question is required"]
    },
    intention:{
    type :String ,
     required : [true , "Intention is required "]
    }, 
    answer:{
      type:String,
      required:[true, "Answer is required "],
    }

},{
   _id:false
});

const behaviourialQuestionSchema = new mongoose.Schema({
     question:{
     type:String,
     required:[true,"Question is required"]
    },
    intention:{
    type :String ,
     required : [true , "Intention is required "]
    }, 
    answer:{
      type:String,
      required:[true, "Answer is required "],
    }
},{
    _id:false,
});

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String ,
        required:[true, "Skill is required "],
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity is required "],

    }
},{
 _id:false,
});

const preparationPlanSchema= new mongoose.Schema({
    day:{
        type:String,
        required:[true,"Day is required"],
    },
    focus:{
        type:String ,
        required:[true,"Focus is required "]
    },
    task:[
        {
            type:String,
            required:[true,"Task is required"]
        }
    ]
})

const  interviewReportSchema  = new mongoose.Schema({

     jobDescription: {
        type : String,
        required: [true , "Job description is required "],
     }, 
     resumeText :{
        type:String ,
        required:[true,"Resume text is required "]
     } , 
     selfDescription:{
        type: String ,
        required:[true, "Self description is required"],
     },
     matchScore :{
        type:Number,
        min:0,
        max:100,
     
     },
     technicalQuestions:[technicalQuestionSchema],
     behaviouralQuestion:[behaviourialQuestionSchema],
     skillGap:[skillGapSchema],
     preparationPlan:[preparationPlanSchema],

 
},{
    timestamps:true,
})

const interviewReportModel = mongoose.model("InterviewReport ",interviewReportSchema);
module.exports= interviewReportModel
