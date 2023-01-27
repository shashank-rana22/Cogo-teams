import React from 'react';

import styles from './styles.module.css';

interface itemTypes {
	remarks?: string;
}

interface propsType {
	item: itemTypes;
}
function RemarksContent({ item }: propsType) {
	return (
		<div>
			{item.remarks ? (
				<div className={styles.conatiner}>{item.remarks}</div>
			) : (
            	'No remarks'
			)}
		</div>
	);
}

export default RemarksContent;
