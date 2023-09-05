import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

export const getInvoiceDetails = ({ concorData, referenceId, t }) => {
	const {
		placeOfDestination = '', documentDate = '', placeOfSupply = '',
		dueDate = '', isTaxApplicable = false,
	} = concorData || {};

	return [
		{
			title: t('incidentManagement:incident_number'),
			value:
	<div style={{ color: '#F68B21' }}>
		{' '}
		{referenceId}
	</div>,
		},
		{ title: t('incidentManagement:place_of_destination'), value: placeOfDestination },
		{
			title : t('incidentManagement:doc_date'),
			value : documentDate ? formatDate({
				date       : documentDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) : '',
		},
		{ title: t('incidentManagement:place_of_supply'), value: placeOfSupply },
		{
			title : t('incidentManagement:due_date'),
			value : dueDate ? formatDate({
				date       : dueDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) : '',
		},
		{ title: t('incidentManagement:tax_applicable'), value: isTaxApplicable ? 'Yes' : 'No' },
	];
};
export const getOrganisationDetails = (concorData, t) => {
	const {
		supplierName = '', entity = '', sid = '', totalBuyPrice = '',
		currency = '', bookingProof = [], registrationNo = '',
	} = concorData || {};

	return [
		{ title: t('incidentManagement:org_name_title'), value: supplierName },
		{ title: t('incidentManagement:registration_number'), value: registrationNo },
		{ title: t('incidentManagement:entity_code_title'), value: entity },
		{ title: t('incidentManagement:shipment_id'), value: sid },
		{
			title: t('incidentManagement:total_buy_price'),
			value:
				formatAmount({
					amount  : totalBuyPrice,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				}),
		},
		{
			title : t('incidentManagement:booking_proof_indent'),
			value : bookingProof.map((url, index) => (
				<div key={url}>
					<a className={styles.link} href={url} target="_blank" rel="noreferrer">
						{t('incidentManagement:booking_proof_pdf')}
						{' '}
						{' '}
						{index + 1}
					</a>
					{index !== bookingProof.length - 1 ? ('     ,') : null}
				</div>
			)),
		},
	];
};
export const getBankDetails = (concorData, t) => {
	const { bankName = '', accountNumber = '', ifscCode = '', beneficiaryName = '' } = concorData || {};
	return [
		{ title: t('incidentManagement:bank_name'), value: bankName },
		{ title: t('incidentManagement:account_number'), value: accountNumber },
		{ title: t('incidentManagement:ifsc_code'), value: ifscCode },
		{ title: t('incidentManagement:beneficiary_name'), value: beneficiaryName },
	];
};
