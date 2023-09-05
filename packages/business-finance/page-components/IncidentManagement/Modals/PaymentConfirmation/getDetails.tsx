import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function getDetails(paymentConfirmationRequest, organization, t) {
	const { currency = '', utr, paymentAmount = '', documentUrls, requestSubType } = paymentConfirmationRequest || {};
	const { businessName, tradePartyType = '', tradePartyName = '' } = organization || {};
	return [
		{ title: t('incidentManagement:org_name_title'), value: <div>{businessName || ''}</div> },
		{
			title : t('incidentManagement:trade_party_type'),
			value : <div>{tradePartyType?.replaceAll('_', ' ') || ''}</div>,
		},
		{ title: t('incidentManagement:org_business_name_title'), value: <div>{tradePartyName || ''}</div> },
		{
			title : t('incidentManagement:payment_amount_title'),
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
		{ title: t('incidentManagement:utr_title'), value: <div>{utr || ''}</div> },
		{ title: t('incidentManagement:request_sub_type_header'), value: <div>{startCase(requestSubType) || ''}</div> },
		{
			title : t('incidentManagement:docs'),
			value : (
				<div>
					{(documentUrls || []).map((item) => (
						<div key={item} className={styles.doc}>
							<a target="_blank" href={item} className={styles.file_link} rel="noreferrer">
								{t('incidentManagement:view_doc_link')}
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
