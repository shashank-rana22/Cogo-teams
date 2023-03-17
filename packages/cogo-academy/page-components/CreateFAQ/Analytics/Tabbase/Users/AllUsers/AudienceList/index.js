import React from 'react';

import useListFaqQuestions from '../../../../../../FAQs/hooks/useListFaqQuestion';

import AllQuestions from './AllQuestions';
import styles from './styles.module.css';

function AudienceList() {
	const props = useListFaqQuestions({});
	return (
		<div className={styles.container}>
			<AllQuestions {...props} />
		</div>
	);
}

export default AudienceList;
