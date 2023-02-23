import React from 'react';

import useListFaqQuestions from '../../hooks/useListFaqQuestion';
import Questions from '../Questions';

import styles from './styles.module.css';
// import useQuestionList from './useQuestionList';

function QuestionsList({ tabTitle }) {
	const {
		refetchQuestions = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqQuestions();

	console.log('questionlist:', data);
	return (
		<div>
			<h1 className={styles.title}>
				{tabTitle}
			</h1>
			<div style={{ margin: '5px 0', width: '100%', height: '462px' }} className={styles.scrollable}>
				{data?.list.map((question) => (
					<div className={styles.border}><Questions questions={question} /></div>
				))}

			</div>

		</div>
	);
}

export default QuestionsList;
