import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

const meetingColumns = [
	{
		Header   : 'User Name',
		id       : 'user_name',
		accessor : (item) => <div className={styles.title}>{item?.user?.name || '-'}</div>,
	},
	{
		Header : 'User Number',
		id     : 'user_number',
		func   : (item) => <div className={styles.title}>{item?.user?.number || '-'}</div>,
	},
	{
		Header   : 'Agent Name',
		id       : 'agent_name',
		accessor : (item) => <div className={styles.title}>{item?.agent?.name || '-'}</div>,
	},
	{
		Header   : 'Title',
		id       : 'title',
		accessor : (item) => (
			<div>
				{item?.title || '-'}
			</div>
		),
	},
	{
		Header   : 'Communication Type',
		id       : 'communication_type',
		accessor : (item) => (
			<div>{item?.communication_type || '-'}</div>
		),
	},
	{
		Header   : 'Summary',
		id       : 'communication_summary',
		accessor : (item) => (
			<div>{item?.communication_summary || '-'}</div>
		),
	},
	{
		Header   : 'Date',
		id       : 'created_at',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.created_at,
					formatType : 'date',
					dateFormat:
                    GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				})}
			</div>
		),
	},
];

export default meetingColumns;
