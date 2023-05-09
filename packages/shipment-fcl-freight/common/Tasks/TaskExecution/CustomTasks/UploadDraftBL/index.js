import { Button } from '@cogoport/components';
import { useRef, useState, useEffect } from 'react';

import useListDocuments from '../../../../../hooks/useListDocuments';
import useListShipmentTradeDocuments from '../../../../../hooks/useListShipmentTradeDocuments';
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
}) {
	const [hblData, setHblData] = useState([]);
	const [isAllHBLUploaded, setIsAllHblUploaded] = useState(false);
	const [showSwitchGenerate, setShowSwitchGenerate] = useState(true);
	const [canUseSwitch, setcanUseSwitch] = useState(true);
	const mblRef = useRef();

	const isHBL = (primaryService.bl_category || '').toLowerCase() === 'hbl';

	const initial_step = primaryService.bl_category;

	const [step, setStep] = useState(initial_step || '');

	const blCount = primaryService.bls_count;

	const {
		list: uploadedDocs,
		loading: listDocLoading,
		refetch: refetchDocs,
	} = useListDocuments({
		defaultParams: {
			performed_by_org_id : task?.organization_id,
			service_type        : primaryService?.service_type,
			filters             : {
				shipment_id   : task?.shipment_id,
				document_type : 'draft_house_bill_of_lading',
			},
		},
	});

	const { data: tradeDocList, loading: tradeDocLoading, refetch: refetchTradeDoc } = useListShipmentTradeDocuments({
		defaultParams: {
			filters: {
				shipment_id   : task?.shipment_id,
				document_type : 'bluetide_hbl',
			},
			page_limit: 1000,
		},
	});

	const shipmentDocsLength = uploadedDocs?.list?.length;
	const tradeDocsLength = tradeDocList?.list?.length;

	const customRefetchDocs = async () => {
		setcanUseSwitch(false);
		refetchDocs();
		const condition = tradeDocsLength >= blCount || shipmentDocsLength >= blCount;

		setIsAllHblUploaded(condition);
		if (condition) {
			setStep('mbl');
		}
	};

	useEffect(() => {
		setcanUseSwitch(
			(shipmentDocsLength || 0) <= 0 && (tradeDocsLength || 0) <= 0,
		);
		setIsAllHblUploaded(
			tradeDocsLength >= blCount || shipmentDocsLength >= blCount,
		);
	}, [tradeDocsLength, shipmentDocsLength, blCount]);

	const {
		createHBL,
		submitMBL,
		loading,
		createTradeDocLoading,
	} = useDraftBLHelper({
		pendingTask: task,
	});

	const showUploadView = shipmentDocsLength > 0 && tradeDocsLength === 0;

	const isNextDisabled = (isHBL && !isAllHBLUploaded) || ((!isHBL || isAllHBLUploaded) && loading);

	const handleClickOnNext = async () => {
		if (step === 'hbl') {
			setStep('mbl');
		} else {
			await submitMBL({ mblRef });
		}
	};

	const handleSaveHBL = (index, values) => {
		if (values) {
			setHblData((old) => {
				const newValues = [...old];
				newValues[index] = values;
				return newValues;
			});
		}
	};

	const saveAllBls = async () => {
		await createHBL({
			hblData,
			shipmentData,
		});
		await refetchTradeDoc();
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
			loading={uploadedDocs?.list?.length?.loading || listDocLoading}
			pendingTask={task}
			actions={(
				<>
					{canUseSwitch && isHBL ? (
						<Button
							disabled={createTradeDocLoading || loading}
							onClick={handleClickSwitch}
							style={{ marginRight: '10px' }}
						>
							{showSwitchGenerate ? 'Switch to upload' : 'Switch to create'}
						</Button>
					) : null}

					<Button
						disabled={isNextDisabled}
						onClick={handleClickOnNext}
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
											onSave={(v) => handleSaveHBL(i, v)}
											shipmentData={shipmentData}
											primaryService={primaryService}
										/>
									</div>
								))}
							{!isAllHBLUploaded ? (
								<div className={styles.flex_end}>
									<Button
										disabled={hblData?.length !== blCount || createTradeDocLoading}
										onClick={saveAllBls}
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
							primaryService={primaryService}
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
