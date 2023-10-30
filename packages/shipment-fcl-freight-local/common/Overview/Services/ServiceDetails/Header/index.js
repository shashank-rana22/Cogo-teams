import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import roleBasedView from '@cogoport/ocean-modules/components/Poc/config/role_base_view.json';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EditCancelService from '../../../../EditCancelService';
import Details from '../Details';

import styles from './styles.module.css';

function Header({ serviceData = [], activeStakeholder = '' }) {
	const { state, display_label, service_provider, payment_term } = serviceData?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const [showDetails, setShowDetails] = useState({});

	let statusText = startCase(state);
	if (state === 'init') {
		statusText = 'Not Allocated';
	}

	const rolesPermission = roleBasedView[activeStakeholder] || {};
	const rolesViewPermission = rolesPermission?.can_view || [];

	return (
		<div className={cl`${styles[state]} ${styles.main_container}`}>
			<div className={cl` ${styles.container}`}>
				<div className={cl`${styles[state]} ${styles.service_details}`}>
					<div className={styles.service_name}>{display_label}</div>
					{
						rolesViewPermission?.includes('service_provider') ? (
							<div className={styles.service_provider}>{service_provider?.business_name}</div>
						) : null
					}
				</div>

				<div className={styles.secondary_details}>
					<div>
						{ payment_term ? <div className={styles.payment_term}>{payment_term}</div> : null }
						<div className={styles.state}>{ statusText}</div>
					</div>

					<div className={styles.extra_details}>
						<div
							role="button"
							tabIndex={GLOBAL_CONSTANTS.zeroth_index}
							onClick={() => setShowDetails({
								...showDetails,
								[serviceData?.[GLOBAL_CONSTANTS.zeroth_index]?.display_label]:
									!showDetails[serviceData?.[GLOBAL_CONSTANTS.zeroth_index]?.display_label],
							})}
							className={styles.details_cta}
						>

							{ showDetails[serviceData?.[GLOBAL_CONSTANTS.zeroth_index]?.display_label]
								? 'Hide Details'
								: 'View Details'}
						</div>
						<div className={styles.edit_cancel}>
							<EditCancelService serviceData={serviceData?.[GLOBAL_CONSTANTS.zeroth_index]} />
						</div>
					</div>
				</div>
			</div>
			{showDetails[serviceData?.[GLOBAL_CONSTANTS.zeroth_index]?.display_label]
				? <Details serviceData={serviceData} />
				: null}
		</div>

	);
}

export default Header;
