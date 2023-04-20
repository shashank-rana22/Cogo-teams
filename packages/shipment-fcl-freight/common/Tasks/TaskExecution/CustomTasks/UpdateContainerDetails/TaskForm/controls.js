import { startCase } from '@cogoport/utils';

const controls = () => [
	{
		name     : 'container',
		type     : 'fieldArray',
		heading  : 'Container',
		controls : [
			{
				name  : 'id',
				show  : false,
				label : 'Container Id',
			},
			{
				name  : 'container_number',
				span  : 3,
				type  : 'text',
				size  : 'sm',
				label : 'Container Number',
				rules : {
					required: {
						value   : true,
						message : 'Container number is required',
					},
				},
			},
			{
				name    : 'bl_number',
				span    : 3,
				type    : 'select',
				size    : 'sm',
				label   : 'BL Number',
				options : [],
			},
			{
				name  : 'picked_up_from_yard_at',
				span  : 3,
				type  : 'datepicker',
				label : 'Containers picked up from yard at',
				rules : {
					required: {
						value   : true,
						message : 'Containers picked up from yard is Required',
					},
				},
				usePortal             : true,
				maxDate               : new Date(),
				placeholder           : 'Select',
				withTimePicker        : true,
				isPreviousDaysAllowed : true,
			},
			{
				name  : 'bl_id',
				show  : false,
				type  : 'text',
				label : 'BL Id',
			},
		],
		showButtons       : false,
		showDivider       : false,
		showDeleteButton  : false,
		isSectionRequired : true,
	},
];

const getControls = ({ apis_data }) => {
	const emptyValues = {
		id                     : '',
		bl_id                  : '',
		bl_number              : '',
		container_number       : '',
		picked_up_from_yard_at : '',
	};

	const modifiedControls = controls();
	const showElements = {};

	(modifiedControls || []).forEach((control, index) => {
		if (control.type === 'fieldArray') {
			modifiedControls[index].value = (
				apis_data?.list_shipment_container_details || []
			).map((container) => ({ ...emptyValues, id: container?.id || '' }));

			control.controls.forEach((controlObj, ind) => {
				if (controlObj.name === 'bl_number') {
					modifiedControls[index].controls[ind].options = (
						apis_data?.list_shipment_bl_details || []
					).map((obj) => ({
						label : startCase(obj.bl_number),
						value : obj.bl_number,
					}));
				}

				if (controlObj?.show === false) {
					showElements[controlObj.name] = controlObj?.show;
				}
			});
		}
	});

	return { modifiedControls, showElements };
};

export default getControls;
