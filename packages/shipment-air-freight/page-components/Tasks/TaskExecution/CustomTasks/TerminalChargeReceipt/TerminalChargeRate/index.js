import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { useState } from 'react';

import useUpdateShipmentTerminalServiceTask from '../../../../../../hooks/useUpdateShipmentTerminalServiceTask';

import ChargeInformations from './ChargeInformations';
import styles from './styles.module.css';
import getTerminalChargeRateControl from './terminalChargeRateControl';

function TerminalChargeRate({
	mainServicesData = {},
	localServiceId = '',
	refetch = () => {},
	onCancel = () => {},
	task_id = '',
	type = 'terminal',
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

	const {
		updateShipmentTerminalServiceTask = () => {},
		loading: terminalServiceLoading = false,
	} = useUpdateShipmentTerminalServiceTask({
		type,
		task_id,
		refetch,
		onCancel,
		mainServicesData,
		localServiceId,
		sheetData,
		entityData,
		collectionPartyData,
	});

	const handleUpload = (values) => {
		updateShipmentTerminalServiceTask(values);
	};

	return (
		<div>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
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
					<Button onClick={onCancel} themeType="secondary" disabled={terminalServiceLoading}>
						Cancel
					</Button>
				</div>

				<Button
					onClick={handleSubmit(handleUpload)}
					disabled={terminalServiceLoading || Object.values(terminalChargeState).includes('fetching_data')}
				>
					Submit
				</Button>
			</div>
		</div>

	);
}
export default TerminalChargeRate;
