import { Button } from '@cogoport/components';
import React from 'react';

// import useUpdateCancelShipment from '../../../../Fcl/hooks/useUpdateCancelShipment';
import styles from './styles.module.css';
// eslint-disable-next-line no-empty-pattern
function CancelShipment({
	setShowCancel = () => {},
}) {
	// const {
	// 	loading,
	// 	fields,
	// 	errors,
	// 	onError,
	// 	formValues,
	// 	handleSubmit,
	// 	controls,
	// 	onSubmit,
	// } = useUpdateCancelShipment({
	// 	id,
	// 	setShowCancel,
	// 	refetch,
	// 	setShowBookingOption,
	// });

	return (
		<div>
			<div>
				<Button
					onClick={() => { setShowCancel(true); }}
					className={styles.buttonText}
				>
					Cancel Shipment
				</Button>
			</div>

		</div>
	);
}

export default CancelShipment;
