import { Button, Text } from '@cogo/commons/components';
import { useRequest, useScope } from '@cogo/commons/hooks';
import { useEffect, useState } from 'react';
import { cogoToast } from '@cogo/deprecated_legacy/ui';
import TaskContainer from '../commons/TaskContainer';
import HBLCreate from './HBLCreate';

const AmendDraftHouseBL = ({
	summary,
	pendingTask,
	refetch,
	clearTask,
	services = [],
	shipment_data = {},
}) => {
	const [hblData, setHblData] = useState(null);
	const [hblUploadData, setHblUploadData] = useState(null);
	const { scope } = useScope();
	const updateDocAPI = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_document');

	const updateHBLAPI = useRequest(
		'post',
		false,
		scope,
	)('/update_trade_document');

	const docsParams = {
		filters: {
			shipment_id: summary?.shipment_id || summary?.id,
			document_type: 'bluetide_hbl',
			shipment_document_id: pendingTask?.task_field_id,
		},
		page_limit: 1000,
	};
	const listDocsAPI = useRequest(
		'get',
		true,
		scope,
	)('/list_shipment_trade_documents', { params: docsParams });

	const shipmentDocsParams = {
		filters: {
			shipment_id: summary?.shipment_id || summary?.id,
			document_type: 'draft_house_bill_of_lading',
		},
	};
	const listShipmentDocsAPI = useRequest(
		'get',
		true,
		scope,
	)('/list_shipment_documents', { params: shipmentDocsParams });

	const [isHBLUploaded, setisHBLUploaded] = useState(false);

	useEffect(() => {
		setisHBLUploaded(listDocsAPI?.data?.list?.length > 0);
	}, [listDocsAPI?.data?.list]);

	const hblDoc = listDocsAPI?.data?.list?.[0];

	let shipmentHblDoc = {};
	listShipmentDocsAPI?.data?.list?.forEach((item) => {
		if (item?.id === pendingTask?.task_field_id) {
			shipmentHblDoc = item;
		}
	});

	useEffect(() => {
		if (hblDoc?.data) {
			setHblData(hblDoc?.data);
		}
	}, [hblDoc]);

	const handleSaveHBL = (values) => {
		if (values) {
			const data = values;
			data.bl_number = hblDoc?.data?.bl_number;
			setHblData(data);
		}
	};

	const handleSaveUploadHBL = (values) => {
		if (values) {
			setHblUploadData(values);
		}
	};

	const appendHBL = async () => {
		if (hblData) {
			const body = {
				id: hblDoc?.id,
				document_type: 'bluetide_hbl',
				data: {
					...hblData,
					service_type: summary?.service_type,
					service_id: summary?.id,
				},
				pending_task_id: pendingTask?.id,
			};
			try {
				await updateHBLAPI.trigger({ data: body });
				cogoToast.success('Successfully updated');
				refetch();
				clearTask();
			} catch {
				cogoToast.error('There was an issue updating the document');
			}
		} else if (hblUploadData) {
			const body = {
				id: shipmentHblDoc?.id,
				pending_task_id: pendingTask?.id,
				data: {
					document_number: hblUploadData?.document_number,
					containers_count: hblUploadData?.containers_count,
				},
				document_url: hblUploadData?.url?.url,
				performed_by_org_id: pendingTask?.organization_id,
				shipment_id: pendingTask?.shipment_id,
			};
			try {
				await updateDocAPI.trigger({ data: body });
				cogoToast.success('Successfully updated');
				refetch();
				clearTask();
			} catch {
				cogoToast.error('There was an issue updating the document');
			}
		}
	};

	return (
		<TaskContainer
			loading={listDocsAPI?.loading}
			pendingTask={pendingTask}
			shipment_data={shipment_data}
			actions={
				<>
					<Button
						disabled={updateHBLAPI?.loading}
						onClick={appendHBL}
						size="sm"
						id="bm_pt_draft_hbl_amend_btn"
					>
						Amend
					</Button>
				</>
			}
		>
			<Text marginBottom={16}>
				<Text as="span" bold>
					Remarks:{' '}
				</Text>
				<Text as="span">{shipmentHblDoc?.remarks}</Text>
			</Text>
			<HBLCreate
				isHBLUploaded={isHBLUploaded}
				shipmentHblDoc={shipmentHblDoc}
				completed={isHBLUploaded}
				hblData={hblData}
				onSave={handleSaveHBL}
				summary={summary}
				hblUploadData={hblUploadData}
				handleUploadHBL={handleSaveUploadHBL}
				services={services}
			/>
		</TaskContainer>
	);
};

export default AmendDraftHouseBL;
