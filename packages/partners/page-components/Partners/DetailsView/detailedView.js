import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function DetailedView({ clickedItem = {} }) {
	return (

		<div>
			<div className={styles.details_row}>
				<div className={styles.details_label}>Business Name</div>
				<div className={styles.details_value}>{clickedItem?.business_name}</div>
			</div>
			<div className={styles.details_row}>
				<div className={styles.details_label}>Registration Number</div>
				<div className={styles.details_value}>{clickedItem?.registration_number}</div>
			</div>
			<div className={styles.details_row}>
				<div className={styles.details_label}>Country</div>
				<div className={styles.details_value}>{clickedItem?.country?.name}</div>
			</div>
			<div className={styles.details_row}>
				<div className={styles.details_label}>Status</div>

				<div className={styles.details_value}>
					<Pill color={clickedItem.status === 'active' ? 'rgb(205, 247, 212)' : 'rgb(247, 205, 205)'}>
						{clickedItem?.status}

					</Pill>

				</div>

			</div>
			<div className={styles.details_row}>
				<div className={styles.details_label}>Serial id</div>
				<div className={styles.details_value}>{clickedItem?.serial_id}</div>
			</div>
			<div className={styles.details_row}>
				<div className={styles.details_label}>Created at</div>
				<div className={styles.details_value}>{clickedItem?.created_at}</div>
			</div>
			<div className={styles.details_row}>
				<div className={styles.details_label}>Entity Type</div>
				<div className={styles.details_value}>
					{clickedItem?.entity_types?.[GLOBAL_CONSTANTS.zeroth_index]}
				</div>
			</div>
			<div className={styles.details_row}>
				<div className={styles.details_label}>Roles</div>
				<div className={styles.details_value}>
					{clickedItem?.roles_data?.map(
						(role) => (<div className={styles.details_role} key={role}>{role.name}</div>),
					)}
				</div>
			</div>
		</div>

	);
}
export default DetailedView;
