import { Tooltip } from "@cogoport/components";

const showOverflowingNumber=(value: number|string= '', maxLength:number)=>{
    const newValue=String(value) || '';
    
     if(String(newValue).length>maxLength){
         return <Tooltip content={newValue}>
             <div>{(newValue as string).substring(0, maxLength)}...</div>
         </Tooltip>
     }else{
         return <div>{newValue}</div>
     }
}

export default showOverflowingNumber;