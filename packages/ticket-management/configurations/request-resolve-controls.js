export const useRequestResolveControls = ({
	t = () => {},
}) => [
	{
		name           : 'comment',
		controllerType : 'textarea',
		label          : t('myTickets:comments'),
		placeholder    : t('myTickets:enter_comments'),
		rules          : { required: true },
	},
];
