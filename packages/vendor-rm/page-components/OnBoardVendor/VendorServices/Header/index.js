import React from 'react';

import styles from './styles.module.css';

function Header({
	activeStepper = {},
	onBack = () => {},
}) {
	const preveousFormStep = activeStepper.step - 2;

	return (
		<div className={styles.header}>
			<div className={styles.title}>
				Vendor Services
			</div>
		</div>
	);
}

export default Header;
