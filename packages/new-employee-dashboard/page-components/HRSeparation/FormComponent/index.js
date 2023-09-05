import React from 'react';

import HRMeeting from './HRMeeting';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	hrbp: {
		hr_meeting: HRMeeting,
	},
};

function FormComponent() {
	const Render = COMPONENT_MAPPING.hrbp.hr_meeting;

	return (
		<div className={styles.container}>
			<Render />
		</div>
	);
}

export default FormComponent;
