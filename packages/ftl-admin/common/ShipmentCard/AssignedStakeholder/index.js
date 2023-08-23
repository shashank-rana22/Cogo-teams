import { Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const KAM_MAPPING = {
	booking_agent             : 'KAM',
	destination_booking_agent : 'DKAM',
	origin_booking_agent      : 'OKAM',
};

function AssignedStakeholder({ data = {} }) {
	const { booking_agents = [], booking_agent = {} } = data || {};

	if (!isEmpty(booking_agent)) {
		return (
			<div className={styles.stakeholder}>
				{KAM_MAPPING.booking_agent}
				:
				{' '}
				{booking_agent?.name}
			</div>
		);
	}
	if (!booking_agents?.length) { return null; }
	const [firstBookingAgent = {}, secondBookingAgent = {}] = booking_agents;
	return (booking_agents?.length
		? (
			<div className={styles.container}>

				<div className={styles.stakeholder}>
					{KAM_MAPPING?.[firstBookingAgent?.stakeholder_type]}
					:
					{' '}
					{firstBookingAgent?.name}
				</div>

				{secondBookingAgent ? (
					<Tooltip
						interactive
						content={(
							<div className={styles.stakeholder}>
								{KAM_MAPPING?.[secondBookingAgent?.stakeholder_type]}
								:
								{' '}
								{secondBookingAgent?.name}
							</div>
						)}
						placement="bottom"
						caret={false}
					>
						<div className={styles.additional_stakeholder}> +1 more</div>
					</Tooltip>
				) : null}
			</div>
		) : null
	);
}

export default AssignedStakeholder;
