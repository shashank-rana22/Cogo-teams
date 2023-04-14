import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import AnswerKey from '../AnswerKey';
import CaseAnswerType from '../CaseAnswerType';
import CaseQuestion from '../CaseQuestion';
import OptionsComponent from '../OptionsComponent';
import SortComponent from '../SortComponent';

import styles from './styles.module.css';

const useGetTableColumns = ({
	setAllKeysSaved,
	getTestQuestionTest,
	questionSetId,
	setEditDetails,
	allKeysSaved,
	mode,
	listSetQuestions,
	setSortFilter,
	sortFilter,
	editDetails,
}) => {
	const [caseToShow, setCaseToShow] = useState('');

	return [
		{
			Header   : 'QUESTION TYPE',
			id       : 'question_type',
			accessor : ({ question_type }) => (
				<section>
					{question_type === 'case_study' ? 'Case Study' : 'Stand Alone'}
				</section>
			),
		},
		{
			Header   : 'QUESTION/CASE',
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
			Header   : 'ANSWER TYPE',
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
			Header   : 'ANSWER KEY',
			id       : 'answer_key',
			accessor : (item) => (
				<AnswerKey item={item} caseToShow={caseToShow} />
			),
		},
		{
			Header   : 'DIFFICULTY LEVEL',
			id       : 'difficulty_level',
			accessor : ({ difficulty_level }) => (
				<section>
					{startCase(difficulty_level)}
				</section>
			),
		},
		{
			Header: (
				<div className={styles.updated_at}>
					<div className={styles.updated_at_text}>UPDATED AT</div>

					<SortComponent
						value="updated_at"
						sortFilter={sortFilter}
						setSortFilter={setSortFilter}
					/>
				</div>
			),
			id       : 'updated_at',
			accessor : ({ updated_at }) => (
				<div>
					{format(updated_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
				</div>
			),
		},
		{
			Header   : '',
			id       : 'options',
			accessor : (item) => (
				<OptionsComponent
					item={item}
					setAllKeysSaved={setAllKeysSaved}
					getTestQuestionTest={getTestQuestionTest}
					listSetQuestions={listSetQuestions}
					questionSetId={questionSetId}
					setEditDetails={setEditDetails}
					allKeysSaved={allKeysSaved}
					mode={mode}
					editDetails={editDetails}
				/>
			),
		},
	];
};

export default useGetTableColumns;
