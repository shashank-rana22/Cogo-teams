/* eslint-disable max-len */
import React from 'react';

import SeparationForm from './SeparationForm';
import styles from './styles.module.css';
import TrackApplication from './TrackApplication';

function ResignationProgress() {
	return (
		<div className={styles.main_container}>
			<TrackApplication />
			<SeparationForm />
		</div>
	);
}
export default ResignationProgress;
