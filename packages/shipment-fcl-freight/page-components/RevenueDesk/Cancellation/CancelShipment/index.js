import React, { useState } from 'react';

// import useUpdateCancelShipment from '../../../../Fcl/hooks/useUpdateCancelShipment';
import styles from './styles.module.css';

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
			<div
				className={styles.buttonText}
				onClick={() => {
					setShowCancel(true);
				}}
			>
				Cancel Shipment
			</div>

		</div>
	);
}

export default CancelShipment;
