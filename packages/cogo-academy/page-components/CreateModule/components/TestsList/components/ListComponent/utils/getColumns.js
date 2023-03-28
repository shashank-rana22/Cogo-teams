import { Pill, Button, Tooltip, Toast } from '@cogoport/components';
import { IcMShare, IcMOverflowDot, IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';

import styles from './styles.module.css';

export const questionSetColumns = ({ loading, router, setShowModal, setQuestionSetId }) => {
	const handleEditQuestionSet = (id) => {
		router.push(`/learning/test-module/edit-question?id=${id}`);
	};

	const handleViewQuestionSet = (id) => {
		router.push(`/learning/test-module/view-question?id=${id}`);
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
					<Pill
						size="md"
						color="#CFEAED"
					>
						{startCase(topic)}
					</Pill>
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
			Header   : 'NO. OF TESTS USING THE SET',
			id       : 'e',
			accessor : ({ set_count = 0 }) => (
				<section>
					{set_count}
				</section>
			),
		},
		{
			Header   : 'LAST UPDATED',
			id       : 'updatedAt',
			accessor : ({ updated_at = '' }) => (
				<section>
					<span className={styles.questionsettime}>{format(updated_at, 'dd MMM yy')}</span>
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
											onClick={() => handleViewQuestionSet(item.id)}
										>
											<IcMEdit />
											<div style={{ marginLeft: '8px' }}>
												View
											</div>
										</Button>
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
											onClick={() => {
												setQuestionSetId(item.id);
												setShowModal(true);
											}}
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

export const testSetColumns = ({ loading, router, setShowModal, setTestId }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const handleEditTest = (id) => {
		router.push(`/learning/test-module/create-test?id=${id}`);
	};

	const CopyToClipboard = async (id) => {
		const path = `${window.location.host + window.location.pathname}/tests/${id}`;
		try {
			await navigator.clipboard.writeText(path);
			Toast.success('Copied successfully!');
		} catch (error) {
			Toast.error(error?.message || 'Cannot copy!');
		}
	};

	return ([
		{
			Header   : 'NAME',
			id       : 'a',
			accessor : ({ name = '', test_duration = '', status = '' }) => (
				<div>
					<section>
						{' '}
						<Tooltip content={startCase(name) || '-'}>
							<div className={styles.name}>
								{startCase(name) || '-'}
							</div>
						</Tooltip>

					</section>
					{status === 'active' ? (
						<section className={styles.duration}>
							{test_duration}
							{' '}
							mins
						</section>
					) : null}
				</div>
			),
		},
		{
			Header   : 'TOPICS',
			id       : 'c',
			accessor : ({ topics = [] }) => (
				<section className={styles.topics}>
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
			Header   : 'CUTOFF PASS %',
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
			accessor : ({ attempted_by = 0 }) => (
				<section>
					{attempted_by}
				</section>
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

								<div role="presentation" onClick={() => CopyToClipboard(id)}>
									<Pill
										key={status}
										size="md"
										prefix={<IcMShare />}
										color="#FEF3E9"
										style={{ cursor: 'pointer' }}
									>
										Share Test Link
									</Pill>
								</div>

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
								Results
								{' '}
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
				status === 'draft' ? null : (
					<div>
						<Link href={`/learning/tests/dashboard/admin/${id}`}>
							{(status === 'active') ? 'View Details' : 'View Results'}
						</Link>
					</div>
				)

			),
		},
		{
			Header   : 'LAST UPDATED',
			id       : 'updatedAt',
			accessor : ({ updated_at = '' }) => (
				<section className={styles.time}>
					<span>{format(updated_at, 'dd MMM yy')}</span>
					<span>{format(updated_at, 'h:mm a')}</span>
				</section>
			),
		},
		{
			Header   : '',
			id       : 'options',
			accessor : ({ id = '', validity_start = '', status = '' }) => (

				<section>
					{(status === 'published' || (validity_start && new Date().getTime()
					>= new Date(validity_start).getTime() && status === 'active')) ? (null) : (
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
												themeType="secondary"
												className={styles.btn}
												onClick={() => handleEditTest(id)}
											>
												<IcMEdit />
												<div style={{ marginLeft: '8px' }}>
													Edit
												</div>
											</Button>
											<Button
												loading={loading}
												themeType="secondary"
												className={styles.btn}
												type="button"
												onClick={() => {
													setShowModal(true);
													setTestId(id);
												}}
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
						)}
				</section>
			),
		},
	]);
};
