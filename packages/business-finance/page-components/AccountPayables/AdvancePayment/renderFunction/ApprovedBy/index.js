import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

interface NameType {
	name:string,
}
interface Props {
	approvedAt:Date,
	approvedBy:NameType,
}
interface PropsType {
	itemData:Props,
}

function ApprovedBy({ itemData }:PropsType) {
	const { approvedAt, approvedBy } = itemData || {};
	const { name } = approvedBy || {};
	return (
		<div className={styles.count}>
			{name}
			<div className={styles.date}>
				On
				{' '}
				{format(approvedAt, 'hh:mm a, dd MMM yyyy', {}, false)}
			</div>
		</div>
	);
}

export default ApprovedBy;
