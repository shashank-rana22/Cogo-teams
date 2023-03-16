import { Pill } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function EventListItem({ data, index, setEventListData, setToggleEvent }) {
	const {
		id, condition_name:conditionName = '', expertise_type:Type = '',
		description = '',
		rules = [],
	} = data;

	const EXPERTISE_MAPPING = {
		customer_expertise  : 'Customer Expertise',
		trade_expertise     : 'Trade Expertise',
		commodity_expertise : 'Commodity Expertise',
		misc_expertise      : 'Misc Expertise',
	};

	const COMPLETION_MAPPING = {
		completed   : 'Shipment Completion',
		in_progress : 'Shipment Creation',

	};

	const handleEdit = () => {
		setEventListData(data);
		setToggleEvent('updateEvent');
	};

	return (

		<section key={id} className={styles.list_item_container}>
			<div className={styles.top_div}>
				#
				{index + 1}
				<IcMEdit style={{ cursor: 'pointer' }} onClick={handleEdit} />
			</div>
			<div>
				<p className={styles.info_tag}>
					Expertise :
					{' '}
					<b style={{ marginLeft: 4 }}>{EXPERTISE_MAPPING[Type]}</b>
				</p>
				<div className={styles.info_tag}>
					Event Name :
					{' '}
					<h4 style={{ marginLeft: 4 }}>{conditionName}</h4>
				</div>
				<p className={styles.info_tag}>
					Description :
					{' '}
					{description}

				</p>
			</div>

			<div className={styles.rule}>
				<p className={styles.rule_head}>
					Rule
				</p>
				{rules.map((res, i) => (
					<div className={styles.rule_body}>
						<div style={{ marginRight: '4px' }}>
							Rule #
							{i + 1}

						</div>
						<span style={{ marginRight: '4px' }}>
							<Pill
								key="Reactivation"
								size="l"
								color="blue"
							>

								{startCase(res?.name)}

							</Pill>
						</span>
						<div style={{ marginRight: '4px' }}>
							is triggered on
						</div>

						<span style={{ marginRight: '4px' }}>
							<Pill
								key="Shipment_creation"
								size="l"
								color="#FEF3E9"
							>
								{COMPLETION_MAPPING[data?.event_state_on]}
							</Pill>
						</span>

						of
						<div style={{ marginRight: '4px' }} />
						<span style={{ marginRight: '4px' }}>
							<Pill
								key="Account"
								size="l"
								color="#FEF3E9"
							>
								{startCase(res?.rule_type)}
							</Pill>
						</span>
						<span style={{ marginRight: '4px' }}>
							having attribute and last booking date :
						</span>

						{' '}
						<span style={{ marginRight: '4px' }}>
							<Pill
								key="Account"
								size="l"
								color="#FEF3E9"
							>
								{startCase(res?.parameters)}
							</Pill>
						</span>

					</div>

				))}

			</div>

		</section>
	);
}

export default EventListItem;
