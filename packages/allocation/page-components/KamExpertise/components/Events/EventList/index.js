import { Pill } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import Header from './Header';
import styles from './styles.module.css';

function EventListItem() {
	return (
		<>
			<Header />

			<section className={styles.list_item_container}>
				<div className={styles.top_div}>
					<p>#001</p>
					<p>Last Modified : 31/September/2023</p>
					<p>Last Modified By : Ankur Verma</p>
					<IcMEdit />
				</div>
				<div>
					<p className={styles.info_tag}>
						Expertise :
						{' '}
						<b style={{ marginLeft: 4 }}>Customer Expertise</b>
					</p>
					<p className={styles.info_tag}>
						Event Name :
						{' '}
						<b style={{ marginLeft: 4 }}>Re-Activation</b>
					</p>
					<p className={styles.info_tag}>
						Description : Converting a
						churned customer → 4 months no transaction for now.

					</p>
				</div>

				<div className={styles.rule}>
					<p className={styles.rule_head}>
						Rule
					</p>

					<div className={styles.rule_body}>
						{' Rule #001 '}
						<Pill
							key="Reactivation"
							size="l"
							color="blue"
						>
							Reactivation
						</Pill>
						{' is triggered on '}
						<Pill
							key="Shipment_creation"
							size="l"
							color="#FEF3E9"
						>
							Shipment creation
						</Pill>
						{' of '}
						<Pill
							key="Account"
							size="l"
							color="#FEF3E9"
						>
							Account
						</Pill>
						{' having attribute '}
					</div>

					<div className={styles.rule_end}>
						{' last booking date '}
						<Pill
							key="Account"
							size="l"
							color="#FEF3E9"
						>
							Greater than 120 Days
						</Pill>
					</div>

				</div>
			</section>
		</>
	);
}

export default EventListItem;
