import { Pill, Table, Input } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function QuestionsAndDistribution({ loading, data }) {
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
			Header   : 'APPLICABLE QUESTIONS',
			id       : 'd',
			accessor : ({ non_case_study_question_count = 0 }) => (
				<section>{non_case_study_question_count}</section>
			),
		},
		{
			Header   : 'APPLICABLE CASES',
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
			accessor : () => (
				<section className={styles.distribution}>
					<span>No. of</span>
					<Input
						className={styles.input}
						size="sm"
						name="n_of_questions"
						placeholder="Questions"
					/>
					<Input className={styles.input} size="sm" name="n_of_cases" placeholder="Cases" />
				</section>
			),
		},
	];
	return (
		<Table
			className={styles.table_container}
			data={data || []}
			loading={loading}
			columns={columns}
		/>
	);
}

export default QuestionsAndDistribution;
