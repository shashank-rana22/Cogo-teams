import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getCorrectAnswers from '../../utils/getCorrectAnswers';
import getCorrectAnswersCombined from '../../utils/getCorrectAnswersCombined';
import ButtonsComponent from '../ButtonsComponent';
import CaseAnswerKey from '../CaseAnswerKey';
import CaseAnswerType from '../CaseAnswerType';
import CaseQuestion from '../CaseQuestion';

import styles from './styles.module.css';

const useGetTableColumns = ({
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	setEditDetails,
	allKeysSaved,
	mode,
}) => {
	const [caseToShow, setCaseToShow] = useState('');

	return [
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
			accessor : (item) => (
				<Tooltip
					interactive
					content={item?.question_type !== 'case_study'
						? item?.question_text
						: <CaseQuestion item={item} from="tooltip" caseToShow={caseToShow} />}
				>
					<div
						role="presentation"
						className={styles.question_div}
						onClick={() => setCaseToShow(item.id === caseToShow ? '' : item.id)}
					>
						{item?.question_type !== 'case_study'
							? item?.question_text
							: <CaseQuestion item={item} from="normal" caseToShow={caseToShow} />}
					</div>
				</Tooltip>
			),
		},
		{
			Header   : 'Answer Type',
			id       : 'answer_type',
			accessor : (item) => (
				<section>
					{item?.question_type !== 'case_study'
						? startCase(item?.question_type)
						: <CaseAnswerType item={item} caseToShow={caseToShow} />}
				</section>
			),
		},
		{
			Header   : 'Answer Key',
			id       : 'answer_key',
			accessor : (item) => (
				<section>
					{item?.question_type !== 'case_study' ? (
						<Tooltip
							content={(
								<div className={styles.flex_column}>
									{getCorrectAnswersCombined(
										{
											correctOptions: (item?.test_question_answers || []).filter(
												(item1) => item1.is_correct,
											),
										} || [],
									).map((item1) => (
										<div className={styles.answer}>{item1}</div>
									))}
								</div>
							)}
						>
							<div className={styles.answer_key}>
								{getCorrectAnswers({ answers: item?.test_question_answers })}
							</div>
						</Tooltip>
					) : (
						<CaseAnswerKey item={item} caseToShow={caseToShow} />
					)}
				</section>
			),
		},
		{
			Header   : 'Difficulty Level',
			id       : 'difficulty_level',
			accessor : ({ difficulty_level }) => (
				<section>
					{startCase(difficulty_level)}
				</section>
			),
		},
		{
			Header   : '',
			id       : 'options',
			accessor : (item) => (
				<ButtonsComponent
					item={item}
					setAllKeysSaved={setAllKeysSaved}
					getTestQuestionTest={getTestQuestionTest}
					questionSetId={questionSetId}
					setEditDetails={setEditDetails}
					allKeysSaved={allKeysSaved}
					mode={mode}
				/>
			),
		},
	];
};

export default useGetTableColumns;
