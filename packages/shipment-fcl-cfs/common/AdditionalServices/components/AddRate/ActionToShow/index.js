import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import styles from './styles.module.css';

const VALUE_ONE = 1;

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
	const { stakeholderConfig } = useContext(ShipmentDetailContext);

	const config = stakeholderConfig?.additional_services?.add_rate || {};

	const STAKEHOLDER_ALLOWED = {};

	Object.entries(config).forEach(([key, val]) => {
		STAKEHOLDER_ALLOWED[key?.split('::')?.[VALUE_ONE]] = val;
	});

	const {
		handleShipperConfirm,
		requestRateFromTechops,
		handleBuyPriceReRequest,
		handleShipperSideCancel,
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

	if (
		status?.status === 'amendment_requested_by_importer_exporter'
		&& !!STAKEHOLDER_ALLOWED.amendment_requested_by_importer_exporter
	) {
		return (
			<div className={styles.button_container}>
				<Button
					onClick={handleShipperSideCancel}
					disabled={loading}
					themeType="secondary"
				>
					Cancel Service
				</Button>
				<Button
					onClick={handleBuyPriceReRequest}
					disabled={loading}
					themeType="primary"
				>
					RE-REQUEST BUY PRICE
				</Button>
				<Button
					onClick={() => {
						handleSubmit(onAddRate)();
					}}
					disabled={loading}
				>
					RE-ADJUST SELL PRICE
				</Button>
			</div>
		);
	}

	if (status?.status === 'cancelled_by_supplier'
		&& !!STAKEHOLDER_ALLOWED.cancelled_by_supplier
	) {
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
