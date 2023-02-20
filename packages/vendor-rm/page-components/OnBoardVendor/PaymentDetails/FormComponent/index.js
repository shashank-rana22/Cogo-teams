// eslint-disable-next-line import/no-cycle
import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import FormLayout from '../../../../commons/components/FormLayout/FormLayout';
import useVendorBankDetail from '../hooks/useVendorBankDetail';

function FormComponent({
	activeStepper = {},
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	const {
		controls = [],
		control,
		errors,
		handleSubmit,
		loading,
		onSubmit,
	} =	useVendorBankDetail({
		setActiveStepper,
		vendorInformation,
		setVendorInformation,
	});

	return (
		<div>
			<FormLayout
				fields={controls}
				errors={errors}
				control={control}
			/>

			<ButtonLayout
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
				loading={loading}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
			/>
		</div>
	);
}

export default FormComponent;
