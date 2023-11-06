import {
	Checkbox, CheckboxGroup, Chips, CreatableSelect, DateRangepicker,
	Datepicker, Input, MultiSelect, RadioGroup, Select, SingleDateRange,
	Textarea,
} from '@cogoport/components';
import {
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
	TextAreaController,
	AsyncSelectController,
	CheckboxGroupController,
	RadioGroupController,
	CheckboxController,
	CreatableMultiSelectController,
	MobileNumberController,
	ChipsController,
	MultiselectController,
	SingleDateRangeController,
	DateRangePickerController,
	AsyncSelect,
} from '@cogoport/forms';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';

const CONTROLLER_MAPPING = {
	input           : InputController,
	select          : SelectController,
	datePicker      : DatepickerController,
	fileUpload      : UploadController,
	asyncSelect     : AsyncSelectController,
	radio           : RadioGroupController,
	checkboxGroup   : CheckboxGroupController,
	textArea        : TextAreaController,
	checkbox        : CheckboxController,
	creatableSelect : CreatableMultiSelectController,
	multiSelect     : MultiselectController,
	mobileNumber    : MobileNumberController,
	chips           : ChipsController,
	singleDateRange : SingleDateRangeController,
	dateRangePicker : DateRangePickerController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;

const CONTROLS_MAPPING = {
	input           : Input,
	select          : Select,
	datePicker      : Datepicker,
	asyncSelect     : AsyncSelect,
	radio           : RadioGroup,
	checkboxGroup   : CheckboxGroup,
	textArea        : Textarea,
	checkbox        : Checkbox,
	creatableSelect : CreatableSelect,
	multiSelect     : MultiSelect,
	mobileNumber    : SelectMobileNumber,
	chips           : Chips,
	singleDateRange : SingleDateRange,
	dateRangePicker : DateRangepicker,
};

export const getFieldControls = (type = 'text') => CONTROLS_MAPPING[type] || null;
