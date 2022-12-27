import { FunctionObjects,FieldType } from "../Interfaces";
import React from "react";

const commonFunctions = ( functions :{functions?:FunctionObjects}) => {
	
	const newFunctions:any = {
		renderTag:(itemData:object, field:FieldType)=>(<div>tag</div>),
		...(functions || {}),
		
};
return newFunctions;
}

export default commonFunctions;