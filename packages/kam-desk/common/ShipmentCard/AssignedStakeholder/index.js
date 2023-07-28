import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const KAM_MAPPING = {
	booking_agent             : 'KAM',
	destination_booking_agent : 'DKAM',
	origin_booking_agent      : 'OKAM',
};

const ONE = 1;

function AssignedStakeholder({ data = {} }) {
	const { booking_agents = [] } = data;
	return (booking_agents?.length
		? (
			<div className={styles.container}>

				<div className={styles.stakeholder}>
					{KAM_MAPPING?.[booking_agents?.[GLOBAL_CONSTANTS.zeroth_index]?.stakeholder_type]}
					:
					{' '}
					{startCase(booking_agents?.[GLOBAL_CONSTANTS.zeroth_index]?.name)}
				</div>

				{booking_agents?.length > ONE ? (
					<Tooltip
						interactive
						content={(
							<div className={styles.stakeholder}>
								{KAM_MAPPING?.[booking_agents?.[ONE]?.stakeholder_type]}
								:
								{' '}
								{startCase(booking_agents?.[ONE]?.name)}
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
