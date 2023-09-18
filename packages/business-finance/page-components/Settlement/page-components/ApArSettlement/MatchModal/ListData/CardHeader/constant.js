export 	const headerData = ({ t = () => {} }) => [
	{ id: '0', label: '', span: 0.38 },
	{ id: '1', label: t('settlement:doc_number_label'), span: 1.3 },
	{ id: '2', label: t('settlement:doc_amount_label'), span: 1.1 },
	{ id: '3', label: t('settlement:exc_rate_label'), span: 0.9 },
	{ id: '4', label: t('settlement:tds_label'), span: 1.55 },
	{ id: '5', label: t('settlement:nostro_label'), span: 1.3 },
	{ id: '6', label: t('settlement:settled_tds_label'), span: 1.3 },
	{ id: '7', label: t('settlement:balance_amount_label'), span: 1.4 },
	{ id: '8', label: t('settlement:allocation_label'), span: 1.2 },
	{ id: '9', label: t('settlement:balance_after_allocation_label'), span: 1 },
	{ id: '10', label: '', span: 0.7 },
];
