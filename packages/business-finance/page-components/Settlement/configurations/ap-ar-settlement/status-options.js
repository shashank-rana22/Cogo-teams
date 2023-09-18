export const statusOptionsPayment = ({ t = () => {} }) => [
	{ label: t('settlement:partially_utilized_label'), value: 'partially_utilized' },
	{ label: t('settlement:unutilized_label'), value: 'unutilized' },

];
export const statusOptionsInvoice = ({ t = () => {} }) => [
	{ label: t('settlement:partially_paid_label'), value: 'partial_paid' },
	{ label: t('settlement:unpaid_label'), value: 'unpaid' },

];
