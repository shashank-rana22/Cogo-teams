import React from 'react';
import { Button } from '@cogoport/components';
// import Layout from '../../Layout';
import getShowElements from '../../utils/revenueDeskUtils/getShowElements';
import styles from './styles.module.css'

const CancellationModal = ({
	isIE = '',
	showRequest = '',
	formValues = {},
	handleSubmit = () => {},
	onSubmit = () => {},
	loading = false,
	fields = { fields },
	modifiedControls = [],
	disabledButton = false,
	onErrors = () => {},
	errors = {},
	handleClose = () => {},
}) => {
	const showElements = getShowElements(formValues);

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<div className={styles.title}>
					{showRequest
						? 'Cancellation Requested by customer'
						: 'Cancel Shipment'}
				</div>

				{/* <Layout
					fields={fields}
					controls={modifiedControls}
					errors={errors}
					themeType="admin"
					showElements={showElements}
				/> */}
			</div>

			<div className={styles.line} />

			<div className={styles.buttonDiv}>
				{!showRequest ? (
					<Button
						className="secondary md"
						onClick={handleClose}
						disabled={loading || disabledButton}
						style={{ marginRight: '8px' }}
					>
						Cancel
					</Button>
				) : null}

				<Button
					className="primary md"
					disabled={loading || disabledButton}
					onClick={handleSubmit(onSubmit, onErrors)}
				>
					{!loading ? 'Confirm Cancellation' : 'Confirming...'}
				</Button>
			</div>
		</div>
	);
};

export default CancellationModal;
