import NestedLayout from '../../../common/NestedLayout';

function Margin({
	watch = () => {},
	marginControls = [],
	control = {},
	errors = {},
	customFieldArrayControls = {},
	setValue = () => { },
	showElements = {},
	formValues = {},
}) {
	return (
		<NestedLayout
			controls={marginControls}
			control={control}
			errors={errors}
			watch={watch}
			setValue={setValue}
			customFieldArrayControls={customFieldArrayControls}
			showElements={showElements}
			formValues={formValues}
		/>
	);
}
export default Margin;
