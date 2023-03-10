import { Pill } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EventListItem({ data, index }) {
	const {
		id, condition_name:conditionName = '', expertise_type:Type = '', description = '', rules = [],
		params = '',
	} = data;
	console.log('data', data);
	return (
		<>

			<section key={id} className={styles.list_item_container}>
				<div className={styles.top_div}>
					
						
				#
				{index + 1}
				<IcMEdit />
				</div>
				<div>
					<p className={styles.info_tag}>
						Expertise :
						{' '}
						<b style={{ marginLeft: 4 }}>Customer Expertise</b>
					</p>
					<div className={styles.info_tag}>
						Event Name :
						{' '}
						<h4 style={{ marginLeft: 4 }}>Re-Activation</h4>
					</div>
					<p className={styles.info_tag}>
						Description : Converting a
						churned customer → 4 months no transaction for now.

					</p>
				</div>

				<div className={styles.rule}>
					<p className={styles.rule_head}>
						Rule
					</p>
					{rules.map((res, i) => {
					console.log('res::', res) 
				return (
					<div className={styles.rule_body}>
					Rule #
								{i + 1}
						<Pill
							key="Reactivation"
							size="l"
							color="blue"
						>
							Reactivation
						</Pill>

					
					is triggered on
						<Pill
							key="Shipment_creation"
							size="l"
							color="#FEF3E9"
						>
							Shipment creation
						</Pill>

					of
						<Pill
							key="Account"
							size="l"
							color="#FEF3E9"
						>
							Account
						</Pill>

					having attribute
				</div>
				)}
					

				<div className={styles.rule_end}>
					{' last booking date '}
					
						<Pill
							key="Account"
							size="l"
							color="#FEF3E9"
						>
							{params}
						</Pill>


				</div>

			</div>
		</section>
	);
}

export default EventListItem;
