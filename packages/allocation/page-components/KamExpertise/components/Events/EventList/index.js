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
					<div className={styles.left_id}>
						#001
					</div>
					<div className={styles.top_right_div}>

						<p>Last Modified : 31/September/2023</p>
						<p>Last Modified By : Ankur Verma</p>
						<IcMEdit />
					</div>
				</div>
				<div>
					<div className={styles.info_tag}>
						Expertise :
						{' '}
						<h4>Customer Expertise</h4>
					</div>
					<div className={styles.info_tag}>
						Event Name :
						{' '}
						<h4>Re-Activation</h4>
					</div>
					<div className={styles.info_tag}>
						Description : Converting a
						churned customer → 4 months no transaction for now.

					</div>
				</div>

				<div className={styles.rule}>
					<div className={styles.rule_head}>
						Rule
					</div>

					<div className={styles.rule_body}>
						<div>Rule #001</div>
						<div>
							<Pill
								key="Reactivation"
								size="l"
								color="blue"
							>
								Reactivation
							</Pill>

						</div>
						<div>is triggered on</div>
						<div>
							{' '}
							<Pill
								key="Shipment_creation"
								size="l"
								color="#FEF3E9"
							>
								Shipment creation
							</Pill>

						</div>
						<div>of</div>
						<div>
							<Pill
								key="Account"
								size="l"
								color="#FEF3E9"
							>
								Account
							</Pill>

						</div>
						<div>having attribute</div>
					</div>

					<div className={styles.rule_end}>
						<div>last booking date</div>
						<div>
							<Pill
								key="Account"
								size="l"
								color="#FEF3E9"
							>
								Greater than 120 Days
							</Pill>

						</div>

					</div>

				</div>
			</section>
		</>
	);
}

export default EventListItem;
