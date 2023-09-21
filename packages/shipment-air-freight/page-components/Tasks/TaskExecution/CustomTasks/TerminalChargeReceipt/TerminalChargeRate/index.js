import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useCreateShipmentAirFreightConsolidatedInvoice';
import useUpdateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useUpdateShipmentAirFreightConsolidatedInvoice';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';
import getTerminalChargeRateControl from './terminalChargeRateControl';
import useCreateShipmentAdditionalService from './useCreateShipmentAdditionalService';

function TerminalChargeRate({
	mainServicesData = {},
	refetch = () => {},
	onCancel = () => {},
	task_id = '',
	shipmentData = {},
	type = 'terminal',
}) {
	const [entityData, setEntityData] = useState({});
	const [irnGenerated, setIRNGenerated] = useState(true);
	const [collectionPartyData, setCollectionPartyData] = useState({});
	const [sheetData, setSheetData] = useState({});
	const [showConfirm, setShowConfirm] = useState({});

	const controls = getTerminalChargeRateControl({
		type,
		entityData,
		setEntityData,
		collectionPartyData,
		setCollectionPartyData,
	});

	const { formState:{ errors }, control, handleSubmit } = useForm();

	const { createShipmentAdditionalService } =	useCreateShipmentAdditionalService({
		shipmentData,
		setIRNGenerated,
		setShowConfirm,
	});

	const {
		createShipmentAirFreightConsolidatedInvoice,
		loading, updateLoading,
		data:invoiceData,
	} = useCreateShipmentAirFreightConsolidatedInvoice({
		type,
		sheetData,
		mainServicesData,
		entityData,
		collectionPartyData,
		createShipmentAdditionalService,
	});

	const {
		updateShipmentAirFreightConsolidatedInvoice = () => {},
		loading: updateConsolidatedLoading,
		updateLoading: taskUpdateLoading,
	} = 	useUpdateShipmentAirFreightConsolidatedInvoice({ refetch, onCancel, task_id, invoiceData });

	const handleCreateProforma = (values) => {
		createShipmentAirFreightConsolidatedInvoice(values);
	};

	const handleIRNGeneration = () => {
		updateShipmentAirFreightConsolidatedInvoice();
	};

	const handleUpload = (values) => {
		setShowConfirm(values);
	};

	return (
		<div>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
			<div className={styles.button_container}>
				<Button
					onClick={handleSubmit(handleUpload)}
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
			{!isEmpty(showConfirm) ? (
				<ConfirmModal
					showConfirm={showConfirm}
					setShowConfirm={setShowConfirm}
					setSheetData={setSheetData}
					handleSubmit={handleSubmit}
					handleCreateProforma={handleCreateProforma}
					loading={loading}
					updateLoading={updateLoading}
					irnGenerated={irnGenerated}
					mainServicesData={mainServicesData}
				/>
			) : null}
		</div>

	);
}
export default TerminalChargeRate;
