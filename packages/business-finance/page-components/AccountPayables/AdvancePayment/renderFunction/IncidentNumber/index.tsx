import React from 'react';

import styles from './styles.module.css';

interface ItemProps {
	incidentRefNo:string,
}
interface PropsType {
	itemData:ItemProps,
}
function IncidentNumber({ itemData }:PropsType) {
	const { incidentRefNo = '' } = itemData || {};
	return (
		<div className={styles.text}>
			#
			{incidentRefNo}
		</div>
	);
}

export default IncidentNumber;
