import React from 'react';
import styled from './styles.module.css';


interface itemProps {
    urgencyTag:Array<string>
}
interface Props{
    item:itemProps;
}
function RenderRibbon ({ item}:Props)  {
    
	
	return (
		<div> 
          {item?.urgencyTag ?(
            <div className={styled.ribbon}>Urgent</div>
          ):''}
	    </div>
	);
};

export default RenderRibbon;
