import { Checkbox } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Card({ item, checkedItems, handleCheck }) {
	return (
		<div className={styles.container} key={item.id}>
			<Checkbox
				className={styles.checkbox}
				value={item.id}
				checked={checkedItems.some((checkedItem) => checkedItem.id === item.id)}
				onChange={handleCheck}
			/>
			<div className={styles.basic_details}>
				<div className={styles.org_name}>Zetwerk International Manufacturing Businesses Private Limited</div>
				<div className={styles.tags}>
					<div className={styles.primary_tag}>10 Port Pairs : 4 Requested for Approval</div>
					<div className={styles.primary_tag}>SME</div>
					<div className={styles.primary_tag}>Last Shipment : 1 Month Ago</div>
				</div>
				<div className={styles.rest_tags}>
					<div className={styles.secondary_tag}>
						<IcMProfile />
						Kam Name
					</div>
					<div className={styles.secondary_tag}>Requested on : 20 Mar 2023</div>
					<div className={styles.secondary_tag}>RFQ ID : 1124</div>
				</div>

			</div>
			<div className={styles.revenue_details}>s</div>
		</div>
	);
}

export default Card;
