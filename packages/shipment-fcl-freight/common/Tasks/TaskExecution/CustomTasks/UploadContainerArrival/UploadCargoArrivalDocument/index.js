import { Button } from '@cogoport/components';

import useCargoArrivalDocument from '../../../../../../hooks/useUploadCargoArrivalForm';

import styles from './styles.module.css';

function UploadCargoArrivalDocument({
	pendingTask,
	refetch,
	setShowDocument,
	showDocument,
	clearTask,
}) {
	const {
		handleSubmit,
		fields,
		errors,
		onError,
		submitDocument,
		control,
		loading,
	} = useCargoArrivalDocument({
		pendingTask,
		refetch,
		setShowDocument,
		showDocument,
		clearTask,
	});

	console.log(showDocument, 'UploadCargoArrivalDocument');

	return (
		showDocument ? (
			<>
				<div className={styles.head}>Upload Cargo Arrival Notice Document</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						style={{ height: '25px' }}
						// onClick={handleSubmit(submitDocument, onError)}
						// disabled={loading}
					>
						Submit
					</Button>
				</div>
				{' '}
			</>
		) : null
	);
}

export default UploadCargoArrivalDocument;
