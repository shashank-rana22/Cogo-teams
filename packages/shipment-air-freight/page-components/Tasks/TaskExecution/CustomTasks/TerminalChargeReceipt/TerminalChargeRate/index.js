import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useCreateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useCreateShipmentAirFreightConsolidatedInvoice';
import useUpdateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useUpdateShipmentAirFreightConsolidatedInvoice';

import styles from './styles.module.css';
import getTerminalChargeRateControl from './terminalChargeRateControl';
import useCreateShipmentAdditionalService from './useCreateShipmentAdditionalService';

function TerminalChargeRate({
	sheetData = {}, mainServicesData = {}, refetch = () => {},
	onCancel = () => {}, task_id = '',
	shipmentData = {},
	csr_data = {},
}) {
	const [entityData, setEntityData] = useState({});
	const [irnGenerated, setIRNGenerated] = useState(true);
	const controls = getTerminalChargeRateControl({ setEntityData });
	const { formState:{ errors }, control, handleSubmit, setValue } = useForm();

	const { createShipmentAdditionalService } =	 useCreateShipmentAdditionalService({ shipmentData, setIRNGenerated });

	const {
		createShipmentAirFreightConsolidatedInvoice,
		loading, updateLoading,
		data:invoiceData,
	} = useCreateShipmentAirFreightConsolidatedInvoice({
		sheetData,
		mainServicesData,
		entityData,
		createShipmentAdditionalService,
	});

	const {
		updateShipmentAirFreightConsolidatedInvoice = () => {},
		loading:updateConsolidatedLoading,
		updateLoading:taskUpdateLoading,
	} = 	useUpdateShipmentAirFreightConsolidatedInvoice({ refetch, onCancel, task_id, invoiceData });

	const handleCreateProforma = (values) => {
		createShipmentAirFreightConsolidatedInvoice(values);
	};
	const handleIRNGeneration = () => {
		updateShipmentAirFreightConsolidatedInvoice();
	};

	useEffect(() => {
		const { ocr_data = {} } = csr_data || {};
		const { amount = 0, tax = 0, total_amount = 0 } = ocr_data;
		setValue('price', Number(amount));
		setValue('tax_price', Number(tax));
		setValue('total_tax_price', Number(total_amount));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [csr_data]);

	return (
		<div>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
			<div className={styles.button_container}>
				<Button
					onClick={handleSubmit(handleCreateProforma)}
					disabled={loading || updateLoading || !irnGenerated}
				>
					Create Proforma
				</Button>
				<Button
					onClick={() => { handleIRNGeneration(); }}
					disabled={irnGenerated || updateConsolidatedLoading || taskUpdateLoading}
				>
					IRN Generated
				</Button>
			</div>
		</div>

	);
}
export default TerminalChargeRate;
