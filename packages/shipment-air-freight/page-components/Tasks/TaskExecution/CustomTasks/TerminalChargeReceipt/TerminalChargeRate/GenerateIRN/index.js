import { Button } from '@cogoport/components';

import useUpdateShipmentAirCsrSheet from '../../../../../../../hooks/useUpdateShipmentAirCsrSheet';
import useUpdateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../../hooks/useUpdateShipmentAirFreightConsolidatedInvoice';

import styles from './styles.module.css';

function GenerateIRN({
	invoiceData = [], createShipmentAdditionalService = () => {}, tcValues = {}, index = 0,
	terminalChargeState = {}, setTerminalChargeState = () => {}, sheetId = '', listLength = 0,
}) {
	const {
		loading = false,
		updateShipmentAirFreightConsolidatedInvoice = () => {},
		updateLoading = false,
	} = useUpdateShipmentAirFreightConsolidatedInvoice({
		invoiceData,
		createShipmentAdditionalService,
		index,
		listLength,
		terminalChargeState,
		setTerminalChargeState,
	});

	const {
		loading:updateCsrLoading = false,
		updateShipmentAirCsrSheet = () => {},
	} = useUpdateShipmentAirCsrSheet({ sheetId });

	return (
		<div className={styles.flex}>
			<div>
				<div className={styles.heading}>IRN Generation Pending for</div>
				<div className={styles.values}>
					<span>Invoice No : </span>
					{' '}
					{tcValues?.receipt_reference_no || tcValues?.[`csr_reference_number_${index}`]}
				</div>
				<div className={styles.values}>
					<span>Amount : </span>
					{' '}
					{tcValues?.tax_price || tcValues?.[`price_${index}`] || 0}
				</div>
				<div className={styles.values}>
					<span>Total Amount : </span>
					{' '}
					{tcValues?.tax_total_price || tcValues?.[`total_tax_price_${index}`] || 0}
				</div>
			</div>
			<div className={styles.flex}>
				<Button
					onClick={() => {
						updateShipmentAirFreightConsolidatedInvoice({
							values : tcValues,
							status : 'inactive',
						});
						updateShipmentAirCsrSheet('inactive');
					}}
					disabled={loading || updateLoading || updateCsrLoading}
					themeType="secondary"
					style={{ marginRight: 20 }}
				>
					Reject Invoice
				</Button>
				<Button
					onClick={() => updateShipmentAirFreightConsolidatedInvoice({
						values : tcValues,
						status : 'finance_approved',
					})}
					disabled={loading || updateLoading || updateCsrLoading}
				>
					Generate IRN
				</Button>
			</div>
		</div>
	);
}

export default GenerateIRN;
