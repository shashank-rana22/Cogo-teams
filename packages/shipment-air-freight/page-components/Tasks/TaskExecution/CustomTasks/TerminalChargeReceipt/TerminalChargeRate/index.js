import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { useState } from 'react';

import useUpdateTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

import ChargeInformations from './ChargeInformations';
import styles from './styles.module.css';
import getTerminalChargeRateControl from './terminalChargeRateControl';
import useCreateShipmentAdditionalService from './useCreateShipmentAdditionalService';

function TerminalChargeRate({
	mainServicesData = {},
	refetch = () => {},
	onCancel = () => {},
	task_id = '',
	type = 'terminal',
	shipmentData = {},
}) {
	const [entityData, setEntityData] = useState({});

	const [collectionPartyData, setCollectionPartyData] = useState({});
	const [sheetData, setSheetData] = useState({});

	const [terminalChargeState, setTerminalChargeState] = useState({ 0: 'create' });

	const controls = getTerminalChargeRateControl({
		entityData,
		setEntityData,
		collectionPartyData,
		setCollectionPartyData,
	});

	const { formState:{ errors }, control, handleSubmit, setValue } = useForm();

	const { createShipmentAdditionalService = () => {} } = useCreateShipmentAdditionalService({
		shipmentData,
	});

	const {
		apiTrigger = () => {},
		loading:updateLoading = false,
	} = useUpdateTask({ refetch, onCancel });

	return (
		<div className={styles.tc_container}>
			<fieldset>
				<legend>Enter basic details</legend>
				<Layout
					fields={controls}
					control={control}
					errors={errors}
				/>
			</fieldset>
			{(Object.keys(terminalChargeState)).map((i) => (
				<div key={i}>
					<ChargeInformations
						index={Number(i)}
						type={type}
						sheetData={sheetData}
						control={control}
						errors={errors}
						setValue={setValue}
						setSheetData={setSheetData}
						mainServicesData={mainServicesData}
						terminalChargeState={terminalChargeState}
						setTerminalChargeState={setTerminalChargeState}
						handleSubmit={handleSubmit}
						entityData={entityData}
						collectionPartyData={collectionPartyData}
						createShipmentAdditionalService={createShipmentAdditionalService}
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
				<div style={{ margin: '0 10px 0 0' }}>
					<Button onClick={onCancel} themeType="secondary" disabled={updateLoading}>
						Cancel
					</Button>
				</div>

				<Button
					onClick={() => apiTrigger(task_id)}
					disabled={updateLoading || Object.values(terminalChargeState).includes('fetching_data')}
				>
					Submit
				</Button>
			</div>
		</div>

	);
}
export default TerminalChargeRate;
