import { Pill, Table, Placeholder } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { startCase, isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getControls from './controls';
import styles from './styles.module.css';

function QuestionsAndDistribution(props) {
	const { data, control, errors, loading, setValue, watch, setError } = props;

	useEffect(() => {
		data?.test_set_distribution_data?.forEach(({
			question_type = '',
			test_question_set_id = '',
			distribution_count = 0,
		}) => {
			if (question_type === 'stand_alone') {
				setValue(`${test_question_set_id}q`, (!(distribution_count || distribution_count === 0))
					? ''
					: distribution_count || '0');	// append with 'q' for stand alone questions
			} else {
				setValue(`${test_question_set_id}c`, (!(distribution_count || distribution_count === 0))
					? ''
					: distribution_count || '0'); // append with 'c' for case study questions
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, setValue]);

	const { set_data = '' } = data || {};

	const standAloneQuestions = watch((set_data || []).map(({ id }) => (`${id}q`)));

	const caseStudyQuestions = watch((set_data || []).map(({ id }) => (`${id}c`)));

	const columns = [
		{
			Header   : 'QUESTION SET NAME',
			id       : 'a',
			accessor : ({ name = '' }) => (
				<section>
					{startCase(name) || '-'}
				</section>
			),
		},
		{
			Header   : 'TOPIC',
			id       : 'b',
			accessor : ({ topic = '-' }) => (
				<section>
					<Pill
						key={topic}
						size="sm"
						color="blue"
					>
						{startCase(topic)}
					</Pill>
				</section>
			),
		},
		{
			Header   : 'USER GROUPS',
			id       : 'c',
			accessor : ({ audience_ids = [] }) => (
				<section>
					{audience_ids.map((audience_id) => (
						<Pill
							key={audience_id}
							size="sm"
							color="orange"
						>
							{startCase(audience_id)}
						</Pill>
					))}
					{audience_ids.length === 0 && '-'}
				</section>
			),
		},
		{
			Header   : 'AVAILABLE QUESTIONS',
			id       : 'd',
			accessor : ({ non_case_study_question_count = 0 }) => (
				<section>{non_case_study_question_count}</section>
			),
		},
		{
			Header   : 'AVAILABLE CASES',
			id       : 'e',
			accessor : ({
				case_study_question_count
				= 0,
			}) => (
				<section>{case_study_question_count}</section>
			),
		},
		{
			Header:
	<div className={styles.content}>
		<div className={styles.subcontent}>
			<span>DISTRIBUTION</span>
			<span className={styles.matter}>
				Questions and cases from each Set
			</span>
		</div>
	</div>,
			id       : 'f',
			accessor : ({ non_case_study_question_count = 0, case_study_question_count = 0, id = '' }) => {
				const controlItem1 = getControls(id, non_case_study_question_count)[0];
				const controlItem2 = getControls(id, case_study_question_count)[1];

				return (

					<section className={styles.distribution}>

						<span>No. of</span>
						<div className="input_container">
							<InputController control={control} {...controlItem1} className={styles.input} />
							{errors[`${id}q`] && <div className={styles.error_msg}>{errors[`${id}q`]?.message}</div>}
						</div>

						<div className="input_container">
							<InputController control={control} {...controlItem2} className={styles.input} />
							{errors[`${id}c`] && <div className={styles.error_msg}>{errors[`${id}c`]?.message}</div>}
						</div>
					</section>
				);
			},
		},
	];

	const questionsCount = (standAloneQuestions || []).reduce(
		(total, currValue) => total + (Number(currValue) || 0),
		0,
	);

	const casesCount = (caseStudyQuestions || []).reduce(
		(total, currValue) => total + (Number(currValue) || 0),
		0,
	);

	setError(questionsCount + casesCount === 0);

	return (
		<>
			<Table
				className={styles.table_container}
				data={data?.set_data || []}
				loading={loading}
				columns={columns}
			/>
			{(isEmpty(data) || loading) ? <Placeholder height="30px" width="100%" margin="0px 0px 20px 0px" /> : (
				<div className={styles.total_questions}>
					<h4 className={styles.total_heading}>
						Total Questions:
						{' '}
						{questionsCount}
					</h4>
					<h4 className={styles.total_heading_two}>
						Total Cases:
						{' '}
						{casesCount}
					</h4>
				</div>
			)}

		</>
	);
}

export default QuestionsAndDistribution;
