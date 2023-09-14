import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

import { useRequest } from '@/packages/request';

const useDsrToSubscription = ({ dsrId = '', setActiveStepper, selectedShipments, setSelectedShipments }) => {
	const [{ loading: getListLoading, data: prevDsrToSubData = [] }] = useRequest({
		method : 'get',
		url    : '/get_dsr_to_subscription_mapping',
		params : {
			id: dsrId,
		},
	}, { manual: false });

	const url = useMemo(() => (
		prevDsrToSubData?.length > 0 ? 'update_dsr_to_subscription_mapping' : 'create_dsr_to_subscription_mapping'
	), [prevDsrToSubData]);

	const [{ loading, data }, trigger] = useRequest({
		method: 'post',
		url,
	}, { manual: true });

	const updateDsrToSubscription = async ({ selectedShipmentList }) => {
		try {
			if (prevDsrToSubData?.length === 0) {
				await trigger({
					data: {
						saas_dsr_id     : dsrId,
						subscription_id : selectedShipmentList,
					},
				});
				setActiveStepper('schedule');
				return;
			}

			const shipmentsToRemove = prevDsrToSubData.filter((prevDsrSub) => (
				!selectedShipmentList.includes(prevDsrSub?.id)
			)).map((prevDsr) => prevDsr?.id);

			const shipmentsToAdd = selectedShipmentList.filter((item) => (
				!prevDsrToSubData.some((prevDsr) => prevDsr?.id === item)
			));

			await trigger({
				data: {
					saas_dsr_id     : dsrId,
					subscription_id : shipmentsToRemove,
					status          : false,
				},
			});
			await trigger({
				data: {
					saas_dsr_id     : dsrId,
					subscription_id : shipmentsToAdd,
					status          : true,
				},
			});
			setActiveStepper('schedule');
		} catch (err) {
			console.error(err, 'err');
		}
	};

	const submitHandler = () => {
		updateDsrToSubscription({ selectedShipmentList: selectedShipments });
	};

	useEffect(() => {
		if (!isEmpty(prevDsrToSubData)) {
			const prevShipmentId = prevDsrToSubData.map((ele) => ele?.id);
			setSelectedShipments((prev) => [...prev, ...prevShipmentId]);
		}
	}, [prevDsrToSubData, setSelectedShipments]);

	return {
		data, createLoading: loading, getListLoading, submitHandler,
	};
};

export default useDsrToSubscription;
