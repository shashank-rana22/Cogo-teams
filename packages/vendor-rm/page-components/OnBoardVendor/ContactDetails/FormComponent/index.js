import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import FormLayout from '../../../../commons/components/FormLayout/FormLayout';

const ButtonContainerStyle = {
	margin: '20px',
};

function FormComponent({
	activeStepper = {},
	setActiveStepper = () => {},
	fields = [],
	control,
	errors,
	createVendorContact,
	loading,
	handleSubmit,
}) {
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
				style={ButtonContainerStyle}
			/>
		</div>
	);
}

export default FormComponent;
