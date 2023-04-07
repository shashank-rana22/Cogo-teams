import React from 'react';

import styles from './styles.module.css';

function CardItem({ data = {}, index = 0 }) {
	const { icon_url, heading, desc } = data;

	return (
		<div className={styles.container} style={{ marginLeft: index === 0 ? '' : '36px' }}>
			<div className={styles.upperpart}>
				<div className={styles.icon}><img src={icon_url} alt="icon" width={70} /></div>
			</div>
			<div className={styles.lowerpart}>
				<div className={styles.heading}>{heading}</div>
				<div className={styles.description}>{desc}</div>
			</div>
		</div>
	);
}

export default CardItem;
