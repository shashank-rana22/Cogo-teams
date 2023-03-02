import React from 'react';

import styles from './styles.module.css';

interface ItemTypes {
	remarks?: string;
}

interface PropsType {
	item: ItemTypes;
}
function RemarksContent({ item }: PropsType) {
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
