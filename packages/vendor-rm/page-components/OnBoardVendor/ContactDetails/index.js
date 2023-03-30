import FormComponent from './FormComponent';
import Header from './Header';
import useCreateVendorContact from './hooks/useCreateVendorContact';

function ContactDetails({
	activeStepper = {},
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	const {
		fields = [],
		control,
		errors,
		createVendorContact,
		loading,
		handleSubmit,
	} =	useCreateVendorContact({
		setActiveStepper,
		vendorInformation,
		setVendorInformation,
	});

	return (
		<div>
			<Header />

			<FormComponent
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
				fields={fields}
				control={control}
				errors={errors}
				createVendorContact={createVendorContact}
				loading={loading}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
}

export default ContactDetails;
