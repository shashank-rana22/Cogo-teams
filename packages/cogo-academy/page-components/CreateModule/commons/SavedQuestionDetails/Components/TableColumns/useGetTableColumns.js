import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import AnswerKey from '../AnswerKey';
import ButtonsComponent from '../ButtonsComponent';
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
	listSetQuestions,
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
				<AnswerKey item={item} caseToShow={caseToShow} />
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
					listSetQuestions={listSetQuestions}
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
