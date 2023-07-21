import React from 'react';

import styles from './styles.module.css';

function ToolTipContent({ documents = [] }) {
	return (
		<div className={styles.container}>
			{documents.map((doc) => (
				<div className={styles.pills} key={doc?.id}>
					{doc?.name}
				</div>
			))}
		</div>
	);
}

export default ToolTipContent;
