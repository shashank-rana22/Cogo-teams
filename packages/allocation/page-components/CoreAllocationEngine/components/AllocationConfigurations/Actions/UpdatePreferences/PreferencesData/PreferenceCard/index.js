import { Accordion } from '@cogoport/components';

import ConfigurationCard from './ConfigurationCard';
import styles from './styles.module.css';

function PreferenceCard({ preference = {} }) {
	const { old_allocation_preference = {}, allocation_preference = {} } = preference;

	const { organization = {}, user = {} } = old_allocation_preference || {};

	return (
		<div className={styles.preference_card}>
			<Accordion
				type="text"
				title={(
					<div className={styles.heading}>
						<div className={styles.business_name}>{organization?.business_name}</div>
						<div className={styles.user_name}>{user?.name}</div>
					</div>
				)}
			>
				<div className={styles.content_container}>
					<ConfigurationCard preferenceData={old_allocation_preference?.allocation_configuration} />

					<ConfigurationCard preferenceData={allocation_preference?.allocation_configuration} />
				</div>
			</Accordion>
		</div>
	);
}

export default PreferenceCard;
