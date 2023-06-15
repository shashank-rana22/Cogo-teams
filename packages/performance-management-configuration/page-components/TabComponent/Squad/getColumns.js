import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({ setShowDeleteModal }) => [
	{
		Header   : 'SQUAD NAME',
		accessor : (item) => <div>{item?.squad_name || '-'}</div>,
	},
	{
		Header   : 'SQUAD LEADER',
		accessor : (item) => <div>{item?.squad_leader || '-'}</div>,
	},
	{
		Header   : 'EMPLOYEES',
		accessor : (item) => <div>{item?.name || '-'}</div>,
	},
	{
		Header   : 'LAST UPDATED AT',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.updated_at,
					formatType : 'date',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				})}
			</div>
		),
	},
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<div
				className={styles.status}
				style={{ background: item?.status === 'inactive' ? '#f8aea8' : '' }}
			>
				{startCase(item?.status) || '-'}
			</div>
		),
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (
			<div>
				<IcMDelete
					width={16}
					height={16}
					style={{ cursor: 'pointer' }}
					onClick={() => setShowDeleteModal(item.id)}
				/>
				<IcMEdit
					width={16}
					height={16}
					style={{ marginLeft: 12, cursor: 'pointer' }}
				/>
			</div>
		),
	},
];

export default getColumns;
