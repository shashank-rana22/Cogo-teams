import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import AddedQuestions from './AddedQuestions';
import NewRequests from './NewRequests';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionsList() {
	const {
		questionList, setQuestionList, searchInput,
		setSearchInput,
	} = useQuestionList();

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={questionList}
				themeType="primary"
				fullWidth
				onChange={setQuestionList}
			>
				<TabPanel name="added_questions" title="Added Questions" badge={113}>
					<AddedQuestions
						searchInput={searchInput}
						setSearchInput={setSearchInput}
					/>
				</TabPanel>

				<TabPanel name="new_requests" title="New Requests" badge={15}>
					<NewRequests />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default QuestionsList;
