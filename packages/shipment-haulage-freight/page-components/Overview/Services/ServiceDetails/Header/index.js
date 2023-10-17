import { Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import roleBasedView from '@cogoport/surface-modules/components/Poc/config/role_base_view.json';
import { startCase } from '@cogoport/utils';

import EditCancelService from '../../../../EditCancelService';

import styles from './styles.module.css';

function Header({ serviceData = [], showDetails = false, setShowDetails = () => {}, activeStakeholder = '' }) {
	const service = serviceData?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { state, display_label, display_service_type, service_provider, payment_term } = service || {};

	const statusText = state === 'init' ? 'Not Allocated' : startCase(state);

	const heading = display_service_type === 'trailer_freight_service'
		? 'Haulage Freight (Trailer)'
		: display_label;

	const rolesPermission = roleBasedView[activeStakeholder] || {};
	const rolesViewPermission = rolesPermission?.can_view || [];

	return (
		<div className={styles.container}>
			<div className={cl`${styles[state]} ${styles.service_details}`}>
				<div className={styles.service_name}>{heading}</div>
				{
					rolesViewPermission?.includes('service_provider') ? (
						<div className={styles.service_provider}>{service_provider?.business_name}</div>
					) : null
				}
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
