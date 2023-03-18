import { Button } from '@cogoport/components';
import React from 'react';

import useGetPermission from '../../../../../hooks/useGetPermission';
import CC from '../../../../../utils/condition-constants';

import styles from './styles.module.css';

function ActionsToShow({
	status,
	setAddRate,
	addRate,
	handleSubmit,
	setSecondStep,
	updateDatas,
	loading,
	onCancel = () => {},
}) {
	const {
		handleShipperConfirm,
		handleShipperSideCancel,
		handleBuyPriceReRequest,
		requestRateFromTechops,
	} = updateDatas;

	const { isConditionMatches } = useGetPermission();

	if (status?.status === 'customer_confirmation_pending') {
		return (
			<div className={styles.button_container}>
				<Button
					onClick={() => setSecondStep(true)}
					disabled={loading}
					className="secondary md"
				>
					Request Changes
				</Button>

				<Button disabled={loading} onClick={handleSubmit(handleShipperConfirm)}>
					Accept Service
				</Button>
			</div>
		);
	}

	if (
		status?.status === 'amendment_requested_by_importer_exporter' && isConditionMatches(CC.BOOKING_AGENT_VIEW, 'or')
	) {
		return (
			<div className={styles.button_container}>
				<Button
					onClick={handleShipperSideCancel}
					disabled={loading}
					className="secondary md"
				>
					Cancel Service
				</Button>
				<Button
					onClick={handleBuyPriceReRequest}
					disabled={loading}
					className="secondary md"
				>
					RE-REQUEST BUY PRICE
				</Button>
				<Button
					onClick={() => {
						handleSubmit(addRate)();
					}}
					disabled={loading}
				>
					RE-ADJUST SELL PRICE
				</Button>
			</div>
		);
	}

	if (
		status?.status === 'cancelled_by_supplier' && isConditionMatches(CC.SERVICE_OPS_VIEW)
	) {
		return (
			<div className={styles.button_container}>
				<Button
					onClick={() => {
						onCancel();
						setAddRate(null);
					}}
					disabled={loading}
					className="secondary md"
				>
					Cancel
				</Button>
				<Button
					onClick={requestRateFromTechops}
					disabled={loading}
					className="secondary md"
				>
					Request From techops
				</Button>
				<Button disabled={loading} onClick={handleSubmit(addRate)}>
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
					setAddRate(null);
				}}
				className="secondary md"
				disabled={loading}
			>
				Cancel
			</Button>

			<Button
				onClick={() => {
					handleSubmit(addRate)();
				}}
				disabled={loading}
			>
				Submit
			</Button>
		</div>
	);
}

export default ActionsToShow;
