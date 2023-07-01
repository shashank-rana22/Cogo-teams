import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import FormLayout from '../../../../commons/components/FormLayout/FormLayout';

const ButtonContainerStyle = {
	margin: '20px',
};

function FormComponent({
	activeStepper = {},
	fields = [],
	control,
	errors,
	handleSubmit,
	loading,
	createVendor,
}) {
	return (
		<>
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
				style={ButtonContainerStyle}
			/>
		</>
	);
}

export default FormComponent;
