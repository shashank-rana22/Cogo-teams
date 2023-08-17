/* eslint-disable custom-eslint/uuid-check */
import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestAir } from '@cogoport/request';

const getParams = ({ shipmentId, warehouseLocationId, warehouseTransferId, truckStatus, fileValue }) => {
	let req = {
		shipmentId,
		warehouseLocationId,
		warehouseTransferId,
	};
	if (truckStatus === 'truck_in') {
		req = {
			...req,
			truckInStatus : true,
			truckInProof  : fileValue,
		};
	} else {
		req = {
			...req,
			truckOutStatus : true,
			truckOutProof  : fileValue,
			truckOutEta    : new Date(),
		};
	}

	return req;
};

const useUpdateSchedule = ({
	item = {},
	fileValue = '',
	truckStatus = 'truck_in',
	listAPI = () => {},
	setShowTruckStatusModal = () => {},
	setShowCargoAcknowledgmentModal = () => {},

}) => {
	const [{ loading, data }, trigger] = useRequestAir(
		{
			url     : 'air-coe/warehouse-management/schedule',
			method  : 'PUT',
			authKey : 'put_air_coe_warehouse_management_schedule',
		},
	);

	const handleOnClose = () => {
		setShowTruckStatusModal({});
		setShowCargoAcknowledgmentModal(true);
	};

	const handleUpdate = async () => {
		try {
			await trigger({
				data: {
					...getParams({
						shipmentId          : item?.shipmentDetails[GLOBAL_CONSTANTS.zeroth_index]?.shipmentId,
						warehouseLocationId : 'b5068435-0449-4883-bb56-0b9c11343a74',
						warehouseTransferId : item?.warehouseTransferId,
						truckStatus,
						fileValue,
					}),
				},
			});
			Toast.success(`Trucked ${(truckStatus === 'truck_in') ? 'in' : 'out'} successfully`);
			handleOnClose();
			listAPI();
		} catch (err) {
			toastApiError(err);
		}
	};

	return ({
		loading,
		handleUpdate,
		data,
	});
};

export default useUpdateSchedule;
