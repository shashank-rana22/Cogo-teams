import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { format } from '@cogoport/utils';

import SortComponent from '../../../../../AdminResults/commons/SortComponent';

import { StudentListButtons } from './ButtonComponent';
import styles from './styles.module.css';

export const courseListColumns = ({ loading, router, setShowModal, setQuestionSetId, sortFilter, setSortFilter }) => [
	{
		Header   : 'STATUS',
		id       : 'status',
		accessor : () => (
			<div />
		),
	},
	{
		Header   : 'NAME OF THE COURSE',
		id       : 'name',
		accessor : () => (
			<section />
		),
	},
	{
		Header   : 'AUDIENCE',
		id       : 'audience',
		accessor : () => (
			<section />
		),
	},
	{
		Header   : 'TOPICS (+TAGS)',
		id       : 'topics',
		accessor : () => (
			<section />
		),
	},
	{
		Header   : 'COMPLETION CRITERIA',
		id       : 'completion_criteria',
		accessor : () => (
			<section />
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>DATE CREATED</div>

				<SortComponent
					value="created_at"
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
			<StudentListButtons
				item={item}
				router={router}
				setQuestionSetId={setQuestionSetId}
				setShowModal={setShowModal}
				loading={loading}
			/>
		),

	},
];
