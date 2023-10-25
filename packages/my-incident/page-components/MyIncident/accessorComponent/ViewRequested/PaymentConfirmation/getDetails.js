import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function getDetails(paymentConfirmationRequest, organization) {
	const { currency = '', utr, paymentAmount = '', documentUrls, requestSubType } = paymentConfirmationRequest || {};
	const { businessName, tradePartyType = '', tradePartyName = '' } = organization || {};

	return [
		{ title: 'Organization Name', value: <div>{businessName || ''}</div> },
		{ title: 'Trade Party Type', value: <div>{tradePartyType?.replaceAll('_', ' ') || ''}</div> },
		{ title: 'Business Name', value: <div>{tradePartyName || ''}</div> },
		{
			title : 'Payment Amount',
			value : (
				<div>
					{formatAmount({
						amount  : paymentAmount,
						currency,
						options : {
							currencyDisplay : 'code',
							style           : 'currency',
						},
					})}
				</div>
			),
		},
		{ title: 'UTR', value: <div>{utr || ''}</div> },
		{ title: 'Request Sub Type', value: <div>{startCase(requestSubType) || ''}</div> },
		{
			title : 'Documents',
			value : (
				<div>
					{(documentUrls || []).map((item) => (
						<div key={item} className={styles.doc}>
							<a target="_blank" href={item} className={styles.file_link} rel="noreferrer">
								View Document
							</a>
							<div className={styles.eye}><IcMEyeopen /></div>
						</div>
					))}
				</div>
			),
		},
	];
}
export default getDetails;
