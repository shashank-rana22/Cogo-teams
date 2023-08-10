import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

export const getInvoiceDetails = ({ concorData, referenceId }) => {
	const {
		placeOfDestination = '', documentDate = '', placeOfSupply = '',
		dueDate = '', isTaxApplicable = false,
	} = concorData || {};

	return [
		{
			title: 'Incident Number',
			value:
	<div style={{ color: '#F68B21' }}>
		{' '}
		{referenceId}
	</div>,
		},
		{ title: 'Place of Destination', value: placeOfDestination },
		{
			title : 'Document Date',
			value : documentDate ? formatDate({
				date       : documentDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) : '',
		},
		{ title: 'Place of Supply', value: placeOfSupply },
		{
			title : 'Due Date',
			value : dueDate ? formatDate({
				date       : dueDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) : '',
		},
		{ title: 'Tax applicable', value: isTaxApplicable ? 'Yes' : 'No' },
	];
};
export const getOrganisationDetails = (concorData) => {
	const {
		supplierName = '', entity = '', sid = '', totalBuyPrice = '',
		currency = '', bookingProof = [], registrationNo = '',
	} = concorData || {};

	return [
		{ title: 'Organization Name', value: supplierName },
		{ title: 'Registration Number', value: registrationNo },
		{ title: 'Entity Code', value: entity },
		{ title: 'Shipment ID', value: sid },
		{
			title: 'Total Buy Price',
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
			title : 'Booking Proof (Indent)',
			value : bookingProof.map((url, index) => (
				<div key={url}>
					<a className={styles.link} href={url} target="_blank" rel="noreferrer">
						Booking Proof PDF
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
export const getBankDetails = (concorData) => {
	const { bankName = '', accountNumber = '', ifscCode = '', beneficiaryName = '' } = concorData || {};
	return [
		{ title: 'Bank Name', value: bankName },
		{ title: 'Account Number', value: accountNumber },
		{ title: 'IFSC Code', value: ifscCode },
		{ title: 'Beneficiary Name', value: beneficiaryName },
	];
};
