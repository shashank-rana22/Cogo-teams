import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({ handleEditKRA }) => [
	{
		Header   : 'KRA NAME',
		accessor : (item) => (
			<div>
				{startCase(item?.kra_name) || '-'}
			</div>
		),
	},
	{
		Header   : 'KRA DESCRIPTION',
		accessor : (item) => (
			<div>
				{startCase(item?.kra_description) || '-'}
			</div>
		),
	},
	{
		Header   : 'OPERATION KEY',
		accessor : (item) => (
			<div>
				{startCase(item?.operation_key) || '-'}
			</div>
		),
	},
	{
		Header   : 'ACTIONS',
		accessor : (item) => (
			<div className={styles.button_wrapper}>
				<div className={styles.edit_wrapper}>
					<IcMEdit
						height={16}
						width={16}
						onClick={() => handleEditKRA(item?.id)}
					/>
				</div>

				<IcMDelete
					height={16}
					width={16}
				/>
			</div>

		),
	},
];

export default getColumns;
