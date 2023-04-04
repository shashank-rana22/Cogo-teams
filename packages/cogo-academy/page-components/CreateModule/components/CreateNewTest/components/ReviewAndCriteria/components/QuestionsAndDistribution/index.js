import { Table, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getColumns from './columns';
import styles from './styles.module.css';

function QuestionsAndDistribution(props) {
	const { data, loading, errors, control, setValue, watch, setError } = props;

	const columns = getColumns({ errors, control });
	useEffect(() => {
		data?.test_set_distribution_data?.forEach(({
			question_type = '',
			test_question_set_id = '',
			distribution_count = 0,
		}) => {
			if (question_type === 'stand_alone') {
				setValue(`${test_question_set_id}q`, (!(distribution_count || distribution_count === 0))
					? ''
					: distribution_count || '0');
			} else {
				setValue(`${test_question_set_id}c`, (!(distribution_count || distribution_count === 0))
					? ''
					: distribution_count || '0');
			}
		});
	}, [data, setValue]);

	const { set_data = '' } = data || {};

	const standAloneQuestions = watch((set_data || []).map(({ id }) => (`${id}q`)));

	const caseStudyQuestions = watch((set_data || []).map(({ id }) => (`${id}c`)));

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
			<span className={styles.heading_content}>
				<span className={styles.text}>Questions and Distribution</span>
				{/* <span className={styles.all}>
					<Pill color="#CFEAED" className={styles.question_pill}>
						<div className={styles.question_info}>
							Total Available Questions :
						</div>
					</Pill>
				</span> */}
			</span>

			<Table
				className={styles.table_container}
				data={data?.set_data || []}
				loading={loading}
				columns={columns}
			/>

			{(isEmpty(data) || loading)
				? <Placeholder height="30px" width="100%" margin="0px 0px 20px 0px" />
				: (
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
