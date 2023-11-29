import formatAmount from '@cogoport/globalization/utils/formatAmount';

import getFormattedAmount from '../../../../utils/getFormattedAmount';

const dataFormatter = ({ performance_data = {} }) => (
	{
		booked_revenue: {
			label : 'Total Booked Revenue and Invoiced Revenue',
			value : formatAmount({
				amount: ((performance_data?.booked_revenue || 0)
				+ (performance_data?.invoiced_revenue || 0)),
				currency : 'USD',
				options  : {
					currencyWise          : true,
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 2,
				},
			}),
		},
		quotations: {
			label : 'No of Quotation Sent',
			value : performance_data?.total_quotation_count,
		},
		shipments: {
			label : 'Total Shipments',
			value : performance_data?.total_shipments,
		},
		activations: {
			label : 'New Activations',
			value : performance_data?.new_activations,
		},
		true_activation: {
			label : 'True Activations',
			value : performance_data?.true_activations,
		},
		calls_made: {
			label : 'No of Calls Made',
			value : performance_data?.total_calls_made,
		},
		calls_received: {
			label : 'No of Calls Received',
			value : performance_data?.total_calls_received,
		},
		chats_initiated: {
			label : 'No of Chats Initiated',
			value : performance_data?.total_chats_made,
		},
		chats_initiated_by_customer: {
			label : 'No of Chats Initiated by Customer',
			value : performance_data?.total_chats_received,
		},
		mails_sent: {
			label : 'No of Mails Sent',
			value : performance_data?.total_mails_sent,
		},
		mails_received: {
			label : 'No of Mails Received',
			value : performance_data?.total_mails_received,
		},
		leads_assigned: {
			label : 'Leads Assigned',
			value : performance_data?.leads_assigned,
		},
		feedback_provided: {
			label : 'Feedback Provided',
			value : performance_data?.feedbacks_sent,
		},
		incentive_score: {
			label : 'Incentive Score',
			value : getFormattedAmount({ number: performance_data?.incentive_score }),
		},
	}
);

export default dataFormatter;
