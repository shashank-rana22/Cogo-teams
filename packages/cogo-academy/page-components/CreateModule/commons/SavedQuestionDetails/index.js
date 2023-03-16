import { Tooltip, Button, Table, Pagination } from '@cogoport/components';
import { IcMOverflowDot, IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const alphabetMapping = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const getCorrectAnswersCombined = ({ answers = [] }) => (answers || []).map((item) => {
	if (item.is_correct) {
		return `${alphabetMapping[item.sequence_number]}) ${item.answer_text}`;
	}

	return null;
});

const getCorrectAnswers = ({ answers }) => {
	const correctAnswers = getCorrectAnswersCombined({ answers });

	return correctAnswers.join(', ');
};

function SavedQuestionDetails({
	savedQuestionDetails,
	test_questions,
	setEditDetails,
	editDetails,
	allKeysSaved,
	setAllKeysSaved,
}) {
	const handleEditQuestion = ({ item }) => {
		setAllKeysSaved(false);
		setEditDetails(item);
	};

	const columns = [
		{
			Header   : 'Topic',
			id       : 'topic',
			accessor : ({ topic }) => <section>{topic}</section>,
		},
		{
			Header   : 'Question Type',
			id       : 'question_type',
			accessor : ({ question_type }) => (
				<section>
					{question_type === 'case_study' ? 'Case Study' : 'Stand Alone'}
				</section>
			),
		},
		{
			Header   : 'Question/Case',
			id       : 'question_text',
			accessor : ({ question_text }) => <section>{question_text}</section>,
		},
		{
			Header   : 'Answer Type',
			id       : 'answer_type',
			accessor : ({ question_type }) => <section>{startCase(question_type)}</section>,
		},
		{
			Header   : 'Answer Key',
			id       : 'answer_key',
			accessor : ({ answers }) => <section>{getCorrectAnswers({ answers })}</section>,
		},
		{
			Header   : 'Difficulty Level',
			id       : 'difficulty_level',
			accessor : ({ difficulty_level = 'High' }) => <section>{difficulty_level}</section>,
		},
		{
			Header   : '',
			id       : 'options',
			accessor : (item) => (
				<section>
					<div
						style={{
							width  : 'fit-content',
							cursor : 'default',
						}}
					>
						<Tooltip
							className={styles.tooltip_pad}
							content={(
								<div className={styles.options}>
									<Button
										type="button"
										onClick={() => handleEditQuestion({ item })}
										themeType="secondary"
										disabled={!allKeysSaved}
										className={styles.btn}
									>
										<IcMEdit />
										<div style={{ marginLeft: '8px' }}>Edit</div>
									</Button>

									<Button
										themeType="secondary"
										className={styles.btn}
										disabled={!allKeysSaved}
									>
										<IcMDelete />
										<div style={{ marginLeft: '8px' }}>Delete</div>
									</Button>
								</div>
							)}
							trigger="click"
							placement="left"
							interactive="true"
						>
							<IcMOverflowDot style={{ cursor: 'pointer' }} />
						</Tooltip>
					</div>
				</section>
			),
		},
	];

	console.log('editDetails', editDetails);

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.table_container}
				data={test_questions.filter((item) => item.id !== editDetails?.id)}
				columns={columns}
			/>

			{savedQuestionDetails.length > 10 ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						// currentPage={page}
						// totalItems={total_count}
						// pageSize={pageLimit}
						// onPageChange={(val) => setParams({ page: val })}
					/>
				</div>
			) : null}

		</div>
	);
}

export default SavedQuestionDetails;
