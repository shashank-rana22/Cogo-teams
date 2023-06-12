import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EditCancelService from '../../../../EditCancelService';
import Details from '../Details';

import styles from './styles.module.css';

const SERVICE_DATA_FIRST_INDEX = 0;

function Header({ serviceData = [] }) {
	const SERVICE_DATA_FIRST = serviceData?.[SERVICE_DATA_FIRST_INDEX] || {};

	const { state, display_label, service_provider, payment_term } = SERVICE_DATA_FIRST;

	const [showDetails, setShowDetails] = useState({});

	const statusText = state === 'init' ? 'Not Allocated' : startCase(state);

	return (
		<div className={cl`${styles[state]} ${styles.main_container}`}>
			<div className={cl` ${styles.container}`}>
				<div className={cl`${styles[state]} ${styles.service_details}`}>
					<div className={styles.service_name}>{display_label}</div>
					<div className={styles.service_provider}>{service_provider?.business_name}</div>
				</div>

				<div className={styles.secondary_details}>
					<div>
						{payment_term
							? <div className={styles.payment_term}>{payment_term}</div>
							: null }

						<div className={styles.state}>{statusText}</div>
					</div>

					<div className={styles.extra_details}>
						<div
							role="button"
							tabIndex={0}
							onClick={() => setShowDetails({
								...showDetails,
								[SERVICE_DATA_FIRST.display_label]: !showDetails[SERVICE_DATA_FIRST.display_label],
							})}
							className={styles.details_cta}
						>
							{ showDetails[SERVICE_DATA_FIRST.display_label] ? 'Hide Details' : 'View Details'}
						</div>
						<div className={styles.edit_cancel}>
							<EditCancelService serviceData={SERVICE_DATA_FIRST} />
						</div>
					</div>
				</div>
			</div>

			{showDetails[SERVICE_DATA_FIRST.display_label]
				? <Details serviceData={serviceData} />
				: null}
		</div>

	);
}

export default Header;
