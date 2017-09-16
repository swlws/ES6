// import {readFile} from 'fs';
import { stat, exists, readFile } from 'fs';

readFile("./demo_16_module.js",(err,data)=>{
	if(err){
		console.log(err)
	}else{
		console.log(data.toString())
	}
})

