import React from 'react';

import styles from './styles.module.css';

function ShowEmails({ emailsData = [] }) {
	// const toBeShownEmails = emailsData
	return (
		<div className={styles.name_div}>
			{emailsData.join(', ')}
		</div>
	);
}

export default ShowEmails;
