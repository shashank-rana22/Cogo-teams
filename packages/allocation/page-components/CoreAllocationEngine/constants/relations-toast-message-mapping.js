const getToastMessageMapping = ({ t = () => {} }) => ({
	approve     : t('allocation:request_approved'),
	reject      : t('allocation:request_rejected'),
	delete      : t('allocation:request_deleted'),
	approve_all : t('allocation:requests_approved'),
});

export default getToastMessageMapping;
