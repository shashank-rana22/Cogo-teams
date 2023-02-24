import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyQuestionListState from '../../../../commons/EmptyQuestionListState';
import Spinner from '../../../../commons/Spinner';
import useListFaqQuestions from '../../hooks/useListFaqQuestion';
import Questions from '../Questions';

import styles from './styles.module.css';

function QuestionsList({ tabTitle, searchState = '', topicId = '' }) {
	const [searchquestion, setSearchquestion] = useState(searchState);

	const {
		refetchQuestions = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	// eslint-disable-next-line react-hooks/rules-of-hooks
	} = useListFaqQuestions({ topicId });

	if (loading) {
		return (
			<div className={styles.spinner}>
				<Spinner
					height={60}
					width={60}
					outerBorderColor="#FFF"
					spinBorderColor="#000"
					borderWidth="7px"
				/>
			</div>
		);
	}

	if (isEmpty(data?.list)) {
		return (
			<EmptyQuestionListState
				searchquestion={searchquestion}
				setSearchquestion={setSearchquestion}
				searchState={searchState}

			/>
		);
	}

	return (
		<div>
			<h1 className={styles.title}>
				{startCase(tabTitle)}
			</h1>
			<div style={{ margin: '5px 0', width: '100%', height: '462px' }} className={styles.scrollable}>

				{data?.list.map((question) => <div className={styles.border}><Questions questions={question} /></div>)}

			</div>
		</div>
	);
}

export default QuestionsList;
