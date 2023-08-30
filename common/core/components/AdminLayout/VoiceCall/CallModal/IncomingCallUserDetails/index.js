import useGetLastVoiceCallDetails from '../../hooks/useGetLastVoiceCallDetails';

import styles from './styles.module.css';

function IncomingCallUserDetails() {
	const userData = {
		lead_organization_id : undefined,
		lead_user_id         : '',
		mobile_number        : '7506434666',
		organization_id      : 'd27b7345-96d0-46fe-a34b-b0e6f6e6110a',
		userName             : 'Param Shah',
		user_id              : 'a5144bdd-88f3-4b7c-8e77-0077f3ebbe97',
	};
	const { userLastCallLoading = false, userLastCallDetails } = useGetLastVoiceCallDetails({ userData });
	console.log('userLastCallDetails:', userLastCallDetails);
	console.log('userLastCallLoading:', userLastCallLoading);
	return (
		<div className={styles.container}>
			IncomingCallUserDetailsIncomingCall
			UserDetailsIncomingCallUserDetailsIncomingCallUserDetails
		</div>
	);
}

export default IncomingCallUserDetails;
