import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

const KAM_MAPPING = {
	booking_agent             : 'KAM',
	destination_booking_agent : 'DKAM',
	origin_booking_agent      : 'OKAM',
};

function AssignedStakeholder({ data = {} }) {
	const { booking_agents = [] } = data;
	return (booking_agents?.length
		? (
			<div className={styles.container}>

				<div className={styles.stakeholder}>
					{KAM_MAPPING?.[booking_agents?.[0]?.stakeholder_type]}
					:&nbsp;
					{booking_agents?.[0]?.name}
				</div>

				{booking_agents?.length > 1 ? (
					<Tooltip
						interactive
						content={(
							<div className={styles.stakeholder}>
								{KAM_MAPPING?.[booking_agents?.[1]?.stakeholder_type]}
								:&nbsp;
								{booking_agents?.[1]?.name}
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
