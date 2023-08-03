const MAIL_RECIEPIENTS_MAPPING = [
	{
		label : 'To',
		value : 'toUserEmail',

	},
	{
		label : 'Cc',
		value : 'ccrecipients',
	},
	{
		label : 'Bcc',
		value : 'bccrecipients',
	},
];

const DISABLE_TYPE_MAPPING = {
	toUserEmail: ['reply'],
};

const getMailReciepientMapping = ({ mailActions = {} }) => {
	const { actionType = '' } = mailActions || {};

	return MAIL_RECIEPIENTS_MAPPING.filter((eachItem) => !DISABLE_TYPE_MAPPING[eachItem?.value]?.includes(actionType));
};

export default getMailReciepientMapping;
