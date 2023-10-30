import { startCase } from '@cogoport/utils';
import React from 'react';

import styled from './styles.module.css';

function RenderStatus({ item }) {
	const StatusItem = (item?.status)?.toLowerCase();

	return (
		<div className={styled.container}>
			<div className={styled[item?.status]}>
				{startCase(StatusItem)}
			</div>
		</div>
	);
}

export default RenderStatus;
