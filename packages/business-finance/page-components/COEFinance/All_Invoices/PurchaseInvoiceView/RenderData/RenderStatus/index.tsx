import { startCase } from '@cogoport/utils';
import React from 'react';

import styled from './styles.module.css';

interface ItemProps {
	status:string
}
interface Props {
	item:ItemProps;
}
function RenderStatus({ item }:Props) {
	const StatusItem = (item?.status)?.toLowerCase();

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
}

export default RenderStatus;
