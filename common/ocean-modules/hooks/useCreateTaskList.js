import { startCase } from '@cogoport/utils';
import { useEffect, useState, useMemo } from 'react';

import useGetPendingTasks from './useGetPendingTask';
import useGetProcess from './useGetProcess';
import useGetListDocuments from './useListDocuments';

const docTasks = ['upload_document', 'approve_document', 'amend_document'];

const useCreateTaskList = ({ primary_service, shipment_data }) => {
	const [filters, setFilters] = useState({ q: '', uploaoded_by_org_id: '', service_type: '' });
	const [taskList, setTaskList] = useState([]);
	const [docTypes, setDocTypes] = useState([]);
	const { data: taskConfigs } = useGetProcess();

	const {
		loading,
		list : uploadedShipmentDocuments,
	} = useGetListDocuments({
		filters,
		defaultFilters : { shipment_id: shipment_data?.id },
		defaultParams  : {
			additional_methods : ['pagination', 'organizations'],
			page               : 1,
			page_limit         : 1000,
			sort_by            : 'created_at',
			sort_type          : 'desc',
		},
		shipment_type: shipment_data?.shipment_type,
	});

	const { data : pendingTasks } = useGetPendingTasks({ shipment_data });

	const getDocType = (task) => task.split('upload_').slice(-1)[0];

	const taskConfigsForAllShipmentTasks = (taskConfigs || [])
		.map(({ states }) => states.map(({ configs }) => configs.filter(
			(task) => docTasks.includes(task?.task_type)
				&& task?.trade_type === primary_service?.trade_type,
		)))
		.flat(2);

	const listOfAllShipmentDocTypes = useMemo(
		() => taskConfigsForAllShipmentTasks.map((t) => getDocType(t?.task)),
		[taskConfigsForAllShipmentTasks],
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
				task       : `upload_${child.document_type}`,
				label      : `Upload ${startCase(child.document_type)}`,
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
		JSON.stringify(listOfAllShipmentDocTypes),
		// listOfUploadedDocumentTypes,
		// listOfPendingTaskDocumentTypes,
		JSON.stringify(pendingTasks),
		primary_service?.trade_type,
		// taskConfigs,
		// taskConfigsForAllShipmentTasks,
		JSON.stringify(uploadedShipmentDocuments?.list),
	]);

	console.log({ taskList, docTypes });

	return {
		filters,
		setFilters,
		taskList,
		completedDocs: listOfUploadedDocumentTypes,
		docTypes,
		loading,
	};
};

export default useCreateTaskList;
