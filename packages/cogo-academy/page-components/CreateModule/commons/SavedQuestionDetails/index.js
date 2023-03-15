import { Tooltip, Button, Table, Pagination } from '@cogoport/components';
import { IcMOverflowDot, IcMDelete, IcMEyeopen, IcMEdit } from '@cogoport/icons-react';
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

function SavedQuestionDetails({ savedQuestionDetails, test_questions }) {
	console.log('test_questions', test_questions);
	const columns = [
		{
			Header   : 'Topic',
			id       : 'a',
			accessor : ({ topic }) => <section>{topic}</section>,
		},
		{
			Header   : 'Question Type',
			id       : 'c',
			accessor : ({ question_type }) => (
				<section>
					{question_type === 'case_study' ? 'Case Study' : 'Stand Alone'}
				</section>
			),
		},
		{
			Header   : 'Question/Case',
			id       : 'd',
			accessor : ({ question_text }) => <section>{question_text}</section>,
		},
		{
			Header   : 'Answer Type',
			id       : 'ss',
			accessor : ({ question_type }) => <section>{startCase(question_type)}</section>,
		},
		{
			Header   : 'Answer Key',
			id       : 'e',
			accessor : ({ answers }) => <section>{getCorrectAnswers({ answers })}</section>,
		},
		{
			Header   : 'Difficulty Level',
			id       : 'ik',
			accessor : ({ difficulty_level = 'High' }) => <section>{difficulty_level}</section>,
		},
		{
			Header   : '',
			id       : 'options',
			accessor : () => (
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
									<Button themeType="secondary" className={styles.btn}>
										<IcMEdit />
										<div style={{ marginLeft: '8px' }}>Edit</div>
									</Button>
									<Button themeType="secondary" className={styles.btn}>
										<IcMEyeopen />
										<div style={{ marginLeft: '8px' }}>View</div>
									</Button>
									<Button
										themeType="secondary"
										className={styles.btn}
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

	console.log('savedQuestionDetails', test_questions);

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.table_container}
				data={test_questions}
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
