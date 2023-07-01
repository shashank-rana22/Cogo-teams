import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import FormLayout from '../../../../commons/components/FormLayout/FormLayout';
import useVendorBankDetail from '../hooks/useVendorBankDetail';

const ButtonContainerStyle = {
	margin: '20px 60px 20px 20px',
};

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
				style={ButtonContainerStyle}
			/>
		</div>
	);
}

export default FormComponent;
