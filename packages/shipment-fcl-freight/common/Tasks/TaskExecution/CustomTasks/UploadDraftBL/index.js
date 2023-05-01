import { Button } from '@cogoport/components';
import { useEffect, useRef, useState } from 'react';

import useListDocuments from '../../../../../hooks/useListDocuments';
import useListTradeDocuments from '../../../../../hooks/useListTradeDocuments';
import TaskContainer from '../common/TaskContainer';

import HBLCreate from './HBLCreate';
import useDraftBLHelper from './hooks/useDraftBLHelper';
import MBLDetails from './MBLDetails';
import styles from './styles.module.css';
import UploadHbl from './UploadHbl';

function UploadDraftBL({
	task = {},
	shipmentData = {},
	primaryService = {},
	onCancel = () => {},
	taskListRefetch = () => {},
	servicesList = [],
}) {
	const [hblData, setHblData] = useState([]);
	// const [hblLoading, setHblLoading] = useState(false);
	const [isAllHBLUploaded, setIsAllHblUploaded] = useState(false);
	const [showSwitchGenerate, setShowSwitchGenerate] = useState(true);
	// const [uploadedDocs, setuploadedDocs] = useState([]);
	const [canUseSwitch, setcanUseSwitch] = useState(true);
	const mblRef = useRef();

	const isHBL = (primaryService.bl_category || '').toLowerCase() === 'hbl';

	const initial_step = primaryService.bl_category;

	const [step, setStep] = useState(initial_step || '');

	const blCount = primaryService.bls_count;

	const fclOrLclService = (servicesList || []).find(
		(service) => service?.service_type === 'fcl_freight_service'
				|| service?.service_type === 'lcl_freight_service',
	) || {};

	const {
		list: uploadedDocs,
		loading,
		refetch: refetchDocs,
	} = useListDocuments({
		defaultParams: {
			performed_by_org_id : task?.organization_id,
			service_type        : fclOrLclService?.service_type,
			filters             : {
				shipment_id   : task?.shipment_id,
				document_type : 'draft_house_bill_of_lading',
			},
		},
	});

	const { data: tradeDocList, loading: tradeDocLoading } = useListTradeDocuments({
		defaultParams: {
			filters: {
				shipment_id     : task?.shipment_id,
				document_type   : 'bluetide_hbl',
				organization_id : task?.organization_id,
			},
			page_limit: 1000,
		},
	});

	const customRefetchDocs = async () => {
		setcanUseSwitch(false);
		const condition = tradeDocList?.length >= blCount || uploadedDocs?.length >= blCount;

		setIsAllHblUploaded(condition);
		if (fclOrLclService.service_type === 'lcl_freight_service') {
			refetchDocs();
			onCancel();
			return;
		}
		if (condition) {
			setStep('mbl');
		}
	};

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
	const tradeDocsLength = tradeDocList?.list?.length;
	const showUploadView = shipmentDocsLength > 0 && tradeDocsLength === 0;

	const isNextDisabled = (isHBL && !isAllHBLUploaded) || ((!isHBL || isAllHBLUploaded));

	const handleClickOnNext = async () => {
		if (step === 'hbl') {
			setStep('mbl');
		} else {
			await submitMBL({ mblRef });
		}
	};

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
					{canUseSwitch && isHBL ? (
						<Button
							disabled={listDocsAPI?.loading}
							onClick={handleClickSwitch}
							id="bm_pt_switch_bl_upload"
							style={{ marginRight: '10px' }}
						>
							{showSwitchGenerate ? 'Switch to upload' : 'Switch to create'}
						</Button>
					) : null}

					<Button
						disabled={isNextDisabled}
						onClick={handleClickOnNext}
						id="bm_pt_bl_upload_submit"
					>
						{step === 'hbl' && isHBL ? 'Next: MBL Details' : null}
						{step === 'mbl' || !isHBL ? 'Submit' : null}
					</Button>

				</>
			)}
		>
			{isHBL && step === 'hbl' ? (
				<section>
					{showSwitchGenerate ? (
						<>
							{Array(blCount)
								.fill(null)
								.map((n, i) => (
									<div className={styles.flex_container}>
										<div className={styles.text}>
											HBL
											&nbsp;
											{i + 1}
										</div>
										<HBLCreate
											completed={tradeDocList?.list?.[i]}
											hblData={hblData[i] || tradeDocList?.list?.[i]?.data}
												// onSave={(v) => handleSaveHBL(i, v)}
											shipmentData={shipmentData}
											primaryService={fclOrLclService}
										/>
									</div>
								))}
							{!isAllHBLUploaded ? (
								<div className={styles.flex_end}>
									<Button
										disabled={hblData?.length !== blCount}
										// onClick={saveAllBls}
									>
										Save All HBLs
									</Button>
								</div>
							) : null}
						</>
					) : (
						<UploadHbl
							refetchDocs={customRefetchDocs}
							task={task}
							bls_count={blCount}
							docs={uploadedDocs?.list}
							shipmentData={shipmentData}
						/>
					)}
				</section>
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
		</TaskContainer>
	);
}

export default UploadDraftBL;
