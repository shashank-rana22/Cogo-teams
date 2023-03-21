import { Button } from '@cogoport/components';
import React from 'react';

// import Layout from '../../Layout';
// import getShowElements from '../helpers/getShowElements';
import styles from './styles.module.css';

function CancellationModal({
	showRequest = '',
	handleSubmit = () => {},
	onSubmit = () => {},
	loading = false,
	disabledButton = false,
	onErrors = () => {},
	handleClose = () => {},
}) {
	// const showElements = getShowElements(formValues);

	return (
		// className={isIE ? 'ie' : ''}
		<div className={styles.container}>
			Hii
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

			<div className={styles.button}>
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
}

export default CancellationModal;
