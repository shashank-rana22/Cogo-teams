import { Button, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import EditCancelService from '../../../../EditCancelService';

import styles from './styles.module.css';

function Header({ serviceData = [], showDetails = false, setShowDetails = () => {} }) {
	const service = serviceData?.[0] || {};
	const { state, display_label, display_service_type, service_provider, payment_term } = service || {};

	const statusText = state === 'init' ? 'Not Allocated' : startCase(state);

	const heading = display_service_type === 'trailer_freight_service'
		? 'Haulage Freight (Trailer)'
		: display_label;

	return (
		<div className={styles.container}>
			<div className={cl`${styles[state]} ${styles.service_details}`}>
				<div className={styles.service_name}>{heading}</div>

				<div className={styles.service_provider}>{service_provider?.business_name}</div>
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
