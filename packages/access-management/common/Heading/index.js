import React from 'react';

import styles from './styles.module.css';

function Heading({ title = '', subTitle = '' }) {
	return (
		<div className="heading-container">
			<h1 className={styles.title}>{title}</h1>
			<span className={styles.subtitle}>{subTitle}</span>
		</div>
	);
}

export default Heading;
