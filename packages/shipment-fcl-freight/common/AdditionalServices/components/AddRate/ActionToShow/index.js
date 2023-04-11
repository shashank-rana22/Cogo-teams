import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ActionsToShow({
	status,
	setAddRate = () => {},
	onAddRate,
	handleSubmit,
	setSecondStep,
	setAddSellPrice = () => {},
	updateResponse = {},
	loading,
	onCancel = () => {},
}) {
	const {
		handleShipperConfirm,
		requestRateFromTechops,
	} = updateResponse;

	if (status?.status === 'customer_confirmation_pending') {
		return (
			<div className={styles.button_container}>
				<Button
					onClick={() => setSecondStep(true)}
					disabled={loading}
					themeType="secondary"
				>
					Request Changes
				</Button>

				<Button disabled={loading} onClick={handleShipperConfirm}>
					Accept Service
				</Button>
			</div>
		);
	}

	if (status?.status === 'cancelled_by_supplier') {
		return (
			<div className={styles.button_container}>
				<Button
					onClick={() => {
						onCancel();
					}}
					disabled={loading}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					onClick={requestRateFromTechops}
					disabled={loading}
					themeType="primary"
				>
					Request From techops
				</Button>
				<Button disabled={loading} onClick={handleSubmit(onAddRate)}>
					Add New Rate
				</Button>
			</div>
		);
	}

	return (
		<div className={styles.button_container}>
			<Button
				onClick={() => {
					onCancel();
					setAddRate(false);
					setAddSellPrice(false);
				}}
				themeType="secondary"
				disabled={loading}
			>
				Cancel
			</Button>

			<Button
				onClick={handleSubmit(onAddRate)}
				disabled={loading}
				themeType="primary"
			>
				Submit
			</Button>
		</div>
	);
}

export default ActionsToShow;
