import { Button, cl } from '@cogoport/components';
import ShipmentDetailContext from '@cogoport/context/page-components/ShipmentDetailContext';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useContext } from 'react';

import EditCancelService from '../../../../page-components/EditCancelService';

import styles from './styles.module.css';

function Header({ serviceData = [], showDetails = false, setShowDetails = () => {} }) {
	const service = serviceData?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { stakeholderConfig } = useContext(ShipmentDetailContext);

	const rolesPermission = stakeholderConfig?.pocs || {};

	const rolesViewPermission = rolesPermission?.can_view || [];

	const { state, display_label, service_provider, payment_term } = service || {};

	const statusText = state === 'init' ? 'Not Allocated' : startCase(state);

	return (
		<div className={styles.container}>
			<div className={cl`${styles[state]} ${styles.service_details}`}>
				<div className={styles.service_name}>{display_label}</div>
				{rolesViewPermission?.includes('service_provider') ? (
					<div className={styles.service_provider}>
						{': '}
						{service_provider?.business_name}
					</div>
				) : null}
			</div>

			<div className={styles.secondary_details}>
				<div>
					{payment_term ? <div className={styles.payment_term}>{payment_term}</div> : null}

					<div className={styles.state}>{statusText}</div>
				</div>

				<div className={styles.extra_details}>
					<Button
						className={styles.details_cta}
						themeType="secondary"
						onClick={() => setShowDetails(!showDetails)}
					>
						{showDetails ? 'Hide Details' : 'View Details'}
					</Button>

					<div className={styles.edit_cancel}>
						<EditCancelService serviceData={service} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
