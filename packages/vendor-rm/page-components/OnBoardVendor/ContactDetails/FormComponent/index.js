/* eslint-disable import/no-cycle */
import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import FormLayout from '../../../../commons/components/FormLayout/FormLayout';
// import useCreateVendorContact from '../hooks/useCreateVendorContact';

function FormComponent({
	activeStepper = {},
	setActiveStepper = () => {},
	// vendorInformation = {},
	// setVendorInformation = () => {},
	fields = [],
	control,
	errors,
	createVendorContact,
	loading,
	handleSubmit,
}) {
	// const {
	// 	fields = [],
	// 	control,
	// 	errors,
	// 	createVendorContact,
	// 	loading,
	// 	handleSubmit,
	// } =	useCreateVendorContact({
	// 	setActiveStepper,
	// 	vendorInformation,
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
				setActiveStepper={setActiveStepper}
				handleSubmit={handleSubmit}
				onSubmit={createVendorContact}
			/>
		</div>
	);
}

export default FormComponent;
