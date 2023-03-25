import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMShare, IcMOverflowDot, IcMDelete, IcMEdit } from '@cogoport/icons-react';
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
					<span className={styles.questionsettime}>{format(updated_at, 'dd MMM\'yy ')}</span>
					<span className={styles.questionsettime}>{format(updated_at, 'h:mm a')}</span>
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

export const testSetColumns = ({ loading, fetchList, updateApi, router }) => {
	const handleDeleteTest = (id) => {
		updateApi({ test_id: id, fetchList, type: 'delete', from: 'test' });
	};

	const handleEditTest = (id) => {
		router.push(`/learning/test-module/create-test?id=${id}`);
	};
	return ([
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
			accessor : ({ topics = [] }) => (
				<section style={{ display: 'flex', flexWrap: 'wrap', width: '70%' }}>
					{topics.map((topicItem) => (
						<Pill
							key={topicItem}
							size="sm"
							color="blue"
						>
							{startCase(topicItem)}
						</Pill>
					))}
					{topics.length === 0 && '-'}
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
			accessor : ({ cut_off_percentage = '' }) => (
				<section>
					{cut_off_percentage || '-'}
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
			accessor : ({ status = '', id = '', validity_start = '', validity_end = '' }) => {
				if (status === 'active') {
					return (
						<section className={styles.details}>
							<section className={styles.status}>
								<Pill size="md" color="green">{startCase(status)}</Pill>
								<Link href={`/learning/tests/${id}`}>
									<Pill
										key={status}
										size="md"
										prefix={<IcMShare />}
										color="#FEF3E9"
										style={{ cursor: 'pointer' }}
									>
										Share Test Link
									</Pill>
								</Link>
							</section>
							<section>
								{format(validity_start, 'dd/MM/yyyy - ')}
								{format(validity_end, 'dd/MM/yyyy')}
							</section>
						</section>
					);
				} if (status === 'published') {
					return (
						<section>
							<Pill
								key={status}
								size="md"
								color="orange"
							>
								{startCase(status)}
							</Pill>
						</section>
					);
				}
				return (
					<section>
						<Pill
							key={status}
							size="md"
							color="yellow"
						>
							{startCase(status)}
						</Pill>
					</section>
				);
			},
		},
		{
			Header   : '',
			id       : 'results',
			accessor : ({ id = '', status = '' }) => (
				status === 'published' ? (
					<div>
						<Link href={`/learning/tests/results/admin/${id}`}>Results</Link>
					</div>
				) : <section>-</section>

			),
		},
		{
			Header   : 'LAST UPDATED',
			id       : 'updatedAt',
			accessor : ({ updated_at = '' }) => (
				<section className={styles.time}>
					<span>{format(updated_at, 'dd MMM\'yy')}</span>
					<span>{format(updated_at, 'h:mm a')}</span>
				</section>
			),
		},
		{
			Header   : '',
			id       : 'options',
			accessor : ({ id = '', validity_start = '' }) => (

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
										{(validity_start && new Date().getTime()
										>= new Date(validity_start).getTime()) ? (
												null
											) : (
												<Button
													loading={loading}
													themeType="secondary"
													className={styles.btn}
													onClick={() => handleEditTest(id)}
												>
													<IcMEdit />
													<div style={{ marginLeft: '8px' }}>
														Edit
													</div>
												</Button>
											)}

										<Button
											loading={loading}
											themeType="secondary"
											className={styles.btn}
											onClick={() => handleDeleteTest(id)}
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
	]);
};
