import { startCase } from '@cogoport/utils';
import { useEffect, useState, useMemo } from 'react';

import useGetPendingTasks from './useGetPendingTask';
import useGetProcess from './useGetProcess';
import useGetListDocuments from './useListDocuments';

const docTasks = ['upload_document', 'approve_document', 'amend_document'];

const useCreateTaskList = ({ primary_service = {}, shipment_data = {} }) => {
	const [filters, setFilters] = useState({ q: '', uploaded_by_org_id: '', service_type: '' });
	const [taskList, setTaskList] = useState([]);
	const [docTypes, setDocTypes] = useState([]);

	const { id, shipment_type } = shipment_data;

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
		defaultFilters : { shipment_id: id },
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
			task_type   : 'upload_document',
			status      : 'pending',
			shipment_id : id,
		},
		shipment_type,
	});

	const getDocType = useMemo(() => (task) => task.split('upload_').slice(-1)[0], []);

	const taskConfigsForAllShipmentTasks = useMemo(() => (taskConfigs || [])
		.map(({ states }) => states.map(({ configs }) => configs.filter(
			(task) => docTasks.includes(task?.task_type)
				&& task?.trade_type === primary_service?.trade_type,
		)))
		.flat(2), [taskConfigs, primary_service?.trade_type]);

	const listOfAllShipmentDocTypes = useMemo(
		() => taskConfigsForAllShipmentTasks.map((t) => getDocType(t?.task)),
		[taskConfigsForAllShipmentTasks, getDocType],
	);

	const listOfUploadedDocumentTypes = useMemo(() => (uploadedShipmentDocuments?.list || []).map(
		(doc) => doc?.document_type,
	), [uploadedShipmentDocuments]);

	const listOfPendingTaskDocumentTypes = useMemo(() => (pendingTasks || []).map(
		(task) => task?.document_type,
	), [pendingTasks]);

	useEffect(() => {
		const pushInDocTypesArr = [];
		if ((taskConfigs || []).length) {
			let extraDocumentUploaded = (uploadedShipmentDocuments?.list || []).filter((doc) => {
				if (
					!listOfAllShipmentDocTypes.includes(doc?.document_type)
					&& !pushInDocTypesArr.includes(doc?.document_type)
				) {
					pushInDocTypesArr.push(doc?.document_type);
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
						pendingItem: pendingTasks.find((itm) => itm.document_type === doc_type),
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
