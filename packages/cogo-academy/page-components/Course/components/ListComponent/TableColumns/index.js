import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { startCase, format, isEmpty } from '@cogoport/utils';

// import SortComponent from '../../SortComponent';

import { StudentButtons, CourseButtons } from './ButtonComponent';
import styles from './styles.module.css';

export const studentColumns = ({ loading, router, setShowModal, setQuestionSetId, sortFilter, setSortFilter }) => [
	{
		Header   : 'Name',
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
		Header   : 'Source',
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
		Header   : 'Audience',
		id       : 'cogo_entity_name',
		accessor : ({ cogo_entity_name = '' }) => (
			<section>{cogo_entity_name}</section>
		),
	},
	{
		Header   : 'Mandatory courses(Opened/Total)',
		id       : 'questions',
		accessor : ({ stand_alone_question_count = 0 }) => (
			<section>
				{stand_alone_question_count || 0}
			</section>
		),
	},
	{
		Header   : 'Other courses(Opened/Total)',
		id       : 'case_study_questions',
		accessor : ({ case_study_question_count = 0 }) => (
			<section>
				{case_study_question_count || 0}
			</section>
		),
	},
	{
		Header   : 'Courses Completion %',
		id       : 'subjective_questions',
		accessor : ({ subjective_question_count = 0 }) => (
			<section>
				{subjective_question_count || 0}
			</section>
		),
	},
	{
		Header   : 'Joined CogoAcademy',
		id       : 'number_of_tests',
		accessor : ({ set_count = 0 }) => (
			<section>
				{set_count}
			</section>
		),
	},
	{
		Header   : '',
		id       : 'options',
		accessor : (item) => (
			<StudentButtons
				item={item}
				router={router}
				setQuestionSetId={setQuestionSetId}
				setShowModal={setShowModal}
				loading={loading}
			/>
		),

	},
];

export const courseColumns = ({
	loading,
	router,
	setShowModal,
	setTestId,
	sortFilter,
	setSortFilter,
	fetchList,
}) => ([
	{
		Header   : 'Status',
		id       : 'status',
		accessor : ({ status = '' }) => (
			<div>
				<Pill
					size="md"
					color={status === 'active' ? '#CFEAEC' : '#FEF3E9'}
					className={styles.status_pill}
				>
					{startCase(status)}
				</Pill>
			</div>
		),
	},
	{
		Header   : 'Name of Course',
		id       : 'course_name',
		accessor : ({ name = '' }) => (
			<div>
				{name}
			</div>
		),
	},
	{
		Header   : 'Audience',
		id       : 'audience',
		accessor : () => (
			<div>--</div>
		),
	},
	{
		Header   : 'Topics(+Tags)',
		id       : 'topics',
		accessor : ({ query_name = '' }) => {
			const arr = query_name.split(', ');

			const filteredValues = arr.filter((item) => !isEmpty(item));

			const finalString = filteredValues.join(', ');

			return (
				<div>{finalString || '-'}</div>
			);
		},
	},
	{
		Header   : 'Completion criteria',
		id       : 'completion_criteria',
		accessor : ({ completion_criteria = [] }) => {
			const filteredValues = (completion_criteria || []).map((item) => startCase(item));

			const finalString = filteredValues.join(', ');

			return (
				<div>{finalString || '-'}</div>
			);
		},
	},
	{
		Header   : 'Date Created',
		id       : 'date_created',
		accessor : ({ created_at = '' }) => (
			<div className={styles.date}>
				{format(created_at, GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'])}
			</div>
		),
	},
	{
		Header   : '',
		id       : 'options',
		accessor : ({ id = '' }) => (
			<CourseButtons
				id={id}
				loading={loading}
				setShowModal={setShowModal}
				setTestId={setTestId}
				router={router}
				fetchList={fetchList}
			/>
		),
	},
]);
