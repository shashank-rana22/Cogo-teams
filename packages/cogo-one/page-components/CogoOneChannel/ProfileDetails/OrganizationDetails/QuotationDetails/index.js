import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

import useCheckCustomerCheckoutQuotationConflict from '../../../../../hooks/useCheckCustomerCheckoutQuotationConflict';

import styles from './styles.module.css';

function QuotationDetails({
	organizationId = '',
}) {
	const {
		quotationSentData = {},
		quotationLoading = false,
	} = useCheckCustomerCheckoutQuotationConflict({ orgId: organizationId });

	const { quotation_email_sent_at = '', quotation_email_sent_by_name = '' } = quotationSentData || {};
	const quotation_date = quotation_email_sent_at && formatDate({
		date       : quotation_email_sent_at || new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
		formatType : 'date',
	});

	return (
		<div>
			{quotation_email_sent_by_name && (
				<div>
					<div className={styles.agent_title}>
						Quotation details
					</div>
					<div className={styles.quotation}>
						{quotationLoading ? (
							<>
								<Placeholder
									height="13px"
									width="120px"
									margin="5px 0px 10px 0px"
								/>
								<Placeholder
									height="13px"
									width="120px"
									margin="0px 0px 0px 0px"
								/>

							</>
						) : (
							<>
								<div>
									Sent by:
									<span>{quotation_email_sent_by_name}</span>
								</div>
								<div>
									Sent at:
									<span>{quotation_date}</span>
								</div>

							</>
						)}

					</div>
				</div>
			)}
		</div>
	);
}
export default QuotationDetails;
