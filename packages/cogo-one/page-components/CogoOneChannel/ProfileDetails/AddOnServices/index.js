import { cl } from '@cogoport/components';
import { useState } from 'react';

import { ADD_ON_SERVICES_TAB_MAPPING } from '../../../../constants/addOnServices';

import ManageSubscriptions from './ManageSubscriptions';
import styles from './styles.module.css';

const ADD_ON_SERVICES_COMPONENT_MAPPING = {
	manage_subscriptions: ManageSubscriptions,
};

function AddOnServices(props) {
	const { orgId = '' } = props || {};

	const [selectedService, setSelectedService] = useState('manage_subscriptions');

	const handleTabChange = ({ item = {} }) => {
		const { is_enabled: isEnabled, key = '' } = item || {};

		if (!isEnabled) {
			return null;
		}

		return setSelectedService(key);
	};

	const Component = ADD_ON_SERVICES_COMPONENT_MAPPING[selectedService] || null;

	return (
		<div key={orgId}>
			<div className={styles.main_container}>
				<div className={styles.heading}>Additional Services</div>
				<div className={styles.tabs_container}>
					{(ADD_ON_SERVICES_TAB_MAPPING || []).map((item) => {
						const {
							is_enabled: isEnabled = false, label = '',
							icon: ServiceIcon = '', key = '',
						} = item || {};

						const isActiveCard = selectedService === key;

						return (
							<div
								role="presentation"
								key={key}
								onClick={() => handleTabChange({ item })}
								className={cl`${styles.card} ${!isEnabled ? styles.disabled_card : ''}`}
							>
								{ServiceIcon ? <ServiceIcon width={25} height={25} /> : null}

								<div className={cl`${styles.service_name_label}
							${isActiveCard ? styles.active_label : ''}`}
								>
									{label}
								</div>
							</div>
						);
					})}
				</div>

				{Component && (
					<Component
						{...props}
						key={selectedService}
					/>
				)}
			</div>
		</div>
	);
}

export default AddOnServices;
