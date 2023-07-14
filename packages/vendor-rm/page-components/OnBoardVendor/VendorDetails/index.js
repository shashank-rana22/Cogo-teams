import FormComponent from './FormComponent';
import Header from './Header';
import useOnBoardVendor from './hooks/useOnBoardVendor';

function VendorDetails({
	activeStepper = {},
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	const {
		fields = [],
		control,
		errors,
		handleSubmit,
		loading,
		createVendor,
	} =	useOnBoardVendor({
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
				setVendorInformation={setVendorInformation}
				fields={fields}
				control={control}
				errors={errors}
				handleSubmit={handleSubmit}
				loading={loading}
				createVendor={createVendor}
			/>
		</div>
	);
}

export default VendorDetails;
