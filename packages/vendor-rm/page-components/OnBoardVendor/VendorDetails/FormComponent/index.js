/* eslint-disable import/no-cycle */
import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import FormLayout from '../../../../commons/components/FormLayout/FormLayout';
// import useOnBoardVendor from '../hooks/useOnBoardVendor';

function FormComponent({
	activeStepper = {},
	// setActiveStepper = () => {},
	// setVendorInformation = () => {},
	fields = [],
	control,
	errors,
	handleSubmit,
	loading,
	createVendor,
}) {
	// const {
	// 	fields = [],
	// 	control,
	// 	errors,
	// 	handleSubmit,
	// 	loading,
	// 	createVendor,
	// } =	useOnBoardVendor({
	// 	setActiveStepper,
	// 	setVendorInformation,
	// });
	return (
		<div>
			<FormLayout
				fields={fields}
				errors={errors}
				control={control}
			/>
			<ButtonLayout
				activeStepper={activeStepper}
				loading={loading}
				handleSubmit={handleSubmit}
				onSubmit={createVendor}
			/>
		</div>
	);
}

export default FormComponent;
