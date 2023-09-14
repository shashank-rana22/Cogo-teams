const getStatusMapping = ({ t = () => {} }) => ({
	approved: {
		label: t('allocation:approved_label'),
	},
	rejected: {
		label: t('allocation:rejected_label'),
	},
});

export default getStatusMapping;
