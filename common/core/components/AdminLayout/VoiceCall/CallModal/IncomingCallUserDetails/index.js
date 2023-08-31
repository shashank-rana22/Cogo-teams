// import useGetLastVoiceCallDetails from '../../hooks/useGetLastVoiceCallDetails';

import QuotationDetails from './QuotationDetails';
import styles from './styles.module.css';

function IncomingCallUserDetails() {
	// const userData = {
	// 	lead_organization_id : undefined,
	// 	lead_user_id         : '',
	// 	mobile_number        : '7506434666',
	// 	organization_id      : 'd27b7345-96d0-46fe-a34b-b0e6f6e6110a',
	// 	userName             : 'Param Shah',
	// 	user_id              : 'a5144bdd-88f3-4b7c-8e77-0077f3ebbe97',
	// };
	// const { userLastCallLoading = false, userLastCallDetails } = useGetLastVoiceCallDetails({ userData });

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<div className={styles.last_call_info}>
					Last Call At :-
					<span className={styles.user_info}>April 23, 2005</span>
				</div>
				<div className={styles.last_call_info}>
					Last Call With :-
					<span className={styles.user_info}>Chandrakanth Venugula</span>
				</div>
				<QuotationDetails />
			</div>
		</div>

	);
}

export default IncomingCallUserDetails;
