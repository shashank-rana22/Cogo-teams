import React from 'react';
import { GenericObject } from '../../../../../commons/Interfaces/index';
import { startCase } from '@cogoport/utils';
import styled from './styles.module.css';

interface props{
	item:GenericObject
}

function RenderStatus ({ item}:props)  {
	const StatusItem = (item?.status)?.toLowerCase();
	
	return (
		<div>
			<div className={styled[item?.status]}>
				{/* {startCase(StatusItem)} */}
				{
					item?.status
				}
			</div>
		</div>
	);
};

export default RenderStatus;




	

