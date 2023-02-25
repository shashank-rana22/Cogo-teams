import React, { useState } from 'react';

import QuestionsCollapse from '../QuestionCollapse';

import Answer from './Answer';
import styles from './styles.module.css';

function Questions({ questions = {} }) {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!open);
	};

	return (
		<div className={styles.contentshow}>
			<div role="presentation" onClick={toggle} className={styles.cursor}>
				<QuestionsCollapse collapse={open} questions={questions} />
			</div>

			{open && (
				<div className={styles.transition}><Answer questions={questions} /></div>
			)}
		</div>
	);
}

export default Questions;
