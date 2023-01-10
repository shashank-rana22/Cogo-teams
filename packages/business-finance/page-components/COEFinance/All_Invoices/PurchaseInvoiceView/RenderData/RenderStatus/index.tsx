import React from 'react';
import { startCase } from '@cogoport/utils';
import styled from './styles.module.css';


interface itemProps {
	status:string
}
interface Props{
    item:itemProps;
}
function RenderStatus ({ item}:Props)  {
	const StatusItem = (item?.status).toLowerCase();
	
	return (
		<div className={styled.container}> 
		
			<div className={styled[item?.status]}>
				{startCase(StatusItem)}
			</div>		
			{/* <div className={styled.Ribbons}>
				<div className={styled.ribbon}>Urgent</div>
			</div> */}
			
		
	    </div>
	);
};

export default RenderStatus;
