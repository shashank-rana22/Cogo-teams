import { Checkbox, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { startCase, format } from '@cogoport/utils';

import styles from './styles.module.css';

const handleChange = ({ event, id, setIdArray }) => {
	if (event.target.checked) {
		setIdArray((prev) => [...prev, id]);
		return;
	}

	setIdArray((prev) => {
		const temp = [...prev];
		const index = temp.indexOf(id);
		if (index !== -1) {
			temp.splice(index, 1);
		}
		return temp;
	});
};

const getQuestionSetColumns = ({ idArray, setIdArray }) => ([
	{
		Header   : '',
		id       : 'select_question_set',
		accessor : ({ id = '' }) => (
			<Checkbox
				key="question_set"
				name="question_set"
				className={styles.checkbox}
				value={id}
				checked={(idArray || []).includes(id)}
				onChange={(event) => handleChange({ event, id, setIdArray })}
			/>
		),
	},
	{
		Header   : 'QUESTION SET NAME',
		id       : 'name',
		accessor : ({ name = '' }) => (
			<section>
				{startCase(name) || '-'}
			</section>
		),
	},
	{
		Header   : 'TOPIC',
		id       : 'topic',
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
		id       : 'user_groups',
		accessor : ({ audience_ids = [] }) => (
			<section>
				{audience_ids.map((audience_id) => (
					<Pill
						key={audience_id}
						size="sm"
						color="blue"
					>
						{startCase(audience_id)}
					</Pill>
				))}
				{audience_ids.length === 0 && '-'}
			</section>
		),
	},
	{
		Header   : 'NO. OF QUESTIONS',
		id       : 'no_of_questions',
		accessor : ({ non_case_study_question_count = 0 }) => (
			<section>{non_case_study_question_count}</section>
		),
	},
	{
		Header   : 'NO. OF CASES',
		id       : 'no_of_cases',
		accessor : ({
			case_study_question_count
			= 0,
		}) => (
			<section>{case_study_question_count}</section>
		),
	},
	{
		Header   : 'NO. OF TESTS USING THE SET',
		id       : 'no_of_tests_using_the_set',
		accessor : ({ set_count = 0 }) => (
			<section>{set_count}</section>
		),
	},
	{
		Header   : 'LAST UPDATED',
		id       : 'last_updated',
		accessor : ({ updated_at = '' }) => (
			<section>
				<span className={styles.questionsettime}>
					{format(updated_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'])}
				</span>
				{' '}
				<span className={styles.questionsettime}>
					{format(updated_at, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}
				</span>
			</section>
		),
	},
]);

export default getQuestionSetColumns;
