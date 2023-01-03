import useUpdateSpotNegotiationRate from '../../../../hooks/useUpdateSpotNegotiationRate';
import Layout from '../../../../Layout';

function AddRate({ service }) {
	const { fields, control } = useUpdateSpotNegotiationRate({ service });
	return (
		<Layout fields={fields} control={control} />
	);
}
export default AddRate;
