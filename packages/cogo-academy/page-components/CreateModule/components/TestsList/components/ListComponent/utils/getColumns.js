import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMOverflowDot, IcMDelete, IcMEyeopen, IcMEdit } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';

import styles from './styles.module.css';

export const questionSetColumns = ({ loading, updateApi, fetchList, router }) => {
	const handleDeleteQuestionSet = (id) => {
		updateApi({ questionSetId: id, getTestQuestionTest: fetchList, type: 'delete', from: 'test' });
	};

	const handleEditQuestionSet = (id) => {
		router.push(`/learning/test-module/create-question?id=${id}`);
	};

	return [
		{
			Header   : 'NAME',
			id       : 'a',
			accessor : ({ name = '' }) => (
				<section>{name}</section>
			),
		},
		{
			Header   : 'TOPICS',
			id       : 'c',
			accessor : ({ topic = [] }) => (
				<section>
					{topic}
				</section>
			),
		},
		{
			Header   : 'TOTAL QUESTIONS/CASES',
			id       : 'd',
			accessor : ({
				non_case_study_question_count
				= 0, case_study_question_count
				= 0,
			}) => (
				<section>
					{non_case_study_question_count || 0}
					{' '}
					Q +
					{' '}
					{case_study_question_count || 0}
					{' '}
					Cases
				</section>
			),
		},
		{
			Header   : 'STATUS',
			id       : 'tags',
			accessor : ({ status = '' }) => (
				<section>{status}</section>
			),
		},
		{
			Header   : 'AUDIENCE IDS',
			id       : 'audience_ids',
			accessor : ({ audience_ids = '' }) => (
				<section>{audience_ids.length || '--'}</section>
			),
		},
		{
			Header   : 'LAST UPDATED',
			id       : 'updatedAt',
			accessor : ({ updated_at = '' }) => (
				<section>
					{format(updated_at, 'dd MMM yyyy')}
				</section>
			),
		},
		{
			Header   : '',
			id       : 'options',
			accessor : (item) => (

				<section>
					<div
						role="presentation"
					>
						<div style={{
							width  : 'fit-content',
							cursor : 'default',
						}}
						>
							<Tooltip
								className={styles.tooltip_pad}
								content={(
									<div className={styles.options}>
										<Button
											loading={loading}
											type="button"
											themeType="secondary"
											className={styles.btn}
											onClick={() => handleEditQuestionSet(item.id)}
										>
											<IcMEdit />
											<div style={{ marginLeft: '8px' }}>
												Edit
											</div>
										</Button>
										<Button
											loading={loading}
											type="button"
											themeType="secondary"
											className={styles.btn}
											onClick={() => handleDeleteQuestionSet(item.id)}
										>
											<IcMDelete />
											<div style={{ marginLeft: '8px' }}>
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

					</div>
				</section>
			),

		},
	];
};

export const testSetColumns = () => [
	{
		Header   : 'NAME',
		id       : 'a',
		accessor : ({ name = '' }) => (
			<section>{name}</section>
		),
	},
	{
		Header   : 'TOPICS',
		id       : 'c',
		accessor : ({ topic = [] }) => (
			<section>
				{topic.map((topicItem) => (
					<Pill
						key={topicItem}
						size="sm"
						color="blue"
					>
						{startCase(topicItem)}
					</Pill>
				))}
				{topic.length === 0 && '-'}
			</section>
		),
	},
	{
		Header   : 'TOTAL QUESTIONS/CASES',
		id       : 'd',
		accessor : ({ case_study_questions = 0, stand_alone_questions = 0 }) => (
			<section>
				{stand_alone_questions || 0}
				{' '}
				Q +
				{' '}
				{case_study_questions || 0}
				{' '}
				Cases
			</section>
		),
	},
	{
		Header   : 'ALLOWED ATTEMPTS',
		id       : 'ss',
		accessor : ({ maximum_attempts = 0 }) => (
			<section>{maximum_attempts || '-'}</section>
		),
	},
	{
		Header   : 'PASS %',
		id       : 'e',
		accessor : ({ cut_off_marks = '' }) => (
			<section>
				{cut_off_marks || '-'}
			</section>
		),
	},
	{
		Header   : 'ATTEMPTED BY',
		id       : 'ik',
		accessor : ({ audience_ids = [] }) => (
			<section>{audience_ids.length}</section>
		),
	},
	{
		Header   : 'STATUS',
		id       : 'tags',
		accessor : ({ status = '' }) => (
			<section>{status}</section>
		),
	},
	{
		Header   : '',
		id       : 'results',
		accessor : ({ id = '' }) => (
			<div>
				<Link href={`/learning/tests/results/admin/${id}`}>Results</Link>
			</div>
		),
	},
	{
		Header   : 'LAST UPDATED',
		id       : 'updatedAt',
		accessor : ({ updated_at = '' }) => (
			<section>
				{format(updated_at, 'dd MMM yyyy')}
			</section>
		),
	},
	{
		Header   : '',
		id       : 'options',
		accessor : () => (

			<section>
				<div
					role="presentation"
				>
					<div style={{
						width  : 'fit-content',
						cursor : 'default',
					}}
					>
						<Tooltip
							className={styles.tooltip_pad}
							content={(
								<div className={styles.options}>
									<Button
										themeType="secondary"
										className={styles.btn}
									>
										<IcMEdit />
										<div style={{ marginLeft: '8px' }}>
											Edit
										</div>
									</Button>
									<Button
										themeType="secondary"
										className={styles.btn}
									>

										<IcMEyeopen />
										<div style={{ marginLeft: '8px' }}>
											View
										</div>
									</Button>
									<Button
										themeType="secondary"
										className={styles.btn}
									>
										<IcMDelete />
										<div style={{ marginLeft: '8px' }}>
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

				</div>
			</section>
		),

	},
];
