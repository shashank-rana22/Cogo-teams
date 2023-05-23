import { ShipmentDetailContext } from '@cogoport/context';
import { useSelector } from '@cogoport/store';
import { useContext, useState, useEffect } from 'react';

import useListShipmentPendingTasks from './useListShipmentPendingTasks';

const useTask = () => {
	const { user_id } = useSelector(({ profile }) => ({ user_id: profile?.user?.id }));

	const {
		shipment_data = {}, isGettingShipment,
		stakeholderConfig : { tasks = {} } = {},
	} = useContext(ShipmentDetailContext);

	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [hideCompletedTasks, setHideCompletedTasks] = useState(false);
	const [showMyTasks, setShowMyTasks] = useState(true);
	const [selectedMail, setSelectedMail] = useState([]);
	const [filters, setFilters] = useState({});

	const { data, loading, apiTrigger } = useListShipmentPendingTasks({
		defaultFilters : { shipment_id: shipment_data.id },
		defaultParams  : { page_limit: 100, sort_by: 'created_at', sort_type: 'asc' },
		filters,
	});

	useEffect(() => {

	}, [showMyTasks]);
};
