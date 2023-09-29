const getControls = ({ formValues = {} }) => {
	console.log('formValues:', formValues);

	return ({
		dateControls: [
			{
				label                 : 'Select Date',
				name                  : 'vehicle_arrival_date',
				placeholder           : 'Select Date',
				type                  : 'daterangepicker',
				span                  : 12,
				isPreviousDaysAllowed : true,
				timeFormat            : true,
				rules                 : {
					required: true,
				},
			},
		],
		vehicleControls: [
			{
				name               : 'vehicle_number',
				label              : 'Enter Vehicle Number',
				type               : 'fieldArray',
				showButtons        : true,
				showAddButton      : true,
				showDeleteButton   : true,
				noDeleteButtonTill : 1,
				value              : [],
				buttonText         : 'Add More Vehicles',
				controls           : [
					{
						label       : 'Please enter the vehicle number',
						name        : 'vehicle_number',
						type        : 'text',
						placeholder : 'Ex. DL-01-XXXX',
						span        : 4,
						rules       : {
							required: 'Vehicle Number is required',
						},
					},
				],
			},
		],
	});
};

export default getControls;
