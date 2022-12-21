import React from 'react';
import CancellationModal from '../../../../commons/CancellationModal';
// import useUpdateCancelShipment from '../../../../Fcl/hooks/useUpdateCancelShipment';
import { Modal } from '@cogoport/components';
import styles from './styles.module.css'

const CancelShipment = ({
	showCancel = false,
	setShowCancel = () => {},
	setShow = () => {},
	id,
	refetch = () => {},
	setShowBookingOption = () => {},
}) => {

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
	

	const handleClose = () => {
		setShowCancel(false);
		setShow(false);
	};

	return (
		<div>
			<div className={styles.buttonText}
				onClick={() => {
					setShowCancel(true);
					setShow(false);
				}}
			>
				Cancel Shipment
			</div>

			{/* {showCancel ? (
				<Modal
					className="primary xl"
					show={showCancel}
					onClose={handleClose}
					styles={{ dialog: { width: 700 } }}
				>
					<CancellationModal
						formValues={formValues}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						loading={loading}
						fields={fields}
						modifiedControls={controls}
						onErrors={onError}
						errors={errors}
						showRequest={false}
						handleClose={handleClose}
						id={id}
					/>
				</Modal>
			) : null} */}
		</div>
	);
};

export default CancelShipment;