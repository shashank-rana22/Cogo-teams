import { Button } from '@cogoport/components';

import useUpdateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../../hooks/useUpdateShipmentAirFreightConsolidatedInvoice';

import styles from './styles.module.css';

function GenerateIRN({
	invoiceData = [], createShipmentAdditionalService = () => {}, tcValues = {}, index = 0,
	setTerminalChargeState = () => {},
}) {
	const {
		loading = false,
		updateShipmentAirFreightConsolidatedInvoice = () => {},
		updateLoading = false,
	} = useUpdateShipmentAirFreightConsolidatedInvoice({
		invoiceData,
		createShipmentAdditionalService,
		index,
		setTerminalChargeState,
	});

	return (
		<div className={styles.flex}>
			<div>IRN Generation Pending</div>
			<Button
				onClick={() => updateShipmentAirFreightConsolidatedInvoice(tcValues)}
				disabled={loading || updateLoading}
			>
				Generate IRN
			</Button>
		</div>
	);
}

export default GenerateIRN;
