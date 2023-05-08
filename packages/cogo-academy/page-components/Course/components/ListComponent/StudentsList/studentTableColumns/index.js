import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { format } from '@cogoport/utils';

import SortComponent from '../../../../../AdminResults/commons/SortComponent';

import { StudentListButtons } from './ButtonComponent';
import styles from './styles.module.css';

export const studentListColumns = ({ router, setShowModal, setStudentId, sortFilter, setSortFilter }) => [
	{
		Header   : 'NAME',
		id       : 'name',
		accessor : () => (
			<div />
		),
	},
	{
		Header   : 'SOURCE',
		id       : 'source',
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
		Header   : 'MANDATORY COURSES (Opened/Total)',
		id       : 'mandatory_courses',
		accessor : () => (
			<section />
		),
	},
	{
		Header   : 'OTHER COURSES (Opened/Total)',
		id       : 'other_courses',
		accessor : () => (
			<section />
		),
	},
	{
		Header   : 'COURSES COMPLETION %',
		id       : 'courses_completion',
		accessor : () => (
			<section />
		),
	},
	{
		Header: (
			<div className={styles.container}>
				<div className={styles.item}>JOINED COGOACADEMY</div>

				<SortComponent
					value="created_at"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		),
		id       : 'joined_by',
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
				setStudentId={setStudentId}
				setShowModal={setShowModal}
			/>
		),

	},
];
