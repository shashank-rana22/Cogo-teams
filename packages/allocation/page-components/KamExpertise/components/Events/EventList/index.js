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
		<section key={id} className={styles.list_item_container}>
			<div className={styles.top_div}>
				#
				{index + 1}
				<IcMEdit />
				{/* <div className={styles.left_id} /> */}
				{/* <div className={styles.top_right_div}>
					<p>Last Modified : 31/September/2023</p>
					<p>Last Modified By : Ankur Verma</p>
				</div> */}
			</div>
			<div>
				<div className={styles.info_tag}>
					Expertise :
					{' '}
					<h4 style={{ marginLeft: 4 }}>{Type}</h4>
				</div>
				<div className={styles.info_tag}>
					Event Name :
					{' '}
					<h4 style={{ marginLeft: 4 }}>{conditionName}</h4>
				</div>
				<div className={styles.info_tag}>
					Description :
					{' '}
					{description}

				</div>
			</div>

			<div className={styles.rule}>
				<div className={styles.rule_head}>
					Rule
				</div>
				{rules.map((res, i) => {
					console.log('res::', res);
					return (
						<div className={styles.rule_body}>
							<div>
								Rule #
								{i + 1}
							</div>
							<div>
								<Pill
									key="Reactivation"
									size="l"
									color="blue"
								>
									{res?.name}
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
									{res?.rule_type}
								</Pill>

							</div>
							<div>having attribute</div>
						</div>
					);
				})}

				<div className={styles.rule_end}>
					<div>last booking date</div>
					<div>
						<Pill
							key="Account"
							size="l"
							color="#FEF3E9"
						>
							{params}
						</Pill>

					</div>

				</div>

			</div>
		</section>
	);
}

export default EventListItem;
