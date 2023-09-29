export const escalateTicketsControls = ({ t }) => [
	{
		name           : 'comment',
		controllerType : 'textarea',
		label          : t('myTickets:reason_to_escalate'),
		placeholder    : t('myTickets:enter_here'),
		rules          : { required: true },
	},
];
