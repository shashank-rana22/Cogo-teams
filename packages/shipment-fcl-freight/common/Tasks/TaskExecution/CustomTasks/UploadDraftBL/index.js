// import { Flex, Text } from '@cogo/commons/components';
import { Button, Text } from '@cogoport/components';
import { useEffect, useRef, useState } from 'react';

import TaskContainer from '../TaskContainer';

import HBLCreate from './HBLCreate';
import useDraftBLApis from './hooks/useDraftBLApis';
import MBLDetails from './MBLDetails';
import styles from './styles.module.css';
import UploadHbl from './UploadHbl';

function UploadDraftBL({
	summary = {},
	pendingTask = {},
	refetch = () => {},
	clearTask = () => {},
	services = [],
	selectedMail = {},
}) {
	const [hblData, setHblData] = useState([]);
	const [hblLoading, setHblLoading] = useState(false);
	const [isAllHBLUploaded, setIsAllHblUploaded] = useState(false);
	const [showSwitchGenerate, setShowSwitchGenerate] = useState(true);
	const [uploadedDocs, setuploadedDocs] = useState([]);
	const [canUseSwitch, setcanUseSwitch] = useState(true);
	const mblRef = useRef();

	const fcl_or_lcl_service =		(services || []).find(
		(service) => service?.service_type === 'fcl_freight_service'
				|| service?.service_type === 'lcl_freight_service',
	) || {};

	const isHBL =		(fcl_or_lcl_service?.bl_category || '').toLowerCase() === 'hbl'
		|| (summary?.bl_category || '').toLowerCase() === 'hbl';

	const initial_step =		(fcl_or_lcl_service?.bl_category || '').toLowerCase()
		|| (summary?.bl_category || '').toLowerCase();

	const [step, setStep] = useState(initial_step || '');

	const blCount = fcl_or_lcl_service?.bls_count || summary?.bls_count || 0;
	const isShipmentId =		pendingTask?.shipment_id || summary?.shipment_id || summary?.id;

	const {
		listDocsAPI,
		shipmentListDocsAPI,
		createShipmentDocAPI,
		createHBL,
		submitMBL,
	} = useDraftBLApis({
		isShipmentId,
		isHBL,
		pendingTask,
		fcl_or_lcl_service,
		clearTask,
		refetch,
		summary,
	});

	const shipmentDocsLength = shipmentListDocsAPI?.data?.list?.length;
	const tradeDocsLength = listDocsAPI?.data?.list?.length;
	const showUploadView = shipmentDocsLength > 0 && tradeDocsLength === 0;

	const refetchDocs = async () => {
		await shipmentListDocsAPI.trigger();
		setcanUseSwitch(false);
		const condition =			tradeDocsLength >= blCount || shipmentDocsLength >= blCount;

		setIsAllHblUploaded(condition);
		if (fcl_or_lcl_service.service_type === 'lcl_freight_service') {
			refetch();
			clearTask();
			return;
		}
		if (condition) {
			setStep('mbl');
		}
	};

	useEffect(() => {
		setcanUseSwitch(
			(shipmentDocsLength || 0) <= 0 && (tradeDocsLength || 0) <= 0,
		);
		setuploadedDocs(shipmentListDocsAPI?.data?.list);
		setIsAllHblUploaded(
			tradeDocsLength >= blCount || shipmentDocsLength >= blCount,
		);
	}, [shipmentListDocsAPI?.data?.list, listDocsAPI?.data?.list]);

	const handleSaveHBL = (index, values) => {
		if (values) {
			setHblData((old) => {
				const newValues = [...old];
				newValues[index] = values;
				return newValues;
			});
		}
	};

	const handleClickOnNext = async () => {
		if (step === 'hbl') {
			setStep('mbl');
		} else {
			await submitMBL({ mblRef });
		}
	};

	const isNextDisabled =		(isHBL && !isAllHBLUploaded)
		|| ((!isHBL || isAllHBLUploaded) && createShipmentDocAPI.loading);

	const saveAllBls = async () => {
		await createHBL({
			setHblLoading,
			hblData,
			summary,
		});
		await listDocsAPI.trigger();
		setcanUseSwitch(false);
		setIsAllHblUploaded(tradeDocsLength >= blCount);
	};

	const handleClickSwitch = () => {
		setShowSwitchGenerate(!showSwitchGenerate);
	};

	useEffect(() => {
		setShowSwitchGenerate(!showUploadView);
	}, [showUploadView]);

	return (
		<TaskContainer
			loading={listDocsAPI?.loading || shipmentListDocsAPI?.loading}
			pendingTask={pendingTask}
			actions={(
				<>
					{canUseSwitch && isHBL ? (
						<Button
							disabled={listDocsAPI?.loading || hblLoading}
							onClick={handleClickSwitch}
							size="sm"
							id="bm_pt_switch_bl_upload"
							style={{ marginRight: '10px' }}
						>
							{showSwitchGenerate ? 'Switch to upload' : 'Switch to create'}
						</Button>
					) : null}

					{fcl_or_lcl_service?.service_type === 'fcl_freight_service' ? (
						<Button
							disabled={isNextDisabled}
							onClick={handleClickOnNext}
							size="sm"
							id="bm_pt_bl_upload_submit"
						>
							{step === 'hbl' && isHBL ? 'Next: MBL Details' : null}
							{step === 'mbl' || !isHBL ? 'Submit' : null}
						</Button>
					) : null}
				</>
			)}
		>
			{isHBL && step === 'hbl' ? (
				<div>
					{showSwitchGenerate ? (
						<div>
							{Array(blCount)
								.fill(null)
								.map((n, i) => (
									<div className={styles.flex_container}>
										<Text size={12} marginBottom={8} bold>
											HBL
											{' '}
											{i + 1}
										</Text>
										<HBLCreate
											completed={listDocsAPI?.data?.list?.[i]}
											hblData={hblData[i] || listDocsAPI?.data?.list?.[i]?.data}
											onSave={(v) => handleSaveHBL(i, v)}
											summary={summary}
											services={services}
										/>
									</div>
								))}
							{!isAllHBLUploaded ? (
								<div className={styles.flex_end}>
									<Button
										disabled={hblLoading || hblData?.length !== blCount}
										onClick={saveAllBls}
										size="sm"
										id="bm_pt_bl_upload_save_all_hbls"
									>
										{fcl_or_lcl_service?.service_type === 'fcl_freight_service'
											? 'Save All HBLs'
											: 'Submit'}
									</Button>
								</div>
							) : null}
						</div>
					) : (
						<UploadHbl
							refetchDocs={refetchDocs}
							data={pendingTask}
							bls_count={blCount}
							docs={uploadedDocs}
							summary={summary}
						/>
					)}
				</div>
			) : null}

			{(step === 'mbl' || !isHBL) && (
				<MBLDetails
					ref={mblRef}
					pendingTask={pendingTask}
					selectedMail={selectedMail}
					summary={summary}
				/>
			)}
		</TaskContainer>
	);
}

export default UploadDraftBL;
