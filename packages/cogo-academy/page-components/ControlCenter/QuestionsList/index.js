import { Toggle } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import Analytics from '../Analytics';

import AddedQuestions from './AddedQuestions';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionsList() {
	const [showAnalytics, setShowAnalytics] = useState(false);

	const props = useQuestionList();

	const { activeList = '', setPage = () => {} } = props;

	useEffect(() => {
		setPage(1);
	}, [activeList, setPage]);

	return (
		<div className={styles.container}>

			<Toggle
				name="toggle"
				size="md"
				value={showAnalytics}
				onChange={() => setShowAnalytics(!showAnalytics)}
				disabled={false}
				offLabel="Added Questions"
				onLabel="Analytics"
			/>

			{showAnalytics ? (<Analytics />) : (
				<AddedQuestions
					{...props}
				/>
			)}

		</div>
	);
}

export default QuestionsList;
