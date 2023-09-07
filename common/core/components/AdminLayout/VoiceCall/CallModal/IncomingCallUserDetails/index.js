import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase, isEmpty } from '@cogoport/utils';

import useGetUserCallDetails from '../../hooks/useGetUserCallDetails';

import QuotationDetails from './QuotationDetails';
import styles from './styles.module.css';

const USER_QUOTE_DETAILS = ['sales', 'support', 'cp_support', 'supply', 'shipment_specialist'];

function IncomingCallUserDetails({ receiverUserDetails = {} }) {
	const { mobile_number = '', mobile_country_code = '', organization_id = '' } = receiverUserDetails || {};

	const {
		loading = false,
		data = {},
	} = useGetUserCallDetails({
		mobileNumber      : mobile_number,
		mobileCountryCode : mobile_country_code,
	});

	const { agent_type = '', data: shipmentsData = {}, latest_call_details = {}, organizations = [] } = data || {};
	const { end_time_of_call = '', agent_data = {} } = latest_call_details || {};

	const orgDetails = (organizations || []).filter((item) => item?.organization_id === organization_id);

	const showUserQuoteDetails = (USER_QUOTE_DETAILS || []).includes(agent_type);

	const isNoUserActivity = isEmpty(latest_call_details);

	const isNoUserData = Object.values(data || {}).every((obj) => isEmpty(Object.keys(obj)));

	if (loading || !showUserQuoteDetails) {
		return null;
	}

	if (isEmpty(orgDetails) && isNoUserActivity && isNoUserData) {
		return null;
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				{organization_id
					? startCase(orgDetails?.[GLOBAL_CONSTANTS.zeroth_index]?.organization?.business_name) : null}
				<div className={styles.last_call_info}>
					Last Call At :-
					{' '}
					<span className={styles.user_info}>
						{end_time_of_call ? formatDate({
							date       : end_time_of_call || new Date(),
							formatType : 'date',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
						}) : ' — '}
					</span>
				</div>
				<div className={styles.last_call_info}>
					Last Call With :-
					<span className={styles.user_info}>{startCase(agent_data?.name) || ' — '}</span>
				</div>
				<QuotationDetails shipmentsData={shipmentsData} agentType={agent_type} />
			</div>
		</div>

	);
}

export default IncomingCallUserDetails;
