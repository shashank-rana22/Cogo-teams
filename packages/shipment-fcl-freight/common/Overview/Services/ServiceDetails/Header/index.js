import { cl, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useState, useContext } from 'react';

import EditCancelService from '../../../../EditCancelService';
import Details from '../Details';

import styles from './styles.module.css';

function Header({ serviceData = [], containerDetails = [] }) {
	const { stakeholderConfig } = useContext(ShipmentDetailContext);

	const can_edit_cancel_service = !!stakeholderConfig?.overview?.can_edit_cancel_service;

	const SERVICE_DATA_FIRST = serviceData?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { state, display_label, service_provider, payment_term } = SERVICE_DATA_FIRST;

	const [showDetails, setShowDetails] = useState({});

	const statusText = state === 'init' ? 'Not Allocated' : startCase(state);

	return (
		<header className={cl`${styles[state]} ${styles.main_container}`}>
			<section className={cl` ${styles.container}`}>
				<div className={cl`${styles[state]} ${styles.service_details}`}>
					<span className={styles.service_name}>
						{display_label}
					</span>
					{': '}
					<span className={styles.service_provider}>
						{service_provider?.business_name}
					</span>
				</div>

				<div className={styles.secondary_details}>
					<div>
						{payment_term
							? (
								<span className={styles.payment_term}>
									{payment_term}
								</span>
							)
							: null}

						<span className={styles.state}>{statusText}</span>
					</div>

					<div className={styles.extra_details}>
						<Button
							themeType="secondary"
							onClick={() => setShowDetails({
								...showDetails,
								[SERVICE_DATA_FIRST.display_label]: !showDetails[SERVICE_DATA_FIRST.display_label],
							})}
							className={styles.details_cta}
						>
							{showDetails[SERVICE_DATA_FIRST.display_label] ? 'Hide Details' : 'View Details'}
						</Button>
						{can_edit_cancel_service ? (
							<div className={styles.edit_cancel}>
								<EditCancelService serviceData={SERVICE_DATA_FIRST} />
							</div>
						) : null }
					</div>
				</div>
			</section>

			{showDetails[SERVICE_DATA_FIRST.display_label]
				? <Details serviceData={serviceData} containerDetails={containerDetails} />
				: null}
		</header>

	);
}

export default Header;
