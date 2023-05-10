import React, { useState } from 'react';

import styles from './styles.module.css';

function RadioToggle({
	onLabel,
	value1,
	value2,
	offLabel,
	value = '',
}) {
	const [isActive, setIsActive] = useState(value);

	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div
					key={value1}
					onClick={() => {
						setIsActive(value1);
					}}
					role="presentation"
				>
					{' '}
					<div
						className={`${styles.container_click} 
								${value1 === isActive ? styles.sub_container_click : styles.sub_container}`}
					>
						{onLabel}
					</div>
				</div>
				<div
					key={value2}
					onClick={() => {
						setIsActive(value2);
					}}
					role="presentation"
				>
					{' '}
					<div
						className={`${styles.container_click} 
								${value2 === isActive ? styles.sub_container_click : styles.sub_container}`}
					>
						{offLabel}
					</div>
				</div>
			</div>
		</div>
	);
}

export default RadioToggle;
