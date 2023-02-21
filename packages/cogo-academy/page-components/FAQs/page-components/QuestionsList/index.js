import React from 'react';

import Questions from '../Questions';

import styles from './styles.module.css';

function QuestionsList(Tab) {
	return (
		<div>
			<h1 className={styles.title}>{Tab.Tabtitle}</h1>
			<br />
			<div className={styles.border}><Questions /></div>

		</div>
	);
}

export default QuestionsList;
