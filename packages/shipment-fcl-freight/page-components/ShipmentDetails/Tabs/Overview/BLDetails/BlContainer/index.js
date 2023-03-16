import { Button } from '@cogoport/components';

import Layout from '../../../../../../common/Layout';
import useBlContainer from '../../../../../../hooks/useBlContainer';

import styles from './styles.module.css';

function BlContainer({
	data,
	shipment_data,
	setMappingModal = () => { },
	refetch = () => { },
}) {
	const {
		// updateDetails,
		// onError,
		errors,
		// handleSubmit,
		// containerLoading,
		controls,
		control,
		// fields,
		// showElements,
	} = useBlContainer({
		data,
		shipment_data,
		setMappingModal,
		refetch,
	});

	console.log(controls, control, errors);

	return (
		<div className={styles.container}>
			{/* <Layout fields={controls} errors={errors} control={control} /> */}
			Hi!, under construction
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
