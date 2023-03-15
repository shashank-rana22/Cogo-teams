import { Button } from '@cogoport/components';

// import FormLayout from '../../../../../commons/Layout';
import useBlContainer from '../../../../../hooks/useBlContainer';

function BlContainer({
	data,
	shipment_data,
	setMappingModal = () => {},
	refetch = () => {},
}) {
	const {
		// updateDetails,
		// onError,
		// error,
		// handleSubmit,
		// containerLoading,
		// controls,
		// fields,
		// showElements,
	} = useBlContainer({
		data,
		shipment_data,
		setMappingModal,
		refetch,
	});

	return (
		<div>
			{/* <FormLayout
				controls={controls}
				fields={fields}
				errors={error}
				showElements={showElements}
			/> */}
			<Button
				// onClick={handleSubmit(updateDetails, onError)}
				className="primary sg"
				style={{ marginTop: '5px' }}
				// disabled={containerLoading}
			>
				Update Details
			</Button>
		</div>
	);
}

export default BlContainer;
