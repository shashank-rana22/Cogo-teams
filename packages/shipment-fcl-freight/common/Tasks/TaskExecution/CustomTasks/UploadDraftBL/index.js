import { Button } from '@cogoport/components';
import { ThreeDotLoader } from '@cogoport/ocean-modules';
import { isEmpty } from '@cogoport/utils';
import { useRef, useState, useEffect } from 'react';

import useListDocuments from '../../../../../hooks/useListDocuments';
import useListShipmentTradeDocuments from '../../../../../hooks/useListShipmentTradeDocuments';
import TaskContainer from '../common/TaskContainer';

import HBLCreate from './HBLCreate';
import useDraftBLHelper from './hooks/useDraftBLHelper';
import MBLDetails from './MBLDetails';
import styles from './styles.module.css';
import UploadHbl from './UploadHbl';

const ZERO_CHECK = 0;
const INCREMENT_VALUE = 1;

function UploadDraftBL({
	task = {},
	shipmentData = {},
	primaryService = {},
	selectedMail = {},
}) {
	const [hblData, setHblData] = useState([]);
	const [isAllHBLUploaded, setIsAllHblUploaded] = useState(false);
	const [showSwitchGenerate, setShowSwitchGenerate] = useState(true);
	const [canUseSwitch, setcanUseSwitch] = useState(true);
	const mblRef = useRef();

	const { list:hblList } = useListDocuments({
		filters: {
			document_type : 'si',
			shipment_id   : shipmentData?.id,
		},
	});

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

	const { data: tradeDocList, refetch: refetchTradeDoc } = useListShipmentTradeDocuments({
		defaultParams: {
			filters: {
				shipment_id   : task?.shipment_id,
				document_type : 'bluetide_hbl',
			},
			page_limit: 60,
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
			(shipmentDocsLength || ZERO_CHECK) <= ZERO_CHECK && (tradeDocsLength || ZERO_CHECK) <= ZERO_CHECK,
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
		shipmentData,
	});

	const showUploadView = !isEmpty(shipmentDocsLength) && isEmpty(tradeDocsLength);

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
							{createTradeDocLoading
								? (
									<div className={styles.create_hbl_loader}>
										<ThreeDotLoader message="Creating Draft HBL Document" />
									</div>
								)
								:	Array(blCount).fill(null).map((n, i) => (
									<div className={styles.flex_container} key={tradeDocList?.list?.[i]?.data?.id}>
										<div className={styles.text}>
											HBL
											{' '}
											{i + INCREMENT_VALUE}
										</div>
										<HBLCreate
											initHblDataObj={hblList?.list?.[i]}
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
										Save All HBL
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
					selectedMail={selectedMail}
					primaryService={primaryService}
				/>
			)}
		</TaskContainer>
	);
}

export default UploadDraftBL;
