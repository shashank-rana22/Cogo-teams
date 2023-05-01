import { Button } from '@cogoport/components';
import { useRef, useState } from 'react';

import TaskContainer from '../TaskContainer';

// import HBLCreate from './HBLCreate';
import useDraftBLHelper from './hooks/useDraftBLHelper';

function UploadDraftBL({
	task = {},
	shipmentData = {},
	primaryService = {},
	onCancel = () => {},
	taskListRefetch = () => {},
}) {
	const mblRef = useRef();

	const isHBL =		(primaryService.bl_category || '').toLowerCase() === 'hbl';

	const initial_step = primaryService.bl_category;

	const [step, setStep] = useState(initial_step || '');

	const {
		listDocsAPI,
		shipmentListDocsAPI,

		submitMBL,
	} = useDraftBLHelper({
		isHBL,
		task,
		primaryService,
		onCancel,
		taskListRefetch,
		shipmentData,
	});

	const handleClickOnNext = async () => {
		if (step === 'hbl') {
			setStep('mbl');
		} else {
			await submitMBL({ mblRef });
		}
	};

	return (
		<TaskContainer
			loading={listDocsAPI?.loading || shipmentListDocsAPI?.loading}
			task={task}
			actions={(
				<Button
					onClick={handleClickOnNext}
					size="sm"
					id="bm_pt_bl_upload_submit"
				>
					{step === 'hbl' && isHBL ? 'Next: MBL Details' : null}

					{step === 'mbl' || !isHBL ? 'Submit' : null}
				</Button>
			)}
		>
			<div>
				{/* {isHBL && step === 'hbl' ? (
					<div>
						{showSwitchGenerate ? (
							<div>
								{Array(blCount)
									.fill(null)
									.map((n, i) => (
										<div className={styles.flex_container}>
											<div size={12} marginBottom={8} bold>
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
						) : (
							<UploadHbl
								refetchDocs={refetchDocs}
								task={task}
								bls_count={blCount}
								docs={uploadedDocs}
								shipmentData={shipmentData}
							/>
						)}
					</div>
				) : null} */}

				Child Comp
				{/* {(step === 'mbl' || !isHBL) && (
					<MBLDetails
						ref={mblRef}
						task={task}
					// selectedMail={selectedMail}
						shipmentData={shipmentData}
						primaryService={primaryService}
					/>
				)} */}
			</div>
		</TaskContainer>
	);
}

export default UploadDraftBL;
