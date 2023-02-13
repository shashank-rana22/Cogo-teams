import React from 'react';

import styles from './styles.module.css';

function CompanyName({ itemdata }) {
	const { data } = itemdata || {};
	const { organization } = data || {};
	const { businessName } = organization || {};
	return (
		<div className={styles.container}>
			{businessName}
		</div>
	);
}

export default CompanyName;
