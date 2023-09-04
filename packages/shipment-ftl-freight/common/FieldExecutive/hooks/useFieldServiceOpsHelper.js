import { ShipmentDetailContext } from '@cogoport/context';
import { useState, useEffect, useMemo, useContext } from 'react';

import useListFieldServiceOpsDetails from '../../../hooks/useListFieldServiceOpsDetails';
import getStakeholderConfig from '../../../stakeholderConfig';
import {
	DEFAULT_TRUCK_SELECTION_STATE,
	TRUCK_STATE_KEYS,
	VIEW_TYPES,
} from '../utils/pageMappings';

import useGetFieldServiceOpsDetails from './useGetFieldServiceOpsDetails';
import useUpdateFieldServiceOpsDetails from './useUpdateFieldServiceOpsDetails';

const useFieldServiceOpsHelper = ({ shipment_data = {} }) => {
	const { activeStakeholder } = useContext(ShipmentDetailContext);
	const [viewType, setViewType] = useState(VIEW_TYPES.VIEW);
	const [initFormattedData, setInitFormattedData] = useState({});
	const [otherFormattedData, setOtherFormattedData] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	const [truckNumber, setTruckNumber] = useState(DEFAULT_TRUCK_SELECTION_STATE);
	const [truckType, setTruckType] = useState('');

	const stakeholderConfig = getStakeholderConfig({ stakeholder: activeStakeholder });

	const {
		list,
		refetchList,
		loading: listLoading,
	} = useListFieldServiceOpsDetails({
		shipment_id: shipment_data?.id,
	});

	const { getDetails, loading: truckLoading } = useGetFieldServiceOpsDetails({
		shipment_id: shipment_data?.id,
		setInitFormattedData,
		setOtherFormattedData,
		setTruckType,
	});

	const { updateDetails, updateTruckNumber, loading } = useUpdateFieldServiceOpsDetails({
		shipment_id : shipment_data?.id,
		initFormattedData,
		otherFormattedData,
		truck_type  : truckType,
		callback    : () => {
			getDetails(truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER]);
			refetchList();
			setViewType(VIEW_TYPES.VIEW);
		},
	});

	const handleUpdate = () => {
		updateTruckNumber({
			truck_number : truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER],
			callback     : () => {
				refetchList();
				setTruckNumber(DEFAULT_TRUCK_SELECTION_STATE);
				setIsEdit(false);
			},
			updated_truck_number: truckNumber[TRUCK_STATE_KEYS.NEW_TRUCK_NUMBER],
		});
	};

	const filterOptions = useMemo(() => list.map((item) => ({
		label : item?.truck_number,
		value : item?.truck_number,
	})), [list]);

	const selectedTruckNumber = truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER];

	useEffect(() => {
		if (truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER]) {
			getDetails(truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER]);
		}
	}, [selectedTruckNumber, getDetails, truckNumber]);

	return {
		viewType,
		setViewType,
		filterOptions,
		updateDetails,
		handleUpdate,
		loading,
		isEdit,
		setIsEdit,
		initFormattedData,
		setInitFormattedData,
		otherFormattedData,
		setOtherFormattedData,
		truckNumber,
		setTruckNumber,
		truckType,
		setTruckType,
		truckLoading,
		listLoading,
		fieldExecTabConfig: stakeholderConfig?.field_executive,
	};
};

export default useFieldServiceOpsHelper;
