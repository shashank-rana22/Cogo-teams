import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDataPipeline } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const dataMapping = () => (
	{
		booked_revenue: {
			label : 'Total Booked Revenue and Invoiced Revenue',
			value : formatAmount({
				amount   : Math.random() * 10000,
				currency : 'USD',
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 2,
				},
			}),
		},
		quotations: {
			label : 'No of Quotation Sent',
			value : (Math.random() * 100)?.toFixed(0),
		},
		shipments: {
			label : 'Total Shipments',
			value : (Math.random() * 100)?.toFixed(0),
		},
		activations: {
			label : 'New Activations',
			value : (Math.random() * 100)?.toFixed(0),
		},
		true_activation: {
			label : 'True Activations',
			value : (Math.random() * 100)?.toFixed(0),
		},
		calls_made: {
			label : 'No of Calls Made',
			value : (Math.random() * 100)?.toFixed(0),
		},
		calls_received: {
			label : 'No of Calls Received',
			value : (Math.random() * 100)?.toFixed(0),
		},
		chats_initiated: {
			label : 'No of Chats Initiated',
			value : (Math.random() * 100)?.toFixed(0),
		},
		chats_initiated_by_customer: {
			label : 'No of Chats Initiated by Customer',
			value : (Math.random() * 100)?.toFixed(0),
		},
		mails_sent: {
			label : 'No of Mails Sent',
			value : (Math.random() * 100)?.toFixed(0),
		},
		mails_received: {
			label : 'No of Mails Received',
			value : (Math.random() * 100)?.toFixed(0),
		},
		leads_assigned: {
			label : 'Leads Assigned',
			value : (Math.random() * 100)?.toFixed(0),
		},
		feedback_provided: {
			label : 'Feedback Provided',
			value : (Math.random() * 100)?.toFixed(0),
		},
		incentive_score: {
			label : 'Incentive Score',
			value : (Math.random() * 1000)?.toFixed(0),
		},
	}
);

function SelectedStats({ selectedItem = {} }) {
	const data = dataMapping();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMDataPipeline className={styles.stats_icon} />
				<div className={styles.header_name}>
					{isEmpty(selectedItem) ? 'Entire Organization' : selectedItem?.name}
					{' '}
					Stats
				</div>
			</div>

			<div className={styles.data_container}>
				{Object.entries(data).map(
					([key, valueKeys]) => (
						<div
							key={key}
							className={styles.data_row}
						>
							<div className={styles.label_data}>
								{valueKeys.label}
							</div>
							<div className={styles.value_data}>
								{valueKeys.value}
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default SelectedStats;
