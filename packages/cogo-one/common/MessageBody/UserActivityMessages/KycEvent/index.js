import { startCase } from '@cogoport/utils';

import kycEventInformation from '../../../../configurations/kyc-event-information';
import { getEventTitle } from '../../../../utils/getEventTitle';

import styles from './styles.module.css';

function KycEvent({ data = {}, scope = '', name = '', eventName = '' }) {
	const eventTitle = getEventTitle({ name });
	const eventPlatform = startCase(scope);
	const eventInformationMapping = kycEventInformation({ eventPlatform });

	return (
		(Object.keys(eventInformationMapping)).includes(eventName) ? (
			<>
				<div className={styles.title}>
					{eventInformationMapping[eventName]?.title}
				</div>
				<div className={styles.message}>
					{eventInformationMapping[eventName]?.information}
				</div>
			</>
		) : (
			<>
				<div className={styles.title}>
					{`${startCase(eventTitle)} on ${startCase(scope)} platform`}
				</div>
				<div className={styles.message}>
					{startCase(data?.error)}
				</div>
				<div className={styles.message}>
					Information on user KYC verification is provided here.
				</div>
			</>
		)
	);
}

export default KycEvent;
