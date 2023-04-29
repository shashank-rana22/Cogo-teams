import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	jobNumber:string,
	sid:string,
	serviceType:string,
}
interface PropsType {
	itemData:ItemProps,
}

function SIDnumber({ itemData }:PropsType) {
	const { jobNumber, sid, serviceType } = itemData || {};
	return (
		<div>
			<div className={styles.text}>
				#
				{jobNumber || sid}
			</div>
			<div>{startCase(serviceType)}</div>
		</div>
	);
}

export default SIDnumber;
