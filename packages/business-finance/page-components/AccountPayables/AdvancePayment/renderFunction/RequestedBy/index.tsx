import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

interface ByProps {
	name:string
}
interface Props {
	requestedAt:Date,
	requestedBy:ByProps,
}
interface PropsType {
	itemData:Props,
}

function RequestedBy({ itemData }:PropsType) {
	const { requestedAt, requestedBy } = itemData || {};
	const { name } = requestedBy || {};
	return (
		<div className={styles.count}>
			{name}
			<div className={styles.date}>
				On
				{' '}
				{format(requestedAt, 'hh:mm a, dd MMM yyyy')}
			</div>
		</div>
	);
}

export default RequestedBy;
