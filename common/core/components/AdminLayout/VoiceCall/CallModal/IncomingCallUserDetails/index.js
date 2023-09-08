import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase, isEmpty } from '@cogoport/utils';

import QuotationDetails from './QuotationDetails';
import styles from './styles.module.css';

const USER_QUOTE_DETAILS = ['sales', 'support', 'cp_support', 'supply', 'shipment_specialist'];

function IncomingCallUserDetails({ receiverUserDetails = {}, callUserDetails = {}, callUserLoading = false }) {
	const { organization_id = '' } = receiverUserDetails || {};

	const {
		agent_type = '', data: shipmentsData = {}, last_call_details = {},
		organizations = [],
	} = callUserDetails || {};

	const { end_time_of_call = '', agent_data = {} } = last_call_details || {};

	const orgDetails = (organizations || []).find((item) => item?.organization_id === organization_id);

	const showUserQuoteDetails = (USER_QUOTE_DETAILS || []).includes(agent_type);

	const isNoUserActivity = isEmpty(last_call_details);

	const isNoUserData = Object.values(shipmentsData || {}).every((obj) => isEmpty(obj));

	const { organization = {}, serial_id = '' } = orgDetails || {};

	if (callUserLoading || !showUserQuoteDetails) {
		return null;
	}

	if (isEmpty(orgDetails) && isNoUserActivity && isNoUserData && agent_type !== 'shipment_specialist') {
		return null;
	}

	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				{organization_id
					? (
						<div className={styles.header_container}>
							<div className={styles.title}>
								{startCase(organization?.business_name)}
							</div>
							{serial_id ? (
								<div className={styles.title}>
									(
									{serial_id}
									)
								</div>
							) : null}
						</div>

					) : null}
				<div className={styles.last_call_info}>
					Last call at :
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
					Last call with :
					<span className={styles.user_info}>{startCase(agent_data?.name) || ' — '}</span>
				</div>
				<QuotationDetails shipmentsData={shipmentsData} agentType={agent_type} />
			</div>
		</div>

	);
}

export default IncomingCallUserDetails;
