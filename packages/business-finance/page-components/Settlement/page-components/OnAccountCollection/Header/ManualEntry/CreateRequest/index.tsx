import Layout from '../../../../../../commons/Layout';

function CreateRequest({ control, controls, errors }) {
	return (
		<div>
			<Layout
				control={control}
				fields={controls}
				errors={errors}
			/>
		</div>
	);
}
export default CreateRequest;
