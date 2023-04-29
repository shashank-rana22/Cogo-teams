import { Button } from '@cogoport/components';
import { useEffect, useRef, useState } from 'react';

import useListDocuments from '../../../../../hooks/useListDocuments';
import TaskContainer from '../common/TaskContainer';

// import HBLCreate from './HBLCreate';
import useDraftBLHelper from './hooks/useDraftBLHelper';
import MBLDetails from './MBLDetails';
// import styles from './styles.module.css';
import UploadHbl from './UploadHbl';

function UploadDraftBL({
	task = {},
	shipmentData = {},
	primaryService = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	servicesList = [],
}) {
	// const [hblData, setHblData] = useState([]);
	// const [hblLoading, setHblLoading] = useState(false);
	// const [isAllHBLUploaded, setIsAllHblUploaded] = useState(false);
	const [showSwitchGenerate, setShowSwitchGenerate] = useState(true);
	// const [uploadedDocs, setuploadedDocs] = useState([]);
	const [canUseSwitch, setcanUseSwitch] = useState(true);
	const mblRef = useRef();

	const isHBL =		(primaryService.bl_category || '').toLowerCase() === 'hbl';

	const initial_step = primaryService.bl_category;

	const [step, setStep] = useState(initial_step || '');

	const blCount = primaryService.bls_count;

	const fcl_or_lcl_service =		(servicesList || []).find(
		(service) => service?.service_type === 'fcl_freight_service'
				|| service?.service_type === 'lcl_freight_service',
	) || {};

	const shipmentDocsParams = {
		performed_by_org_id : task?.organization_id,
		service_type        : fcl_or_lcl_service?.service_type,
		filters             : {
			shipment_id   : task?.shipment_id,
			document_type : 'draft_house_bill_of_lading',
		},
	};

	const { list: uploadedDocs, loading, refetch: refetchDocs } = useListDocuments({ defaultParams: shipmentDocsParams });

	const {
		listDocsAPI,
		shipmentListDocsAPI,
		// createShipmentDocAPI,
		// createHBL,
		submitMBL,
	} = useDraftBLHelper({
		isHBL,
		task,
		primaryService,
		onCancel,
		taskListRefetch,
		shipmentData,
	});

	const shipmentDocsLength = shipmentListDocsAPI?.data?.list?.length;
	const tradeDocsLength = listDocsAPI?.data?.list?.length;
	const showUploadView = shipmentDocsLength > 0 && tradeDocsLength === 0;

	// const refetchDocs = async () => {
	// 	await shipmentListDocsAPI.trigger();
	// 	setcanUseSwitch(false);
	// 	const condition =			tradeDocsLength >= blCount || shipmentDocsLength >= blCount;

	// 	setIsAllHblUploaded(condition);

	// 	if (condition) {
	// 		setStep('mbl');
	// 	}
	// };

	// useEffect(() => {
	// 	setcanUseSwitch(
	// 		(shipmentDocsLength || 0) <= 0 && (tradeDocsLength || 0) <= 0,
	// 	);
	// 	setuploadedDocs(shipmentListDocsAPI?.data?.list);
	// 	setIsAllHblUploaded(
	// 		tradeDocsLength >= blCount || shipmentDocsLength >= blCount,
	// 	);
	// }, [shipmentListDocsAPI?.data?.list, listDocsAPI?.data?.list]);

	// const handleSaveHBL = (index, values) => {
	// 	if (values) {
	// 		setHblData((old) => {
	// 			const newValues = [...old];
	// 			newValues[index] = values;
	// 			return newValues;
	// 		});
	// 	}
	// };

	const handleClickOnNext = async () => {
		if (step === 'hbl') {
			setStep('mbl');
		} else {
			await submitMBL({ mblRef });
		}
	};

	// const isNextDisabled =		(isHBL && !isAllHBLUploaded)
	// 	|| ((!isHBL || isAllHBLUploaded) && createShipmentDocAPI.loading);

	// const saveAllBls = async () => {
	// 	await createHBL({
	// 		setHblLoading,
	// 		hblData,
	// 		shipmentData,
	// 	});
	// 	await listDocsAPI.trigger();
	// 	setcanUseSwitch(false);
	// 	setIsAllHblUploaded(tradeDocsLength >= blCount);
	// };

	const handleClickSwitch = () => {
		setShowSwitchGenerate(!showSwitchGenerate);
	};

	useEffect(() => {
		// setShowSwitchGenerate(!showUploadView);
	}, [showUploadView]);

	return (
		<TaskContainer
			loading={listDocsAPI?.loading || loading}
			pendingTask={task}
			actions={(
				<>
					{canUseSwitch && !isHBL ? (
						<Button
							disabled={listDocsAPI?.loading}
							onClick={handleClickSwitch}
							size="sm"
							id="bm_pt_switch_bl_upload"
							style={{ marginRight: '10px' }}
						>
							{showSwitchGenerate ? 'Switch to upload' : 'Switch to create'}
						</Button>
					) : null}

					<Button
						// disabled={isNextDisabled}
						onClick={handleClickOnNext}
						size="sm"
						id="bm_pt_bl_upload_submit"
					>
						{step === 'hbl' && isHBL ? 'Next: MBL Details' : null}
						{step === 'mbl' || !isHBL ? 'Submit' : null}
					</Button>

				</>
			)}
		>
			<div>
				{isHBL && step === 'hbl' ? (
					<div>
						{/* {showSwitchGenerate ? (
							<div>
								{Array(blCount)
									.fill(null)
									.map((n, i) => (
										<div className={styles.flex_container}>
											<div size={12}>
												HBL
												{' '}
												{i + 1}
											</div>
											<HBLCreate
												completed={listDocsAPI?.data?.list?.[i]}
												hblData={hblData[i] || listDocsAPI?.data?.list?.[i]?.data}
												onSave={(v) => handleSaveHBL(i, v)}
												shipmentData={shipmentData}
												primaryService={primaryService}
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
											Save All HBLs
										</Button>
									</div>
								) : null}
							</div>
						) : ( */}
						<UploadHbl
							refetchDocs={refetchDocs}
							task={task}
							bls_count={blCount}
							docs={uploadedDocs?.list}
							shipmentData={shipmentData}
						/>
						{/* )} */}
					</div>
				) : null}

				{(step === 'mbl' || !isHBL) && (
					<MBLDetails
						ref={mblRef}
						task={task}
					// selectedMail={selectedMail}
						shipmentData={shipmentData}
						primaryService={primaryService}
					/>
				)}
			</div>
		</TaskContainer>
	);
}

export default UploadDraftBL;
