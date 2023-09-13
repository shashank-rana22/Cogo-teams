export const getDocTypeOptions = ({ t = () => {} }) => [
	{ label: t('settlement:payment_label'), value: 'PAYMENT' },
	{ label: t('settlement:invoice_label'), value: 'INVOICE' },
	{ label: t('settlement:credit_note_label'), value: 'CREDIT_NOTE' },
	{ label: t('settlement:jv_label'), value: 'JV' },
	{ label: t('settlement:tds_label'), value: 'TDS' },
];
