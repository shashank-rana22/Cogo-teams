import { Pill } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function EventListItem({ data, index, setEventListData, setToggleEvent }) {
	const {
		id, condition_name:conditionName = '', expertise_type:Type = '',
		description = '',
		rules = [],
		params = '',
	} = data;

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
					<b style={{ marginLeft: 4 }}>{Type}</b>
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
						<div style={{ display: 'flex' }}>
							Rule #
							{i + 1}

						</div>
						<span style={{ display: 'flex' }}>
							<Pill
								key="Reactivation"
								size="l"
								color="blue"
							>

								{startCase(res?.name)}

							</Pill>
						</span>
						<div style={{ display: 'flex' }}>
							is triggered on
						</div>

						<span style={{ display: 'flex' }}>
							<Pill
								key="Shipment_creation"
								size="l"
								color="#FEF3E9"
							>
								{COMPLETION_MAPPING[data?.event_state_on]}
							</Pill>
						</span>

						of
						<span style={{ display: 'flex' }}>
							<Pill
								key="Account"
								size="l"
								color="#FEF3E9"
							>
								{startCase(res?.rule_type)}
							</Pill>
						</span>
						<span style={{ display: 'flex' }}>
							having attribute and last booking date :
						</span>

						{' '}
						<span style={{ display: 'flex' }}>
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
