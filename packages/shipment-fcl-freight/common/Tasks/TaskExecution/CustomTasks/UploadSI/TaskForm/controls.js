const controls = () => [
	{
		name               : 'documents',
		type               : 'fieldArray',
		heading            : 'Documents',
		showDivider        : false,
		isSectionRequired  : true,
		noDeleteButtonTill : 1,
		controls           : [
			{
				name  : 'description',
				rows  : 2,
				span  : 7,
				type  : 'textarea',
				label : 'Document Description (optional)',
			},
			{
				name          : 'url',
				showLabel     : false,
				span          : 4,
				type          : 'file',
				label         : 'Please Upload your document',
				themeType     : 'secondary',
				drag          : true,
				uploadIcon    : 'ic-upload',
				document_type : 'si',
				accept:
					'image/*,.pdf,.doc,.docx,.xlsx,application/msword,'
					+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				rules: { required: 'Document is required' },
			},
		],

	},
	{
		name              : 'container',
		type              : 'fieldArray',
		heading           : 'Container',
		showButtons       : false,
		showDivider       : false,
		showDeleteButton  : false,
		isSectionRequired : true,
		controls          : [
			{
				name  : 'id',
				show  : false,
				label : 'Container Id',
			},
			{
				name  : 'container_number',
				span  : 3,
				type  : 'text',
				label : 'Container Number',
				rules : { required: 'Container number is required' },
			},
			{
				name  : 'container_seal_number',
				span  : 3,
				type  : 'text',
				label : 'Container Seal Number',
				rules : { required: 'Container seal number is required' },
			},
		],
	},
];

const getControls = ({ apis_data }) => {
	const emptyValues = {
		id                    : '',
		container_number      : '',
		container_seal_number : '',
	};

	const modifiedControls = controls();
	const showElements = {};

	(modifiedControls || []).forEach((control, index) => {
		if (control.type === 'fieldArray' && control.name === 'container') {
			modifiedControls[index].value = (
				apis_data?.list_shipment_container_details || []
			).map((container) => ({
				...emptyValues,
				id               : container?.id || '',
				container_number : container?.container_number || '',
			}));

			control.controls.forEach((controlObj) => {
				if (controlObj?.show === false) {
					showElements[controlObj.name] = controlObj?.show;
				}
			});
		}
	});

	return { modifiedControls, showElements };
};

export default getControls;
