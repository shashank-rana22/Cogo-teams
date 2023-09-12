import React from 'react';

import styles from './styles.module.css';

function StepsComponent({ stepsList = [] }) {
	return (
		<div
			className={styles.styled_steps}

		>
			{stepsList.map((stepDetails) => (
				<div
					key={stepDetails.id}
					className={styles.styled_step}
				/>
			))}
		</div>
	);
}

export default StepsComponent;
