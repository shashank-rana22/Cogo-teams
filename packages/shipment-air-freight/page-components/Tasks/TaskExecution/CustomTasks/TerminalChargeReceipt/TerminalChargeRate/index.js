import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { useState } from 'react';

import useCreateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useCreateShipmentAirFreightConsolidatedInvoice';

import getTerminalChargeRateControl from './terminalChargeRateControl';

function TerminalChargeRate({
	sheetData = {}, mainServicesData = {}, refetch = () => {},
	onCancel = () => {}, task_id = '',
}) {
	const [entityData, setEntityData] = useState({});
	const controls = getTerminalChargeRateControl({ setEntityData });
	const { formState:{ errors }, control, handleSubmit } = useForm();

	const {
		createShipmentAirFreightConsolidatedInvoice,
		loading, updateLoading,
	} = useCreateShipmentAirFreightConsolidatedInvoice({
		sheetData,
		mainServicesData,
		entityData,
		refetch,
		onCancel,
		task_id,
	});

	const handleCreateProforma = (values) => {
		createShipmentAirFreightConsolidatedInvoice(values);
	};

	return (
		<div>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
			<Button
				onClick={handleSubmit(handleCreateProforma)}
				disabled={loading || updateLoading}
			>
				Create Proforma
			</Button>
		</div>

	);
}
export default TerminalChargeRate;
