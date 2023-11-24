import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useListShipmentAirFreightConsolidatedInvoices
	from '../../../../../../hooks/useListShipmentAirFreightConsolidatedInvoices';
import useUpdateTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

import ChargeInformations from './ChargeInformations';
import ConfirmModal from './ConfirmModal';
import GeneratedTHC from './GeneratedTHC';
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
	localServiceId = '',
}) {
	const [entityData, setEntityData] = useState({});

	const [collectionPartyData, setCollectionPartyData] = useState({});
	const [sheetData, setSheetData] = useState({});

	const [terminalChargeState, setTerminalChargeState] = useState({ 0: 'create' });

	const [showConfirm, setShowConfirm] = useState(false);

	const controls = getTerminalChargeRateControl({
		entityData,
		setEntityData,
		collectionPartyData,
		setCollectionPartyData,
	});

	const { formState:{ errors }, control, handleSubmit, setValue } = useForm();

	const { createShipmentAdditionalService = () => {} } = useCreateShipmentAdditionalService({
		shipmentData,
		type,
	});

	const { data = {} } = useListShipmentAirFreightConsolidatedInvoices({
		type, localServiceId, mainServicesData,
	});

	const { list = [] } = data || {};

	const {
		apiTrigger = () => {},
		loading:updateLoading = false,
	} = useUpdateTask({ refetch, onCancel });

	const isEdit = !isEmpty(list);

	useEffect(() => {
		if (!isEmpty(list)) {
			setTerminalChargeState({ [list.length]: 'create' });
		}
	}, [list]);

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
			{isEdit ? (list).map((item, i) => (
				<GeneratedTHC
					key={item?.id}
					index={i}
					item={item}
					createShipmentAdditionalService={createShipmentAdditionalService}
				/>
			)) : null}
			{(Object.keys(terminalChargeState)).map((i) => (
				<div key={i}>
					<ChargeInformations
						index={Number(i)}
						type={type}
						list={list}
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
						[(Number(Object.keys(prev)[Object.keys(prev).length - 1]) + 1) || list.length]: 'create',
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
					onClick={() => setShowConfirm(true)}
					disabled={updateLoading || Object.values(terminalChargeState).includes('fetching_data')}
				>
					Submit
				</Button>
			</div>
			{
				showConfirm && (
					<ConfirmModal
						showConfirm={showConfirm}
						setShowConfirm={setShowConfirm}
						type={type}
						localServiceId={localServiceId}
						mainServicesData={mainServicesData}
						apiTrigger={apiTrigger}
						updateLoading={updateLoading}
						taskId={task_id}
					/>
				)
			}
		</div>

	);
}
export default TerminalChargeRate;
