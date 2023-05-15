import { cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import listConfig from '../../../configuration/listConfig';

import itemFunction from './ItemFunctions';
import styles from './styles.module.css';

const list = [
	{
		id              : '1',
		organization_id : '7746391b-09f1-449d-a389-8108d73269d4',
		organization    : {
			serial_id     : '26645',
			business_name : 'MANAN  MOTA',

		},
		active_subscription: {
			start_date : '2022-12-28T08:43:44.000Z',
			end_date   : '2023-01-28T08:43:44.000Z',
			status     : 'active',
			plan       : {
				id           : '901f2d64-ca58-457b-a3c6-d772d6c08ac5',
				plan_name    : 'starter-pack',
				display_name : 'Starter Pack',
				is_free_plan : true,
			},
		},
	},
];

function Table() {
	const functions = itemFunction({});

	return (
		<div className={styles.container}>
			<div className={cl`${styles.row} ${styles.card_header}`}>
				{listConfig.map((config) => (
					<div className={styles.col} style={{ width: config?.width }}>
						{config.title}
					</div>
				))}
			</div>
			{(list || []).map((item) => (
				<div className={cl`${styles.row} ${styles.item_row}`}>
					{listConfig.map((config) => (
						<div
							className={styles.col}
							style={{ width: config?.width }}
						>
							{functions?.[config?.renderFunc](item)}

						</div>
					))}
				</div>
			))}

		</div>
	);
}

export default Table;
