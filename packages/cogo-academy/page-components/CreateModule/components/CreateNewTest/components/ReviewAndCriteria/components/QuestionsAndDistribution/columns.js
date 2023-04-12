import { Pill, Tooltip } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import getControls from './controls';
import styles from './styles.module.css';

const getColumns = ({ errors, control }) => {
	const columns = [
		{
			Header   : 'QUESTION SET NAME',
			id       : 'question_set_name',
			accessor : ({ name = '' }) => (
				<Tooltip content={name} placement="top">
					<div className={styles.question_set_name}>
						{startCase(name) || '-'}
					</div>
				</Tooltip>
			),
		},
		{
			Header   : 'TOPIC',
			id       : 'topic',
			accessor : ({ topic = '-' }) => (
				<Tooltip content={topic} placement="top">
					<Pill
						key={topic}
						size="sm"
						color="#F3FAFA"
						className={styles.topic}
					>
						<div className={styles.topic_names}>
							{startCase(topic)}
						</div>
					</Pill>
				</Tooltip>

			),
		},
		// {
		// 	Header   : 'USER GROUPS',
		// 	id       : 'user_groups',
		// 	accessor : ({ audience_ids = [] }) => (
		// 		<section className={styles.usergroups}>
		// 			{audience_ids.map((audience_id) => (
		// 				<Pill
		// 					key={audience_id}
		// 					size="sm"
		// 					color="#FEF3E9"
		// 				>
		// 					{startCase(audience_id)}
		// 				</Pill>
		// 			))}
		// 			{audience_ids.length === 0 && '-'}
		// 		</section>
		// 	),
		// },
		{
			Header   : 'APPLICABLE QUESTIONS',
			id       : 'available_questions',
			accessor : ({ non_case_study_question_count = 0 }) => (
				<section className={styles.count}>
					{non_case_study_question_count}
				</section>
			),
		},
		{
			Header   : 'APPLICABLE CASES',
			id       : 'available_cases',
			accessor : ({
				case_study_question_count
				= 0,
			}) => (
				<section className={styles.case_study_question_count}>{case_study_question_count}</section>
			),
		},
		{
			Header   : 'APPLICABLE SUBJECTIVE',
			id       : 'available_subjective',
			accessor : ({
				subjective_question_count
				= 0,
			}) => (
				<section className={styles.subjective_question_count}>{subjective_question_count}</section>
			),
		},
		{
			Header: (
				<div className={styles.content}>
					<div className={styles.subcontent}>
						<span className={styles.usable}>
							DISTRIBUTION
							<sup className={styles.sup}>*</sup>
						</span>

						<span className={styles.matter}>
							Questions and cases from each Set
						</span>
					</div>
				</div>
			),
			id       : 'distribution',
			accessor : ({
				non_case_study_question_count = 0,
				case_study_question_count = 0,
				subjective_question_count = 0, id = '',
			}) => {
				const controlItem1 = getControls(id, non_case_study_question_count)[0];

				const controlItem2 = getControls(id, case_study_question_count)[1];

				const controlItem3 = getControls(id, subjective_question_count)[2];

				return (
					<section className={styles.distribution}>
						<span className={(errors[`${id}q`] || errors[`${id}c`]) ? null : styles.align_center}>
							No. of
						</span>

						<div className={styles.input_container}>
							<InputController control={control} {...controlItem1} className={styles.input} />
							{errors[`${id}q`] && <div className={styles.error_msg}>{errors[`${id}q`]?.message}</div>}
						</div>

						<div className={styles.input_container}>
							<InputController control={control} {...controlItem2} className={styles.input} />
							{errors[`${id}c`] && <div className={styles.error_msg}>{errors[`${id}c`]?.message}</div>}
						</div>

						<div className={styles.input_container}>
							<InputController control={control} {...controlItem3} className={styles.input} />
							{errors[`${id}c`] && <div className={styles.error_msg}>{errors[`${id}c`]?.message}</div>}
						</div>

					</section>
				);
			},
		},
	];

	return columns;
};

export default getColumns;
