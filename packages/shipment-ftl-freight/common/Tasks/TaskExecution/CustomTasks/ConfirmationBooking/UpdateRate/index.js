import { Layout } from '@cogoport/surface-modules';

function UpdateRate(props) {
	const { useEditQuoteData, errors } = props;

	const { controls, fields, customValues } = useEditQuoteData;

	return (
		<div>
			<Layout
				controls={controls}
				fields={fields}
				errors={errors}
				customValues={customValues}
			/>
		</div>
	);
}

export default UpdateRate;
