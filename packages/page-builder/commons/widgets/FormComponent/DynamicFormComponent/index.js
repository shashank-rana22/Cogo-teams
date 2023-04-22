import FormLayout from '../../FormLayout';

function DynamicFormComponent({ formData, control, errors }) {
	const { controls } = formData || {};

	return (
		<div>
			<FormLayout
				controls={controls}
				control={control}
				errors={errors}
				showElements={{}}
			/>
		</div>
	);
}

export default DynamicFormComponent;
