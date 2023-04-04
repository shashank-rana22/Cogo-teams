import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetPendingTasks from './useGetPendingTask';
import useGetProcess from './useGetProcess';
import useGetListDocuments from './useListDocuments';

const docTasks = ['upload_document', 'approve_document', 'amend_document'];

const useCreateTaskList = ({ primary_service, shipment_data }) => {
	const [filters, setFilters] = useState({ q: '', uploaoded_by_org_id: '', service_type: '' });
	const [taskList, setTaskList] = useState([]);
	const [docTypes, setDocTypes] = useState([]);
	const { data } = useGetProcess();
	const {
		loading,
		list : shipmentDocuments,
	} = useGetListDocuments({ shipment_data, filters });

	const { data : pendingTasks } = useGetPendingTasks({ shipment_data });

	const getDocType = (task) => task.split('upload_').slice(-1)[0];

	const pushedItems = [];

	const realData = (data || [])
		.map(({ states }) => states.map(({ configs }) => configs.filter(
			(task) => docTasks.includes(task?.task_type)
								&& task?.trade_type === primary_service?.trade_type,
		)))
		.flat(2);

	const neededDoc = realData.map((t) => getDocType(t?.task));

	const shipmentDocTypes = (shipmentDocuments?.list || []).map(
		(doc) => doc?.document_type,
	);
	const pendingTask = (pendingTasks || []).map(
		(task) => task?.document_type,
	);

	useEffect(() => {
		if ((data || []).length) {
			let extras = (shipmentDocuments?.list || []).forEach((doc) => {
				if (
					!neededDoc.includes(doc?.document_type)
					&& !pushedItems.includes(doc?.document_type)
				) {
					pushedItems.push(doc?.document_type);
				}
			});

			extras = (extras || []).map((child) => ({
				...child,
				task       : `upload_${child.document_type}`,
				label      : `Upload ${startCase(child.document_type)}`,
				extra      : true,
				trade_type : primary_service?.trade_type,
			}));
			const restList = [];
			const pendingList = [];
			const uploadedList = [];
			(realData || []).forEach((child) => {
				const doc_type = getDocType(child?.task);
				if (!pushedItems.includes(doc_type)) {
					pushedItems.push(doc_type);
					if (shipmentDocTypes.includes(doc_type)) {
						uploadedList.push(child);
					} else if (pendingTask.includes(doc_type)) {
						pendingList.push({
							...child,
							pendingItem: pendingTasks.find((itm) => itm.document_type === doc_type),
						});
					} else {
						restList.push(child);
					}
				}
			});
			setDocTypes([...pushedItems]);
			setTaskList([...extras, ...uploadedList, ...pendingList, ...restList]);
		}
	}, [JSON.stringify(data),
		JSON.stringify(shipmentDocuments?.list),
		JSON.stringify(data),
		JSON.stringify(shipmentDocuments?.list),
	]);

	return {
		filters,
		setFilters,
		taskList,
		completedDocs: shipmentDocuments,
		docTypes,
		loading,
	};
};

export default useCreateTaskList;
