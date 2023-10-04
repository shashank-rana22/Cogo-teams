const uploadTerminalChargeControl = ({ type = 'terminal' }) => ([
	{
		name       : 'terminal_charge_document',
		label      : `${type === 'terminal' ? 'Terminal' : 'Gatepass'} Charge Receipt`,
		type       : 'file',
		drag       : true,
		span       : 6,
		maxSize    : '10485760',
		uploadType : 'aws',
		accept     : '.pdf',
		rules      : {
			required: true,
		},
	},
]);
export default uploadTerminalChargeControl;
