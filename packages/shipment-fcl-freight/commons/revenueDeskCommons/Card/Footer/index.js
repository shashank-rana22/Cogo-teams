import React from 'react';

import infoOptions from './infoOptions';
import styles from './styles.module.css';

function Footer({ data = {} }) {
	const infoArray = infoOptions(data);

	return (
		<div className={styles.container}>
			<div className={styles.subContainer}>
				{infoArray.map((item) => (item.value ? (
					<div className={styles.row}>
						<p className={styles.key}>
							{item.key}
							:
						</p>
						<p className={styles.value}>{item.value}</p>
					</div>
				) : null))}
			</div>
		</div>
	);
}

export default Footer;
