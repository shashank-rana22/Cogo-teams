import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, format, isEmpty } from '@cogoport/utils';

import { StudentButtons, CourseButtons } from './components/ButtonComponent';
import SortComponent from './components/SortComponent';
import styles from './styles.module.css';

const getState = ({ state, status }) => {
	if (status === 'inactive') {
		return { state: 'Inactive', color: '#ff8888' };
	}

	if (state === 'published') {
		return { state: 'Active', color: '#CFEAEC' };
	}

	return { state: 'Draft', color: '#FEF3E9' };
};

export const studentColumns = ({
	loading,
	router,
	setShowModal,
	setStudentId,
}) => [
	{
		Header   : 'Name',
		id       : 'name',
		accessor : ({ user_details = {} }) => {
			const { name = '' } = user_details;

			return (
				<div>
					<Tooltip maxWidth={500} content={startCase(name)} placement="top">
						<div className={styles.content}>
							{name}
						</div>
					</Tooltip>
				</div>
			);
		},
	},
	{
		Header   : 'Mandatory courses',
		id       : 'mandatory',
		accessor : ({ mandatory = 0 }) => (
			<section>
				{mandatory}
			</section>
		),
	},
	{
		Header   : 'Other courses',
		id       : 'not_mandatory',
		accessor : ({ not_mandatory = 0 }) => (
			<section>
				{not_mandatory}
			</section>
		),
	},
	{
		Header   : 'Total courses',
		id       : 'total_courses',
		accessor : ({ total_courses = 0 }) => (
			<section>
				{total_courses}
			</section>
		),
	},
	{
		Header   : 'Courses Completion %',
		id       : 'subjective_questions',
		accessor : ({ total_courses = 0, courses_completion = 0 }) => (
			<section>
				{total_courses ? courses_completion / total_courses : 0}
				%
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
				setStudentId={setStudentId}
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
	setCourseId,
	setParams,
	params,
	updateApi,
}) => ([
	{
		Header   : 'Status',
		id       : 'status',
		accessor : ({ state	= '', status }) => (
			<div>
				<Pill
					size="md"
					color={getState({ status, state }).color}
					className={styles.status_pill}
				>
					{getState({ status, state }).state}
				</Pill>
			</div>
		),
	},
	{
		Header   : 'Name of Course',
		id       : 'course_name',
		accessor : ({ name = '' }) => (
			<div className={styles.text}>
				<Tooltip
					theme="light"
					placement="bottom"
					interactive
					content={name}
				>
					{name}
				</Tooltip>
			</div>
		),
	},
	{
		Header   : 'Audience',
		id       : 'audience',
		accessor : ({ course_audience_mappings }) => {
			const audienceArray = course_audience_mappings.map((item) => item.faq_audience.name);

			if (isEmpty(audienceArray)) {
				return '--';
			}

			return (
				<div className={styles.audience}>
					{audienceArray.map((item) => (
						<div key={item}>
							<Pill
								size="md"
								color="#FEF3E9"
								className={styles.status_pill}
							>
								{item}
							</Pill>
						</div>
					))}
				</div>
			);
		},
	},
	{
		Header: (
			<div>
				<div>Topics</div>
				<div className={styles.tag_text}>(+Tags)</div>
			</div>
		),
		id       : 'topics',
		accessor : ({ faq_tags = [], faq_topics = [] }) => {
			const topicsArr = faq_topics.map((item) => startCase(item.name));

			const tagsArr = faq_tags.map((item) => startCase(item.name));

			const finalString = tagsArr.join(', ');

			return (
				<div>
					{topicsArr.map((item, index) => {
						if (index > 0) {
							return null;
						}

						return (
							<Pill
								key={item}
								size="md"
								color="#F7FAEF"
								className={styles.status_pill}
							>
								{item}
							</Pill>
						);
					})}
					{topicsArr.length > 1 ? <Pill color="#F7FAEF">{`+${topicsArr.length - 1} More`}</Pill> : null}
					<Tooltip
						theme="light"
						placement="bottom"
						interactive
						content={finalString}
					>
						<div className={styles.tags}>{finalString}</div>
					</Tooltip>

				</div>
			);
		},
	},
	{
		Header: (
			<div>
				<div>Completion</div>
				<div>criteria</div>
			</div>
		),
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
		Header: (
			<div className={styles.updated_at}>
				<div className={styles.updated_at_text}>
					<div>Date</div>
					<div>Created</div>

				</div>

				<SortComponent
					value="created_at"
					setParams={setParams}
					params={params}
				/>
			</div>
		),
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
		accessor : ({ id = '', status }) => (
			<CourseButtons
				id={id}
				loading={loading}
				setShowModal={setShowModal}
				setCourseId={setCourseId}
				router={router}
				status={status}
				updateApi={updateApi}
			/>
		),
	},
]);
