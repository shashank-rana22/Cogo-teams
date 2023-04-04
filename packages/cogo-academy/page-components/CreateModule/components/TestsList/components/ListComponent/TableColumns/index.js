import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { IcMShare } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';

import copyToClipboard from '../helpers/copyToClipboard';

import { QuestionSetButtons, TestSetButtons } from './ButtonComponent';
import styles from './styles.module.css';

export const questionSetColumns = ({ loading, router, setShowModal, setQuestionSetId }) => [
	{
		Header   : 'NAME',
		id       : 'name',
		accessor : ({ name = '' }) => (
			<section>{name}</section>
		),
	},
	{
		Header   : 'TOPIC',
		id       : 'topic',
		accessor : ({ topic = [] }) => (
			<section>
				<Tooltip maxWidth={500} content={startCase(topic)} placement="top">
					<Pill
						className={styles.topic_pill}
						size="md"
						color="#CFEAED"
					>
						{startCase(topic)}
					</Pill>
				</Tooltip>
			</section>
		),
	},
	{
		Header   : 'TOTAL QUESTIONS/CASES',
		id       : 'total_questions',
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
		id       : 'status',
		accessor : ({ status = '' }) => (
			<section>{status}</section>
		),
	},
	{
		Header   : 'NO. OF TESTS USING THE SET',
		id       : 'number_of_tests',
		accessor : ({ set_count = 0 }) => (
			<section>
				{set_count}
			</section>
		),
	},
	{
		Header   : 'LAST UPDATED',
		id       : 'updated_at',
		accessor : ({ updated_at = '' }) => (
			<section>
				<span className={styles.time}>{format(updated_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}</span>
				<span className={styles.time}>{format(updated_at, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}</span>
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
		id       : 'name',
		accessor : ({ name = '', test_duration = '', current_status = '' }) => (
			<div>
				<section>
					{' '}
					<Tooltip content={startCase(name) || '-'}>
						<div className={styles.name}>
							{startCase(name) || '-'}
						</div>
					</Tooltip>
				</section>

				{current_status === 'active' ? (
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
		id       : 'topics',
		accessor : ({ topics = [] }) => (
			<section className={styles.topics}>
				{topics.map((topic) => (
					<Tooltip maxWidth={500} content={startCase(topic)} placement="top" key={topic}>
						<Pill
							className={styles.topic_pill}
							size="sm"
							color="#CFEAED"
						>
							{startCase(topic)}
						</Pill>
					</Tooltip>
				))}
				{topics.length === 0 && '-'}
			</section>
		),
	},
	{
		Header   : 'TOTAL QUESTIONS/CASES',
		id       : 'total_questions',
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
		id       : 'allowed_attempts',
		accessor : ({ maximum_attempts = 0 }) => (
			<section>{maximum_attempts || '-'}</section>
		),
	},
	{
		Header   : 'CUTOFF PASS %',
		id       : 'cutoff_pass',
		accessor : ({ cut_off_percentage = '' }) => (
			<section>
				{cut_off_percentage || '-'}
			</section>
		),
	},
	{
		Header   : 'ATTEMPTED BY',
		id       : 'attempted_by',
		accessor : ({ attempted_by = 0 }) => (
			<section>
				{attempted_by}
			</section>
		),
	},
	{
		Header   : 'STATUS',
		id       : 'status',
		accessor : ({ current_status = '', id = '', validity_start = '', validity_end = '' }) => {
			if (current_status === 'active') {
				return (
					<section className={styles.details}>
						<section className={styles.status}>
							<Pill size="md" color="green">{startCase(current_status)}</Pill>

							<div role="presentation" onClick={() => copyToClipboard(id)}>
								<Pill
									key={current_status}
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
			} if (current_status === 'published') {
				return (
					<section>
						<Pill
							key={current_status}
							size="md"
							color="orange"
						>
							Results
							{' '}
							{startCase(current_status)}
						</Pill>
					</section>
				);
			}

			if (current_status === 'upcoming') {
				return (
					<section>
						<section>
							<Pill
								key={current_status}
								size="md"
								color="blue"
							>
								{startCase(current_status)}
							</Pill>
						</section>

						<section>
							{format(validity_start, 'dd/MM/yyyy - ')}
							{format(validity_end, 'dd/MM/yyyy')}
						</section>
					</section>
				);
			}

			if (current_status === 'expired') {
				return (
					<section>
						<Pill
							key={current_status}
							size="md"
							color="red"
						>
							{startCase(current_status)}
						</Pill>
					</section>
				);
			}

			return (
				<section>
					<Pill
						key={current_status}
						size="md"
						color="yellow"
					>
						{startCase(current_status)}
					</Pill>
				</section>
			);
		},
	},
	{
		Header   : '',
		id       : 'results',
		accessor : ({ id = '', current_status = '' }) => (
			(current_status === 'draft') ? null : (
				<div>
					<Link href={`/learning/tests/dashboard/admin/${id}`}>
						{(current_status === 'published') ? 'View Results' : 'View Details'}
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
		accessor : ({ id = '', validity_start = '', current_status = '' }) => (
			<TestSetButtons
				id={id}
				validity_start={validity_start}
				current_status={current_status}
				loading={loading}
				setShowModal={setShowModal}
				setTestId={setTestId}
				router={router}
			/>
		),
	},
]);
