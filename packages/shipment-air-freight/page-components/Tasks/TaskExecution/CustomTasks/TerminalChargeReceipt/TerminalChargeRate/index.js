import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { useState } from 'react';

import useCreateShipmentAirCSRSheet from '../../../../../../hooks/useCreateShipmentAirCSRSheet';
import useCreateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useCreateShipmentAirFreightConsolidatedInvoice';
import useUpdateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useUpdateShipmentAirFreightConsolidatedInvoice';

import ChargeInformations from './ChargeInformations';
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
	const [showConfirm, setShowConfirm] = useState(false);
	const [terminalChargeState, setTerminalChargeState] = useState({ 0: 'create' });

	const controls = getTerminalChargeRateControl({
		type,
		entityData,
		setEntityData,
		collectionPartyData,
		setCollectionPartyData,
	});

	const { formState:{ errors }, control, handleSubmit, setValue } = useForm();

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

	const { createShipmentAirCSRSheet = () => {}, csrCreateLoading = false } = useCreateShipmentAirCSRSheet({
		mainServicesData,
		setSheetData,
	});

	const handleCreateProforma = (values) => {
		createShipmentAirFreightConsolidatedInvoice(values);
	};

	const handleIRNGeneration = () => {
		updateShipmentAirFreightConsolidatedInvoice();
	};

	const handleUpload = (values) => {
		setShowConfirm(true);
		createShipmentAirCSRSheet(values);
	};

	return (
		<div>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
			{Array.from(Array(Object.keys(terminalChargeState).length).keys()).map((i) => (
				<div key={i}>
					<ChargeInformations
						index={i}
						sheetData={sheetData}
						control={control}
						errors={errors}
						setValue={setValue}
						setSheetData={setSheetData}
						mainServicesData={mainServicesData}
						terminalChargeState={terminalChargeState}
						setTerminalChargeState={setTerminalChargeState}
					/>
				</div>
			))}

			<Button
				size="sm"
				themeType="secondary"
				onClick={() => {
					setTerminalChargeState((prev) => ({
						...prev,
						[[Object.keys(prev).length]]: 'create',
					}));
				}}
				className={styles.add_button}
			>
				+ Add
			</Button>

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
			{showConfirm ? (
				<ConfirmModal
					showConfirm={showConfirm}
					setShowConfirm={setShowConfirm}
					handleSubmit={handleSubmit}
					handleCreateProforma={handleCreateProforma}
					loading={loading}
					updateLoading={updateLoading}
					irnGenerated={irnGenerated}
					csrCreateLoading={csrCreateLoading}
				/>
			) : null}
		</div>

	);
}
export default TerminalChargeRate;
