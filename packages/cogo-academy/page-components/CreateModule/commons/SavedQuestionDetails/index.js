import { Tooltip, Button, Table, Pagination } from '@cogoport/components';
import { IcMOverflowDot, IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
// import { useState } from 'react';

import useUpdateCaseStudy from '../../hooks/useUpdateCaseStudy';
import useUpdateStandAloneTestQuestion from '../../hooks/useUpdateStandAloneTestQuestion';

import styles from './styles.module.css';

const alphabetMapping = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const getCorrectAnswersCombined = ({ correctOptions = [] }) => (correctOptions || []).map(
	(item) => `${alphabetMapping[item.sequence_number]}) ${item.answer_text}`,
);
const getCorrectAnswers = ({ answers = [] }) => {
	const correctOptions = (answers || []).filter((item) => item.is_correct);
	const correctAnswers = getCorrectAnswersCombined({ correctOptions });

	return correctAnswers.join(', ');
};

function SavedQuestionDetails({
	savedQuestionDetails,
	test_questions,
	setEditDetails,
	editDetails,
	allKeysSaved,
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
}) {
	// const [caseToShow, setCaseToShow] = useState('');

	const { updateStandAloneTestQuestion, loading } = useUpdateStandAloneTestQuestion();

	const {
		loading: caseStudyLoading,
		updateCaseStudy,
	} = useUpdateCaseStudy();

	const handleEditQuestion = ({ item }) => {
		setAllKeysSaved(false);
		setEditDetails(item);
	};

	const handleDeleteQuestion = ({ item }) => {
		const { question_type, id } = item || {};

		if (question_type !== 'case_study') {
			updateStandAloneTestQuestion({
				testQuestionId : id,
				action         : 'delete',
				getTestQuestionTest,
				questionSetId,
				setEditDetails,
				setAllKeysSaved,
			});
		} else {
			updateCaseStudy({
				id,
				action: 'delete',
				getTestQuestionTest,
				questionSetId,
				setEditDetails,
				setAllKeysSaved,
			});
		}
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
			accessor : (item) => <section>{item?.question_text}</section>,
		},
		{
			Header   : 'Answer Type',
			id       : 'answer_type',
			accessor : ({ question_type }) => <section>{startCase(question_type)}</section>,
		},
		{
			Header   : 'Answer Key',
			id       : 'answer_key',
			accessor : ({ answers = [] }) => (
				<Tooltip content={(
					<div className={styles.flex_column}>
						{(getCorrectAnswersCombined({
							correctOptions: (answers || []).filter((item) => item.is_correct),
						} || [])).map((item) => <div className={styles.answer}>{item}</div>)}
					</div>
				)}
				>
					<div className={styles.answer_key}>
						{getCorrectAnswers({ answers })}
					</div>
				</Tooltip>
			),
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
										loading={loading || caseStudyLoading}
									>
										<IcMEdit />
										<div style={{ marginLeft: '8px' }}>Edit</div>
									</Button>

									<Button
										type="button"
										themeType="secondary"
										className={styles.btn}
										disabled={!allKeysSaved}
										loading={loading || caseStudyLoading}
									>
										<IcMDelete />
										<div
											role="presentation"
											onClick={() => handleDeleteQuestion({ item })}
											style={{ marginLeft: '8px' }}
										>
											Delete
										</div>
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
