import { Pill, Table } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import getControls from './controls';
import styles from './styles.module.css';

function QuestionsAndDistribution({ data, control, errors, loading, setValue }) {
	useEffect(() => {
		data?.test_set_distribution_data?.forEach((test_set_distribution) => {
			if (test_set_distribution.question_type === 'stand_alone') {
				setValue(`${test_set_distribution.test_question_set_id
				}q`, test_set_distribution.distribution_count || '0');	// append with 'q' for stand alone questions
			} else {
				setValue(`${test_set_distribution.test_question_set_id
				// eslint-disable-next-line radix
				}c`, test_set_distribution.distribution_count || '0'); // append with 'c' for case study questions
			}
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, setValue]);

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
			Header   : 'DISTRIBUTION',
			id       : 'f',
			accessor : ({ non_case_study_question_count = 0, case_study_question_count = 0, id = '' }) => {
				const controlItem1 = getControls(id, non_case_study_question_count || 0)[0];
				const controlItem2 = getControls(id, case_study_question_count || 0)[1];

				return (
					<section className={styles.distribution}>
						<span>No. of</span>
						<div>
							<InputController control={control} {...controlItem1} className={styles.input} />
							{errors[`${id}q`] && <div className={styles.error_msg}>{errors[`${id}q`]?.message}</div>}

						</div>
						<div>
							<InputController control={control} {...controlItem2} className={styles.input} />
							{errors[`${id}c`] && <div className={styles.error_msg}>{errors[`${id}c`]?.message}</div>}
						</div>

					</section>
				);
			},
		},
	];
	return (
		<Table
			className={styles.table_container}
			data={data?.set_data || []}
			loading={loading}
			columns={columns}
		/>
	);
}

export default QuestionsAndDistribution;
