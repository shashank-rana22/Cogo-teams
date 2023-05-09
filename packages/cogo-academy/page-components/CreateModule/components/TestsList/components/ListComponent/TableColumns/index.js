import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMShare } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';

import SortComponent from '../../SortComponent';
import copyToClipboard from '../helpers/copyToClipboard';

import { QuestionSetButtons, TestSetButtons } from './ButtonComponent';
import styles from './styles.module.css';
import ValidityDisplay from './ValidityDisplay';

export const questionSetColumns = ({ loading, router, setShowModal, setQuestionSetId, sortFilter, setSortFilter }) => [
	{
		Header   : 'QUESTION SET NAME',
		id       : 'name',
		accessor : ({ name = '' }) => (
			<div>
				<Tooltip maxWidth={500} content={startCase(name)} placement="top">
					<div className={styles.content}>
						{name}
					</div>
				</Tooltip>
			</div>
		),
	},
	{
		Header   : 'TOPIC',
		id       : 'topic',
		accessor : ({ topic = [] }) => (
			<section className={styles.content}>
				<Tooltip maxWidth={500} content={startCase(topic)} placement="top">
					<Pill
						className={styles.topic_pill}
						size="md"
						color="#F3FAFA"
					>
						{startCase(topic)}
					</Pill>
				</Tooltip>
			</section>
		),
	},
	{
		Header   : 'COGO ENTITY',
		id       : 'cogo_entity_name',
		accessor : ({ cogo_entity_name = '' }) => (
			<section>{cogo_entity_name}</section>
		),
	},
	{
		Header   : 'NO. OF STANDALONE QUESTIONS',
		id       : 'questions',
		accessor : ({ stand_alone_question_count = 0 }) => (
			<section>
				{stand_alone_question_count || 0}
			</section>
		),
	},
	{
		Header   : 'NO. OF CASES',
		id       : 'case_study_questions',
		accessor : ({ case_study_question_count = 0 }) => (
			<section>
				{case_study_question_count || 0}
			</section>
		),
	},
	{
		Header   : 'NO. OF SUBJECTIVE QUESTIONS',
		id       : 'subjective_questions',
		accessor : ({ subjective_question_count = 0 }) => (
			<section>
				{subjective_question_count || 0}
			</section>
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
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>LAST UPDATED</div>

				<SortComponent
					value="updated_at"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'updated_at',
		accessor : ({ updated_at = '' }) => (
			<span className={styles.time}>
				{`${format(updated_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}`}
				{' '}
				{format(updated_at, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}
			</span>
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

export const testSetColumns = ({
	loading,
	router,
	setShowModal,
	setTestId,
	sortFilter,
	setSortFilter,
	fetchList,
}) => ([
	{
		Header   : 'NAME',
		id       : 'name',
		accessor : ({ name = '', test_duration = '' }) => (
			<div>
				<section>
					{' '}
					<Tooltip content={startCase(name) || '-'}>
						<div className={styles.name}>
							{startCase(name) || '-'}
						</div>
					</Tooltip>
				</section>

				{test_duration ? (
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

				{topics.length > 0 ? (
					<Tooltip maxWidth={400} content={startCase(topics[0])} placement="top" key={topics[0]}>
						<Pill
							className={styles.topic_pill}
							size="lg"
							color="#F3FAFA"
						>
							{startCase(topics[0])}
						</Pill>
					</Tooltip>
				) : '-'}

				{topics.length > 1 && (
					<Tooltip
						maxWidth={400}
						content={(topics.map((topic, index) => ((index >= 1) ? (
							<Pill
								className={styles.topic_pill_sub}
								size="lg"
								color="#F3FAFA"
							>
								{startCase(topic)}
							</Pill>
						) : null)))}
						placement="top"
						interactive
					>
						<Pill
							className={styles.topic_pill}
							size="lg"
							color="#F3FAFA"
						>
							+
							{topics.length - 1}
							{' '}
							More
						</Pill>
					</Tooltip>
				)}
			</section>
		),
	},
	{
		Header   : 'TOTAL QUESTIONS',
		id       : 'total_questions',
		accessor : ({ case_study_questions = 0, stand_alone_questions = 0, subjective_questions = 0 }) => (
			<section className={styles.questions_count}>
				<div>
					{stand_alone_questions || 0}
					{' '}
					Standalone
				</div>
				<div>
					{case_study_questions || 0}
					{' '}
					Cases
				</div>
				<div>
					{subjective_questions || 0}
					{' '}
					Subjective
				</div>
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
			if (['active', 'upcoming'].includes(current_status)) {
				return (
					<section className={styles.details}>
						<section className={styles.status}>
							<Pill
								size="md"
								color={current_status === 'upcoming' ? '#CFEAEC' : '#C4DC91'}
								className={styles.status_pill}
							>
								{startCase(current_status)}
							</Pill>

							<div role="presentation" onClick={() => copyToClipboard(id)}>
								<Pill
									key={current_status}
									size="md"
									prefix={<IcMShare />}
									color="#FEF3E9"
									className={styles.status_pill}
									style={{ cursor: 'pointer' }}
								>
									Share Test Link
								</Pill>
							</div>
						</section>

						<ValidityDisplay validity_end={validity_end} validity_start={validity_start} />
					</section>
				);
			}

			if (current_status === 'published') {
				return (
					<section>
						<Pill
							key={current_status}
							size="md"
							color="orange"
							className={styles.status_pill}
						>
							Results
							{' '}
							{startCase(current_status)}
						</Pill>

						<ValidityDisplay validity_end={validity_end} validity_start={validity_start} />
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
							className={styles.status_pill}
						>
							{startCase(current_status)}
						</Pill>

						<ValidityDisplay validity_end={validity_end} validity_start={validity_start} />
					</section>

				);
			}

			return (
				<section>
					<Pill
						key={current_status}
						size="md"
						color="yellow"
						className={styles.status_pill}
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
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>LAST UPDATED</div>

				<SortComponent
					value="updated_at"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),

		id: 'updatedAt',

		accessor: ({ updated_at = '' }) => (
			<section className={styles.time}>
				<span>{format(updated_at, 'dd MMM yy')}</span>

				<span>{format(updated_at, 'h:mm a')}</span>
			</section>
		),
	},
	{
		Header   : '',
		id       : 'options',
		accessor : ({ id = '', validity_start = '', current_status = '', validity_end = '' }) => (
			<TestSetButtons
				id={id}
				validity_start={validity_start}
				current_status={current_status}
				loading={loading}
				setShowModal={setShowModal}
				setTestId={setTestId}
				router={router}
				validity_end={validity_end}
				fetchList={fetchList}
			/>
		),
	},
]);
