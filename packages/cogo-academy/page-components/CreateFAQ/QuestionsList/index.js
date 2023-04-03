import React, { useEffect, useState } from 'react';

import AddedQuestions from './AddedQuestions';
import styles from './styles.module.css';
import useQuestionList from './useQuestionList';

function QuestionsList() {
	const [PopoverVisible, setPopoverVisible] = useState(true);
	const props = useQuestionList({ PopoverVisible, setPopoverVisible });
	

	const { activeList = '', setPage = () => {} } = props;

	useEffect(() => {
		setPage(1);
	}, [activeList, setPage]);

	return (
		<div className={styles.container}>
			<AddedQuestions
				{...props}
			/>
		</div>
	);
}

export default QuestionsList;
