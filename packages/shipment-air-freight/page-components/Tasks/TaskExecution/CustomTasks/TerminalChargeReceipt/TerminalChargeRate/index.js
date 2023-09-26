import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useCreateShipmentAirCSRSheet from '../../../../../../hooks/useCreateShipmentAirCSRSheet';
import useCreateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useCreateShipmentAirFreightConsolidatedInvoice';
import useGetShipmentAirCSROCRSheetData from '../../../../../../hooks/useGetShipmentAirCSROCRSheetData';
import useUpdateShipmentAirFreightConsolidatedInvoice
	from '../../../../../../hooks/useUpdateShipmentAirFreightConsolidatedInvoice';
import ChargeReceiptInformations from '../ChargeReceiptInformations';
import UploadTerminalCharge from '../UploadTerminalCharge';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';
import getTerminalChargeRateControl from './terminalChargeRateControl';
import useCreateShipmentAdditionalService from './useCreateShipmentAdditionalService';

const TIME_TO_FETCH_CSR_DATA = 15000;
const INITIAL_VALUE = 1;

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
	const [chargeInformations, setChargeInformations] = useState(INITIAL_VALUE);
	const [terminalChargeState, setTerminalChargeState] = useState('create');

	console.log('setChargeInformations', setChargeInformations);

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

	const { getCSROCRData, data } = useGetShipmentAirCSROCRSheetData({ setTerminalChargeState, sheetData });

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

	useEffect(() => {
		if (terminalChargeState === 'fetching_data') {
			const timeoutId = setTimeout(getCSROCRData, TIME_TO_FETCH_CSR_DATA);
			return () => clearTimeout(timeoutId);
		}
		return () => {};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [terminalChargeState]);

	return (
		<div>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
			{Array.from(Array(chargeInformations).keys()).map((i) => (
				<div key={i}>
					{terminalChargeState === 'create'
						? (
							<UploadTerminalCharge
								setTerminalChargeState={setTerminalChargeState}
								mainServicesData={mainServicesData}
								setSheetData={setSheetData}
								sheetData={sheetData}
							/>
						)
						: null}
					{terminalChargeState === 'fetching_data'
						? <div> Wait for 15 seconds to fetch the data</div>
						: null}
					{terminalChargeState === 'data_fetched' ? (
						<ChargeReceiptInformations
							control={control}
							errors={errors}
							setValue={setValue}
							csr_data={data}
						/>
					) : null}
				</div>
			))}
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
