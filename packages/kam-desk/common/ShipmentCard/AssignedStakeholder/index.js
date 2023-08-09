import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const KAM_MAPPING = {
	booking_agent             : 'KAM',
	destination_booking_agent : 'DKAM',
	origin_booking_agent      : 'OKAM',
};

function AssignedStakeholder({ data = {} }) {
	const { booking_agents = [] } = data;

	const [firstBookingAgent, secondBookingAgent] = booking_agents || [];

	return (firstBookingAgent
		? (
			<div className={styles.container}>

				<div className={styles.stakeholder}>
					{KAM_MAPPING?.[firstBookingAgent?.stakeholder_type]}
					:
					{' '}
					{startCase(firstBookingAgent?.name)}
				</div>

				{secondBookingAgent ? (
					<Tooltip
						interactive
						content={(
							<div className={styles.stakeholder}>
								{KAM_MAPPING?.[secondBookingAgent?.stakeholder_type]}
								:
								{' '}
								{startCase(secondBookingAgent?.name)}
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
