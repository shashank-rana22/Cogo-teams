interface Props {
	t?: Function;
}
export 	const getHeaderData = ({ t = () => {} }:Props) => [
	{ id: '1', label: t('incidentManagement:doc_number_label') },
	{ id: '2', label: t('incidentManagement:doc_amount_label') },
	{ id: '3', label: t('incidentManagement:exc_rate_label') },
	{ id: '4', label: t('incidentManagement:tds_label') },
	{ id: '5', label: t('incidentManagement:nostro_label') },
	{ id: '6', label: t('incidentManagement:settled_tds_label') },
	{ id: '7', label: t('incidentManagement:balance_amount_label') },
	{ id: '8', label: t('incidentManagement:allocation_label') },
	{ id: '9', label: t('incidentManagement:balance_after_allocation_label') },
];
