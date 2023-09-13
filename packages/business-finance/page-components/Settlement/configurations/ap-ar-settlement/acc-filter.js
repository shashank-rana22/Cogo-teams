export const accountModeOptions = ({ t = () => {} }) => [
	{ label: t('settlement:ap_label'), value: 'AP' },
	{ label: t('settlement:ar_label'), value: 'AR' },
	{ label: t('settlement:csd_label'), value: 'CSD' },
	{ label: t('settlement:pda_label'), value: 'PDA' },
	{ label: t('settlement:vtds_label'), value: 'VTDS' },
];
