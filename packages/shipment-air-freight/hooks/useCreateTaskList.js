import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useEffect, useState, useMemo, useCallback } from 'react';

import getShipmentTradeType from '../commons/utils/getShipmentTradeType';

import useGetShipmentProcess from './useGetShipmentProcess';
import useListShipmentDocuments from './useListShipmentDocuments';
import useListShipmentOrganizations from './useListShipmentOrganizations';
import useListShipmentPendingTasks from './useListShipmentPendingTasks';

const TASKS = ['upload_document', 'approve_document', 'amend_document'];
const PAGE_LIMIT = 20;
const DEFAULT_PAGE = 1;
const DOC_TYPE_SLICE_INDEX = -1;
const TASK_CONFIG_FLAT_DEPTH = 2;

const useCreateTaskList = ({ shipment_data = {} }) => {
	const trade_type = getShipmentTradeType({ shipment_data });
	const [taskList, setTaskList] = useState([]);
	const [docTypes, setDocTypes] = useState([]);

	const { id:shipment_id = '', shipment_type = '' } = shipment_data || {};

	const { data:processData, loading:processLoading } = useGetShipmentProcess({ shipment_type });
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
			page                             : DEFAULT_PAGE,
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

	const getDocType = useCallback(
		(task) => task?.split('upload_')?.slice(DOC_TYPE_SLICE_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index],
		[],
	);

	const listOfUploadedDocumentTypes = useMemo(() => (documentData?.list || []).map(
		(doc) => doc?.document_type,
	), [documentData?.list]);

	const taskConfigsForAllShipmentTasks = useMemo(() => (processData?.data?.services_config || [])
		.map(({ states }) => states?.map(({ configs }) => configs?.filter(
			(task) => TASKS.includes(task?.task_type)
				&& task?.trade_type === trade_type,
		)))
		.flat(TASK_CONFIG_FLAT_DEPTH), [processData?.data?.services_config, trade_type]);

	const listOfAllShipmentDocTypes = useMemo(
		() => taskConfigsForAllShipmentTasks?.map((t) => getDocType(t?.task)),
		[taskConfigsForAllShipmentTasks, getDocType],
	);

	const listOfPendingTaskDocumentTypes = useMemo(() => (pendingTasks?.list || []).map(
		(task) => task?.document_type,
	), [pendingTasks]);

	useEffect(() => {
		const PUSH_IN_DOC_TYPES = [];
		if ((processData?.data?.services_config || [])?.length) {
			let extraDocumentUploaded = (documentData?.list || []).filter((doc) => {
				const docType = doc?.document_type;
				if (
					!listOfAllShipmentDocTypes?.includes(docType)
					&& !PUSH_IN_DOC_TYPES.includes(docType)
				) {
					PUSH_IN_DOC_TYPES.push(docType);
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

			const REST_LIST = [];
			const PENDING_LIST = [];
			const UPLOADED_LIST = [];

			(taskConfigsForAllShipmentTasks || []).forEach((child) => {
				const doc_type = getDocType(child?.task);
				PUSH_IN_DOC_TYPES.push(doc_type);

				if (listOfUploadedDocumentTypes.includes(doc_type)) {
					UPLOADED_LIST.push(child);
				} else if (listOfPendingTaskDocumentTypes.includes(doc_type)) {
					PENDING_LIST.push({
						...child,
						pendingItem: pendingTasks?.list?.find((itm) => itm.document_type === doc_type),
					});
				} else {
					REST_LIST.push(child);
				}
			});

			setTaskList([...extraDocumentUploaded, ...UPLOADED_LIST, ...PENDING_LIST, ...REST_LIST]);

			setDocTypes([...PUSH_IN_DOC_TYPES]);
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

	const sourceOptions = useMemo(() => (orgData?.list || []).map(
		(item) => ({ label: item?.business_name, value: item?.id }) || [],
	), [orgData?.list]);

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
