import { Pill } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const COMPLETION_MAPPING = {
	completed   : 'Shipment Completion',
	in_progress : 'Shipment Creation',

};

function EventListItem({ data, index, setEventListData, setToggleEvent }) {
	const {
		condition_name: conditionName = '',
		expertise_type: expertiseType = '',
		description = '',
		rules = [],
	} = data || {};

	const handleEdit = () => {
		setEventListData(data);
		setToggleEvent('updateEvent');
	};

	return (
		<section className={styles.container}>
			<div className={styles.top_div}>
				#
				{index + 1}
				<IcMEdit style={{ cursor: 'pointer' }} onClick={handleEdit} />
			</div>

			<div>
				<p className={styles.info_tag}>
					Expertise :
					{' '}
					<b style={{ marginLeft: 4 }}>{startCase(expertiseType || '')}</b>
				</p>
				<p className={styles.info_tag}>
					Event Name :
					{' '}
					<b style={{ marginLeft: 4 }}>{conditionName}</b>
				</p>
				<p className={styles.info_tag}>
					Description :
					{' '}
					<i style={{ marginLeft: 4 }}>{description}</i>
				</p>
			</div>

			<div>
				<div className={styles.rule_head}>
					Rule
				</div>

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
								{startCase(res.name || '')}
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
								{COMPLETION_MAPPING[data.event_state_on || '']}
							</Pill>
						</span>

						having attribute

						<span style={{ marginRight: '4px' }}>
							<Pill
								key="Account"
								size="l"
								color="#FEF3E9"
							>
								{startCase(res.rule_type || '')}
							</Pill>
						</span>

						<span style={{ marginRight: '4px' }}>
							and parameter of:
						</span>

						{' '}
						<span style={{ marginRight: '4px' }}>
							<Pill
								key="Account"
								size="l"
								color="#FEF3E9"
							>
								{startCase(res.parameters || '')}
							</Pill>
						</span>
					</div>
				))}
			</div>

		</section>
	);
}

export default EventListItem;
