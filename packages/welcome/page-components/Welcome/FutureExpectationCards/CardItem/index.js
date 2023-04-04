import React from 'react';

import styles from './styles.module.css';

function CardItem({ data = {} }) {
	const { icon_url, heading, desc1, desc2 } = data;

	return (
		<div className={styles.container}>
			<div className={styles.upperpart}>
				<div className={styles.icon}><img src={icon_url} alt="icon" width={80} /></div>
			</div>
			<div className={styles.lowerpart}>
				<div className={styles.heading}>{heading}</div>
				<div className={styles.description}>{desc1}</div>
				<div className={styles.description}>{desc2}</div>
			</div>
		</div>
	);
}

export default CardItem;
