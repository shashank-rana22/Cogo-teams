import { Button } from '@cogoport/components';
import { useRef, useState } from 'react';

import TaskContainer from '../TaskContainer';

import useDraftBLHelper from './hooks/useDraftBLHelper';

function UploadDraftBL({
	task = {},
	shipmentData = {},
	primaryService = {},
	onCancel = () => {},
	taskListRefetch = () => {},
}) {
	const mblRef = useRef();

	const isHBL = (primaryService.bl_category || '').toLowerCase() === 'hbl';

	const initial_step = primaryService.bl_category;

	const [step, setStep] = useState(initial_step || '');

	const {
		listDocsAPI = {},
		shipmentListDocsAPI = {},
		submitMBL = () => {},
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
				Child Comp
			</div>
		</TaskContainer>
	);
}

export default UploadDraftBL;
