import { Pill, Tooltip } from '@cogoport/components';
import { IcMShare } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';

import copyToClipboard from '../helpers/copyToClipboard';

import { QuestionSetButtons, TestSetButtons } from './ButtonComponent';
import styles from './styles.module.css';

export const questionSetColumns = ({ loading, router, setShowModal, setQuestionSetId }) => [
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
				<span className={styles.question_set_time}>{format(updated_at, 'dd MMM yy')}</span>
				<span className={styles.question_set_time}>{format(updated_at, 'h:mm a')}</span>
			</section>
		),
	},
	{
		Header   : '',
		id       : 'options',
		accessor : (item) => (
			<QuestionSetButtons
				item={item}
				router={router}
				setQuestionSetId={setQuestionSetId}
				setShowModal={setShowModal}
				loading={loading}
			/>
		),

	},
];

export const testSetColumns = ({ loading, router, setShowModal, setTestId }) => ([
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

							<div role="presentation" onClick={() => copyToClipboard(id)}>
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
			<TestSetButtons
				id={id}
				validity_start={validity_start}
				status={status}
				loading={loading}
				setShowModal={setShowModal}
				setTestId={setTestId}
				router={router}
			/>
		),
	},
]);
