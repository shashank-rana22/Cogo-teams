import { FunctionObjects,FieldType, GenericObject } from "../Interfaces/index";
import React from "react";

const commonFunctions = ( functions :{functions?:FunctionObjects}) => {
	
	const newFunctions:any = {
		renderTag:(itemData:GenericObject, field:FieldType)=>(<div>tag</div>),
		...(functions || {}),
		
};

return newFunctions;
}

export default commonFunctions;