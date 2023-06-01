import { Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useGenerateBluetideHbl from '../../../../../hooks/useGenerateBluetideHbl';
import useListDocuments from '../../../../../hooks/useListDocuments';
import useListShipmentTradeDocuments from '../../../../../hooks/useListShipmentTradeDocuments';
import useUpdateShipmentDocuments from '../../../../../hooks/useUpdateShipmentDocuments';
import TaskContainer from '../common/TaskContainer';

import HBLCreate from './HBLCreate';
import styles from './styles.module.css';

function AmendDraftBl({
	task = {},
	primaryService = {},
	clearTask = false,
	taskListRefetch = () => {},
}) {
	const [isHBLUploaded, setisHBLUploaded] = useState(false);
	const [hblData, setHblData] = useState(null);
	const [hblUploadData, setHblUploadData] = useState(null);

	const {
		list: uploadedDocs,
		loading: listDocLoading,
	} = useListDocuments({
		defaultParams: {
			performed_by_org_id : task?.organization_id,
			service_type        : primaryService?.service_type,
			filters             : {
				shipment_id   : task?.shipment_id,
				document_type : 'draft_house_bill_of_lading',
				id            : task?.task_field_id,
			},
		},
	});

	const { data: tradeDocList, refetch } = useListShipmentTradeDocuments({
		defaultParams: {
			filters: {
				shipment_id          : task?.shipment_id,
				document_type        : 'bluetide_hbl',
				shipment_document_id : task?.task_field_id,
			},
		},
	});

	const hblDoc = tradeDocList?.list?.[0];

	const afterRefetch = () => {
		refetch();
		clearTask();
		taskListRefetch();
	};
	const { apiTrigger } = useGenerateBluetideHbl({ refetch: afterRefetch });
	const { updateDocument } = useUpdateShipmentDocuments({ refetch: afterRefetch });

	useEffect(() => {
		setisHBLUploaded(tradeDocList?.list?.length > 0);
	}, [tradeDocList?.list]);

	useEffect(() => {
		setHblData(hblDoc?.data);
	}, [hblDoc]);

	const handleAppendHbl = async () => {
		if (hblData) {
			const body = {
				trade_document_id    : hblDoc?.id,
				shipment_document_id : uploadedDocs?.list?.[0]?.id,
				document_type        : 'bluetide_hbl',
				data                 : {
					...hblData,
					service_type : primaryService?.service_type,
					service_id   : primaryService?.id,
					watermark    : 'DRAFT',
				},
				pending_task_id: task?.id,
			};
			await apiTrigger(body);
		} else if (hblUploadData) {
			const body = {
				id              : uploadedDocs?.list?.[0]?.id,
				pending_task_id : task?.id,
				data            : {
					document_number  : hblUploadData?.document_number,
					containers_count : hblUploadData?.containers_count,
				},
				document_url        : hblUploadData?.url?.url,
				performed_by_org_id : task?.organization_id,
				shipment_id         : task?.shipment_id,
			};
			await updateDocument(body);
		}
	};

	const handleSaveHBL = (values) => {
		if (values) {
			const data = values;
			data.bl_number = hblData?.bl_number;
			setHblData(data);
		}
	};

	const handleUploadHBL = (values) => {
		if (values) {
			setHblUploadData(values);
		}
	};

	return (
		<TaskContainer
			loading={listDocLoading}
			pendingTask={task}
			actions={(
				<Button
					onClick={handleAppendHbl}
					size="sm"
				>
					Amend
				</Button>

			)}
		>
			<div className={styles.text}>
				Remarks:
				&nbsp;
				{uploadedDocs?.list?.[0]?.remarks}
			</div>
			<HBLCreate
				isHBLUploaded={isHBLUploaded}
				shipmentHblDoc={uploadedDocs?.list?.[0]}
				hblData={hblData}
				onSave={handleSaveHBL}
				hblUploadData={hblUploadData}
				handleUploadHBL={handleUploadHBL}
			/>

		</TaskContainer>
	);
}

export default AmendDraftBl;
