import { startCase } from '@cogoport/utils';
import { useEffect, useState, useMemo } from 'react';

import getShipmentTradeType from '../helpers/getShipmentTradeType';

import useGetShipmentProcess from './useGetShipmentProcess';
import useListShipmentDocuments from './useListShipmentDocuments';
import useListShipmentOrganizations from './useListShipmentOrganizations';
import useListShipmentPendingTasks from './useListShipmentPendingTasks';

const TASKS = ['upload_document', 'approve_document', 'amend_document'];
const PAGE_LIMIT = 50;
const PAGE = 1;

const useCreateTaskList = ({ shipment_data = {} }) => {
	const trade_type = getShipmentTradeType({ shipment_data });
	const [taskList, setTaskList] = useState([]);
	const [docTypes, setDocTypes] = useState([]);

	const { id:shipment_id = '', shipment_type = '' } = shipment_data || {};

	const { data:processData, loading:processLoading } = useGetShipmentProcess({});
	const { data:orgData } = useListShipmentOrganizations({ defaultParams: { shipment_id } });

	const {
		data:documentData,
		filters,
		setFilters,
		loading:documentsLoading,
		apiTrigger:refetch,
	} = useListShipmentDocuments({
		defaultParams: {
			page_limit                       : PAGE_LIMIT,
			created_by_user_details_required : true,
			page                             : PAGE,
		},
		defaultFilters: {
			shipment_id,
		},
	});

	const { data: pendingTasks, loading:tasksLoading } = useListShipmentPendingTasks({
		defaultFilters: {
			task_type : 'upload_document',
			status    : 'pending',
			shipment_id,
			shipment_type,
		},
		defaultParams: {
			page_limit: PAGE_LIMIT,
		},
	});

	const getDocType = useMemo(() => (task) => task?.split('upload_')?.slice(-1)?.[0], []);

	const listOfUploadedDocumentTypes = useMemo(() => (documentData?.list || []).map(
		(doc) => doc?.document_type,
	), [documentData]);

	const taskConfigsForAllShipmentTasks = useMemo(() => (processData?.data?.services_config || [])
		.map(({ states }) => states?.map(({ configs }) => configs?.filter(
			(task) => TASKS.includes(task?.task_type)
				&& task?.trade_type === trade_type,
		)))
		.flat(2), [processData?.data?.services_config, trade_type]);

	const listOfAllShipmentDocTypes = useMemo(
		() => taskConfigsForAllShipmentTasks?.map((t) => getDocType(t?.task)),
		[taskConfigsForAllShipmentTasks, getDocType],
	);

	const listOfPendingTaskDocumentTypes = useMemo(() => (pendingTasks?.list || []).map(
		(task) => task?.document_type,
	), [pendingTasks]);

	useEffect(() => {
		const pushInDocTypesArr = [];
		if ((processData?.data?.services_config || [])?.length) {
			let extraDocumentUploaded = (documentData?.list || []).filter((doc) => {
				if (
					!listOfAllShipmentDocTypes?.includes(doc?.document_type)
					&& !pushInDocTypesArr.includes(doc?.document_type)
				) {
					pushInDocTypesArr.push(doc?.document_type);
					return true;
				}
				return false;
			});

			extraDocumentUploaded = (extraDocumentUploaded || []).map((child) => ({
				...child,
				task  : `upload_${child?.document_type}`,
				label : `Upload ${startCase(child?.document_type)}`,
				extra : true,
				trade_type,
			}));

			const restList = [];
			const pendingList = [];
			const uploadedList = [];

			(taskConfigsForAllShipmentTasks || []).forEach((child) => {
				const doc_type = getDocType(child?.task);
				pushInDocTypesArr.push(doc_type);

				if (listOfUploadedDocumentTypes.includes(doc_type)) {
					uploadedList.push(child);
				} else if (listOfPendingTaskDocumentTypes.includes(doc_type)) {
					pendingList.push({
						...child,
						pendingItem: pendingTasks?.list?.find((itm) => itm.document_type === doc_type),
					});
				} else {
					restList.push(child);
				}
			});

			setTaskList([...extraDocumentUploaded, ...uploadedList, ...pendingList, ...restList]);

			setDocTypes([...pushInDocTypesArr]);
		}
	}, [
		listOfAllShipmentDocTypes,
		listOfPendingTaskDocumentTypes,
		listOfUploadedDocumentTypes,
		pendingTasks,
		getDocType,
		trade_type,
		documentData?.list,
		processData?.data?.services_config,
		taskConfigsForAllShipmentTasks,
	]);

	const sourceOptions = orgData?.list?.map((item) => ({ label: item?.business_name, value: item?.id })) || [];

	return {
		filters,
		setFilters,
		taskList,
		completedDocs : documentData,
		docTypes,
		loading       : tasksLoading || documentsLoading || processLoading,
		refetch,
		sourceOptions,
	};
};

export default useCreateTaskList;
