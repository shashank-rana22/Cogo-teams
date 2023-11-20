import {
	SelectController,
	DatepickerController,
	TextAreaController,
	CheckboxController,
	UploadController,
	SingleDateRangeController,
} from '@cogoport/forms';

const SLICE_START = 0;
const SLICE_END = 3;

const LEAVE_CONTROLS = [
	{
		name         : 'leave_type',
		controlLabel : 'Select Leave Category',
		controlType  : 'select',
		placeholder  : 'Leave Type',
		options      : [
			{
				label : 'Privilege Leave',
				value : 'privilege_leave',
			},
			{
				label : 'Sick Leave',
				value : 'sick_leave',
			},
			{
				label : 'Leave Without Pay',
				value : 'leave_without_pay',
			},
			{
				label : 'Casual Leave',
				value : 'casual_leave',
			},
			{
				label : 'Marriage Leave',
				value : 'marriage_leave',
			},
			{
				label : 'Bereavement Leave',
				value : 'bereavement_leave',
			},
			{
				label : 'Paternity Leave',
				value : 'paternity_leave',
			},
			{
				label : 'Maternity Leave',
				value : 'maternity_leave',
			},
		],
		rules: {
			required: {
				value   : true,
				message : 'Leave Category is required',
			},
		},
	},
	{
		controlLabel          : 'Select Date Range for this Leave',
		name                  : 'date_range',
		controlType           : 'range_datepicker',
		placeholder           : 'Select Date Range',
		isPreviousDaysAllowed : true,
		dateFormat            : 'dd-MM-yyyy',
		rules                 : {
			required: {
				value   : true,
				message : 'Date is required',
			},
		},
	},
	{
		name        : 'half_day',
		controlType : 'checkbox',
		label       : 'Are There Any Half Days?',
	},
	{
		controlLabel : 'Remarks',
		name         : 'leave_reason',
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

export const getLeaveControls = (isHalfDay) => {
	const halfDayControl = {
		name                  : 'half_day_date',
		controlLabel          : 'Select Half Day',
		controlType           : 'datepicker',
		isPreviousDaysAllowed : true,
		rules                 : {
			required: {
				value   : true,
				message : 'Date is required',
			},
		},
	};

	const newArrayOfObjects = [
		...LEAVE_CONTROLS.slice(SLICE_START, SLICE_END),
		halfDayControl,
		...LEAVE_CONTROLS.slice(SLICE_END),
	];

	return isHalfDay ? newArrayOfObjects : LEAVE_CONTROLS;
};

export const controlMapping = {
	datepicker       : DatepickerController,
	fileUploader     : UploadController,
	textarea         : TextAreaController,
	range_datepicker : SingleDateRangeController,
	select           : SelectController,
	checkbox         : CheckboxController,
};
