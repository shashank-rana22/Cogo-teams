import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import roleBasedView from '@cogoport/surface-modules/components/Poc/config/role_base_view.json';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EditCancelService from '../../../../EditCancelService';
import Details from '../Details';

import styles from './styles.module.css';

function Header({ serviceData = [], activeStakeholder = '' }) {
	const [showDetails, setShowDetails] = useState(true);

	const { state, shipment_type, service_provider, payment_term } = serviceData?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const rolesPermission = roleBasedView[activeStakeholder] || {};
	const rolesViewPermission = rolesPermission?.can_view || [];

	let statusText = startCase(state);
	if (state === 'init') {
		statusText = 'Not Allocated';
	}

	return (
		<div className={cl`${styles[state]} ${styles.main_container}`}>
			<div className={cl` ${styles.container}`}>

				<div className={cl`${styles[state]} ${styles.service_details}`}>
					<div className={styles.service_name}>{startCase(shipment_type)}</div>
					{rolesViewPermission?.includes('service_provider') ? (
						<div className={styles.service_provider}>
							{': '}
							{service_provider?.business_name}
						</div>
					) : null}
				</div>

				<div className={styles.secondary_details}>
					<div>
						{ payment_term ? <div className={styles.payment_term}>{payment_term}</div> : null }
						<div className={styles.state}>{statusText}</div>
					</div>

					<div className={styles.extra_details}>
						<div
							role="button"
							tabIndex={0}
							onClick={() => setShowDetails(!showDetails)}
							className={styles.details_cta}
						>
							{ showDetails ? 'Hide Details' : 'View Details'}
						</div>

						<div className={styles.edit_cancel}>
							<EditCancelService serviceData={serviceData?.[GLOBAL_CONSTANTS.zeroth_index]} />
						</div>
					</div>
				</div>
			</div>
			{showDetails ? <Details serviceData={serviceData} /> : null}
		</div>

	);
}

export default Header;
