import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import EditCancelService from '../../../../EditCancelService';
import Details from '../Details';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function Header({ serviceData = [] }) {
	const { state, display_label, service_provider, payment_term } = serviceData?.[DEFAULT_VALUE] || {};

	const [showDetails, setShowDetails] = useState({});

	let statusText = startCase(state);
	if (state === 'init') {
		statusText = 'Not Allocated';
	}

	return (
		<div className={cl`${styles[state]} ${styles.main_container}`}>
			<div className={cl` ${styles.container}`}>
				<div className={cl`${styles[state]} ${styles.service_details}`}>
					<div className={styles.service_name}>{display_label}</div>
					<div className={styles.service_provider}>{service_provider?.business_name}</div>
				</div>

				<div className={styles.secondary_details}>
					<div>
						{ payment_term ? <div className={styles.payment_term}>{payment_term}</div> : null }
						<div className={styles.state}>{ statusText}</div>
					</div>

					<div className={styles.extra_details}>
						<div
							role="button"
							tabIndex={0}
							onClick={() => setShowDetails({
								...showDetails,
								[serviceData?.[DEFAULT_VALUE]?.display_label]: !showDetails[serviceData?.[DEFAULT_VALUE]?.display_label],
							})}
							className={styles.details_cta}
						>

							{ showDetails[serviceData?.[DEFAULT_VALUE]?.display_label] ? 'Hide Details' : 'View Details'}
						</div>
						<div className={styles.edit_cancel}>
							<EditCancelService serviceData={serviceData?.[DEFAULT_VALUE]} />
						</div>
					</div>
				</div>
			</div>
			{showDetails[serviceData?.[DEFAULT_VALUE]?.display_label] ? <Details serviceData={serviceData} /> : null}
		</div>

	);
}

export default Header;
