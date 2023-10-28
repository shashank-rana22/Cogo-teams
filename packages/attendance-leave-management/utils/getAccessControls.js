import {
	AsyncSelectController,
	CheckboxController,
	DatepickerController,
	SelectController,
	SingleDateRangeController,
	TextAreaController,
	UploadController,
} from '@cogoport/forms';

export const LEAVE_CONTROLS = [
	{
		name         : 'employee_id',
		controlLabel : 'Select Employee Id',
		controlType  : 'asyncSelect',
		placeholder  : 'Select Employee',
		asyncKey     : 'list_employees',
		params       : {
			filters                       : { status: 'active' },
			page_limit                    : 100,
			required_keys                 : ['id', 'name'],
			service_objects_data_required : false,
			mappings_data_required        : true,
		},
		isClearable : true,
		labelKey    : 'name',
		valueKey    : 'id',
		initialCall : true,
		rules       : {
			required: {
				value   : true,
				message : 'Employee Id is required',
			},
		},
	},
	{
		controlLabel          : 'Select Date Range for this Leave',
		name                  : 'date_range',
		controlType           : 'range_datepicker',
		placeholder           : 'Select Date Range',
		isPreviousDaysAllowed : false,
		dateFormat            : 'dd-MM-yyyy',
		rules                 : {
			required: {
				value   : true,
				message : 'Date is required',
			},
		},
	},
	{
		controlLabel : 'Remarks',
		name         : 'remarks',
		controlType  : 'textarea',
		placeholder  : 'Remarks',
		rows         : 3,
		rules        : {
			required: {
				value   : true,
				message : 'Remark is required',
			},
		},
	},
	{
		name          : 'attachment_url',
		controlLabel  : 'Attachment',
		controlType   : 'fileUploader',
		draggable     : true,
		loading       : true,
		dropareaProps : { heading: 'Upload your file here', subHeading: 'supports - jpeg, pdf, docx' },
		accept        : '.jpeg, .jpg, .pdf, .png',
	},
];

export const controlMapping = {
	datepicker       : DatepickerController,
	fileUploader     : UploadController,
	textarea         : TextAreaController,
	range_datepicker : SingleDateRangeController,
	select           : SelectController,
	asyncSelect      : AsyncSelectController,
	checkbox         : CheckboxController,
};
