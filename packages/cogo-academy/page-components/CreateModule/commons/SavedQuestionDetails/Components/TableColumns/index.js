import { Tooltip, Button } from '@cogoport/components';
import { IcMEdit, IcMDelete, IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getCorrectAnswers from '../../utils/getCorrectAnswers';
import getCorrectAnswersCombined from '../../utils/getCorrectAnswersCombined';
import CaseAnswerKey from '../CaseAnswerKey';
import CaseAnswerType from '../CaseAnswerType';
import CaseQuestion from '../CaseQuestion';

import styles from './styles.module.css';

const TableColumns = ({ allKeysSaved, handleEditQuestion, loading, caseStudyLoading, mode, setShowModal }) => {
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
											correctOptions: (item?.answers || []).filter(
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
								{getCorrectAnswers({ answers: item?.answers })}
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
										<div style={{ marginLeft: '8px' }}>{mode !== 'view' ? 'Edit' : 'View'}</div>
									</Button>

									{mode !== 'view' ? (
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
												onClick={() => {
													setShowModal(item);
												}}
												style={{ marginLeft: '8px' }}
											>
												Delete
											</div>
										</Button>
									) : null}
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
};

export default TableColumns;
