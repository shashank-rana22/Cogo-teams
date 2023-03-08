import { isEmpty } from '@cogoport/utils';

import QuestionsItem from '../../../../common/QuestionsItem';

import styles from './styles.module.css';

function Questions({
	questions = [],
	questionActionList = [],
	setQuestionActionList = () => {},
	questionStatus = '',
}) {
	const totalQuestions = (questions || []).length;

	return (
		<div className={styles.list_container}>
			{(questions || []).map((question, index) => {
				const { id = '' } = question || {};
				const isChecked = !isEmpty(questionActionList.checked?.find((que) => que.id === id));

				return (
					<QuestionsItem
						item={question}
						index={index}
						feedbackQuestionId={id}
						setQuestionActionList={setQuestionActionList}
						isChecked={isChecked}
						questionStatus={questionStatus}
						totalCount={totalQuestions}
						key={id}
					/>
				);
			})}

		</div>
	);
}

export default Questions;
