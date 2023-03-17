import React from 'react';

import AllQuestions from './AllAudience';
import styles from './styles.module.css';

function AudienceList(props) {
	return (
		<div className={styles.container}>
			<AllQuestions {...props} />
		</div>
	);
}

export default AudienceList;
