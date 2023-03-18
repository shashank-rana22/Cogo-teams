/* eslint-disable react-hooks/exhaustive-deps */

import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import useGetPendingTasks from './useGetPendingTask';
import useGetListDocuments from './useGetShipmentDocuments';
import useGetShipmentProcess from './useGetShipmentProcess';

const docTasks = ['upload_document', 'approve_document', 'amend_document'];

const useCreateTaskList = ({ primary_service, shipment_data }) => {
	const [taskList, setTaskList] = useState([]);
	const [docTypes, setDocTypes] = useState([]);
	const { data } = useGetShipmentProcess();
	const {
		list : shipmentDocuments,
	} = useGetListDocuments({ shipment_data });

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

	const shipmentDocTypes = (shipmentDocuments || []).map(
		(doc) => doc?.document_type,
	);
	const pendingTask = (pendingTasks || []).map(
		(task) => task?.document_type,
	);

	useEffect(() => {
		if ((data || []).length) {
			let extras = (shipmentDocuments || []).forEach((doc) => {
				if (
					!neededDoc.includes(doc?.document_type)
					&& !pushedItems.includes(doc?.document_type)
				) {
					pushedItems.push(doc?.document_type);
				}
			});

			console.log(pushedItems, 'pushed items 1');

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
				console.log(doc_type, 'doc_type pushed items 1', pushedItems);
				if (!pushedItems.includes(doc_type)) {
					pushedItems.push(doc_type);
					console.log(doc_type, 'doc_type');

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

		JSON.stringify(shipmentDocuments),

		JSON.stringify(data),

		JSON.stringify(shipmentDocuments),

	]);

	console.log(pushedItems, 'fguyfguygr yefeuyfr yewuy efyuewdtu');

	return {
		taskList,
		completedDocs: shipmentDocuments,
		docTypes,

	};
};

export default useCreateTaskList;
