const CTA_MAPPING = {
	enrichment_requests: {
		add    : 'Add Details',
		failed : 'Mark as Failed',
	},
	requests_sent: {
		edit: 'Edit Details',

		success: 'Mark as Completed',
	},
};

const getActionConfigurations = ({ activeTab = '' }) => CTA_MAPPING[activeTab];

export default getActionConfigurations;
