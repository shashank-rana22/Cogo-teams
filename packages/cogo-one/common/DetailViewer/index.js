import React from 'react';

import styles from './styles.module.css';

function DetailViewer({ formComponent, listComponent, AddNote }) {
	return (
		<div
			className={styles.animated_container}
		>
			<input
				hidden
				key={AddNote}
				type="checkbox"
				className={styles.checkboxform}
				{...(!AddNote ? { checked: true } : {})}
			/>
			<div className={styles.form_container}>
				{formComponent()}
			</div>
			{listComponent()}
		</div>
	);
}

export default DetailViewer;
