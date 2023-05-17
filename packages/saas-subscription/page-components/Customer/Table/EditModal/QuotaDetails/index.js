import { cl } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

const DUMMY = [
	{
		key   : 'rate',
		value : 20,
	},
	{
		key   : 'hs Code',
		value : 20,
	},
	{
		key   : 'tracking',
		value : 20,
	},
];

function QuotaDetails({ setEditAddonModal }) {
	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.card_header}`}>
				<div>Products</div>
				<div>Quota</div>
			</div>
			{DUMMY.map((item) => 	(
				<div className={cl`${styles.flex_box} ${styles.quota_row}`}>
					<div>{item?.key}</div>

					<div>
						<span>{item?.value}</span>
						<IcMEdit
							className={styles.edit_icon}
							onClick={() => setEditAddonModal({ info: item, open: true })}
						/>
					</div>
				</div>
			))}

		</div>
	);
}

export default QuotaDetails;
