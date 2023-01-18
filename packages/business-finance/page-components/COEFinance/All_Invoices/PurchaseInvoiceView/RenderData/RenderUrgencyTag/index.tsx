import React from 'react';
import styled from './styles.module.css';


interface itemProps {
    urgencyTag:Array<string>
}
interface Props{
    item:itemProps;
}
function RenderUrgencyTag ({ item}:Props)  {
    console.log(item,'kkkkk');
    
    
	
	return (
		<div> 
          {item?.urgencyTag ?(
            <div className={styled.urgency}> {item?.urgencyTag[0]} </div>
          ):'-'}
	    </div>
	);
};

export default RenderUrgencyTag;
