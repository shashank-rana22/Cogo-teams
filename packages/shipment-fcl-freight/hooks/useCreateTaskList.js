import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useEffect, useState, useMemo } from 'react';

import useGetPendingTasks from './useGetPendingTask';
import useGetProcess from './useGetProcess';
import useGetListDocuments from './useListDocuments';

const DOC_TYPE_SLICE_INDEX = -1;
const TASK_CONFIG_FLAT_DEPTH = 2;

const DOC_TASKS = ['upload_document', 'approve_document', 'amend_document'];

const useCreateTaskList = ({ primary_service = {}, shipment_data = {} }) => {
	const [filters, setFilters] = useState({ uploaded_by_org_id: '', service_type: '' });
	const [taskList, setTaskList] = useState([]);
	const [docTypes, setDocTypes] = useState([]);

	const { id:shipment_id = '', shipment_type = '' } = shipment_data || {};

	const { data: taskConfigs, loading : taskConfigLoading } = useGetProcess({
		defaultParams: {
			status: 'active',
		},
		shipment_type,
	});

	const {
		loading : documentsLoading,
		list : uploadedShipmentDocuments,
		refetch,
	} = useGetListDocuments({
		filters,
		defaultFilters : { shipment_id },
		defaultParams  : {
			additional_methods : ['pagination', 'organizations'],
			page               : 1,
			page_limit         : 1000,
			sort_by            : 'created_at',
			sort_type          : 'desc',
		},
		shipment_type,
	});

	const { data : pendingTasks, loading : tasksLoading } = useGetPendingTasks({
		defaultFilters: {
			task_type : 'upload_document',
			status    : 'pending',
			shipment_id,
		},
		shipment_type,
	});

	const getDocType = useMemo(() => (task) => task?.split('upload_')
		?.slice(DOC_TYPE_SLICE_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index], []);

	const taskConfigsForAllShipmentTasks = useMemo(() => (taskConfigs || [])
		.map(({ states }) => states?.map(({ configs }) => configs?.filter(
			(task) => DOC_TASKS.includes(task?.task_type)
				&& task?.trade_type === primary_service?.trade_type,
		)))
		.flat(TASK_CONFIG_FLAT_DEPTH), [taskConfigs, primary_service?.trade_type]);

	const listOfAllShipmentDocTypes = useMemo(
		() => taskConfigsForAllShipmentTasks?.map((t) => getDocType(t?.task)),
		[taskConfigsForAllShipmentTasks, getDocType],
	);

	const listOfUploadedDocumentTypes = useMemo(() => (uploadedShipmentDocuments?.list || []).map(
		(doc) => doc?.document_type,
	), [uploadedShipmentDocuments]);

	const listOfPendingTaskDocumentTypes = useMemo(() => (pendingTasks || []).map(
		(task) => task?.document_type,
	), [pendingTasks]);

	useEffect(() => {
		const PUST_IN_DOC_TYPES_ARR = [];
		if ((taskConfigs || [])?.length) {
			let extraDocumentUploaded = (uploadedShipmentDocuments?.list || []).filter((doc) => {
				if (
					!listOfAllShipmentDocTypes?.includes(doc?.document_type)
					&& !PUST_IN_DOC_TYPES_ARR.includes(doc?.document_type)
				) {
					PUST_IN_DOC_TYPES_ARR.push(doc?.document_type);
					return true;
				}
				return false;
			});

			extraDocumentUploaded = (extraDocumentUploaded || []).map((child) => ({
				...child,
				task       : `upload_${child?.document_type}`,
				label      : `Upload ${startCase(child?.document_type)}`,
				extra      : true,
				trade_type : primary_service?.trade_type,
			}));

			const REST_LIST = [];
			const PENDING_LIST = [];
			const UPLOADED_LIST = [];

			(taskConfigsForAllShipmentTasks || []).forEach((child) => {
				const doc_type = getDocType(child?.task);
				PUST_IN_DOC_TYPES_ARR.push(doc_type);

				if (listOfUploadedDocumentTypes.includes(doc_type)) {
					UPLOADED_LIST.push(child);
				} else if (listOfPendingTaskDocumentTypes.includes(doc_type)) {
					PENDING_LIST.push({
						...child,
						pendingItem: pendingTasks.find((itm) => itm.document_type === doc_type),
					});
				} else {
					REST_LIST.push(child);
				}
			});

			setTaskList([...extraDocumentUploaded, ...UPLOADED_LIST, ...PENDING_LIST, ...REST_LIST]);

			setDocTypes([...PUST_IN_DOC_TYPES_ARR]);
		}
	}, [
		listOfAllShipmentDocTypes,
		listOfPendingTaskDocumentTypes,
		listOfUploadedDocumentTypes,
		pendingTasks,
		getDocType,
		primary_service?.trade_type,
		uploadedShipmentDocuments?.list,
		taskConfigs,
		taskConfigsForAllShipmentTasks,
	]);

	return {
		filters,
		setFilters,
		taskList,
		completedDocs : uploadedShipmentDocuments,
		docTypes,
		loading       : tasksLoading || documentsLoading || taskConfigLoading,
		refetch,
	};
};

export default useCreateTaskList;
