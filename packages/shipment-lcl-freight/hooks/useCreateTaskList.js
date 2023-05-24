import { useEffect, useState, useMemo } from 'react';

import getShipmentTradeType from '../helpers/getShipmentTradeType';

import useGetShipmentProcess from './useGetShipmentProcess';
import useListShipmentDocuments from './useListShipmentDocuments';
import useListShipmentPendingTasks from './useListShipmentPendingTasks';

const useCreateTaskList = ({ shipment_data = {} }) => {
	const trade_type = getShipmentTradeType({ shipment_data });
	const [filters, setFilters] = useState({ uploaded_by_org_id: '', service_type: '' });
	const [taskList, setTaskList] = useState([]);
	const [docTypes, setDocTypes] = useState([]);

	const { id:shipment_id = '', shipment_type = '' } = shipment_data || {};

	const { data, loading } = useGetShipmentProcess({});

	const docApi = useListShipmentDocuments(); // todo

	const taskApi = useListShipmentPendingTasks({}); // todo

	const getDocType = useMemo(() => (task) => task?.split('upload_')?.slice(-1)?.[0], []);
};

export default useCreateTaskList;
