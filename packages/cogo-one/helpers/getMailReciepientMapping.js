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
	toUserEmail: {
		reply   : true,
		forward : false,
		default : true,
	},
};

const getMailReciepientMapping = ({ mailActions = {} }) => {
	const { actionType = '' } = mailActions || {};

	return MAIL_RECIEPIENTS_MAPPING.map((eachItem) => (
		{
			...eachItem,
			isDisabled: (DISABLE_TYPE_MAPPING[eachItem?.value]?.[actionType]
			|| DISABLE_TYPE_MAPPING[eachItem?.value]?.default),
		}
	));
};

export default getMailReciepientMapping;
