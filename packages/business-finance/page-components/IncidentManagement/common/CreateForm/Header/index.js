import React from 'react';

import styles from './styles.module.css';

function Heading({ title = '' }) {
	return (
		<div className="heading_container">
			<h1 className={styles.title}>{title}</h1>
		</div>
	);
}

export default Heading;
