import { startCase } from '@cogoport/utils';

import { getEventTitle } from '../../../../utils/getEventTitle';

import styles from './styles.module.css';

function KycEvent({ data = {}, scope = '', name = '', eventName = '' }) {
	const eventTitle = getEventTitle({ name });
	const eventPlatform = startCase(scope);

	const EVENT_INFORMATION_MAPPING = {
		'System: KYC: Requested': {
			title       : `Customer Has Requested for KYC Verification on ${eventPlatform} platform`,
			information : 'Please keep an eye out in the event that the customer\'s KYC is verified or rejected.',
		},
		'System: KYC: Verified': {
			title       : `Customer Is Now KYC Verified on ${eventPlatform} platform`,
			information : `You should send them a message encouraging them to perform a 
			shipment if they are likely to do so.`,
		},
		'System: KYC: Rejected': {
			title       : `Customer's KYC Verification Request Has Been Rejected on ${eventPlatform} platform`,
			information : `Please contact them to understand their issue and help them 
			to get it verified the next time.`,
		},
		'System: KYC: Pending Verification': {
			title       : `Customer KYC Verification Is Still Pending After 3 Days on ${eventPlatform} platform`,
			information : 'Please check why this might be happening and intimate the customer if there are any issues.',
		},
	};

	return (

		(Object.keys(EVENT_INFORMATION_MAPPING) || {}).includes(eventName) ? (
			<>
				<div className={styles.title}>
					{EVENT_INFORMATION_MAPPING[eventName]?.title}
				</div>
				<div className={styles.message}>
					{EVENT_INFORMATION_MAPPING[eventName]?.information}
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
