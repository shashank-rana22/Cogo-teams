import useUpdateSpotNegotiationRate from '../../../../hooks/useUpdateSpotNegotiationRate';
import Layout from '../../../../Layout';

function AddRate({ service }) {
	const { fields, control, showElements } = useUpdateSpotNegotiationRate({ service });
	return (
		<Layout fields={fields} control={control} showElements={showElements} />
	);
}
export default AddRate;
