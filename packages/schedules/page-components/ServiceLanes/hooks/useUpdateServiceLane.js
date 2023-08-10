import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getPayload from '../helpers/update_payload';

const ONE = 1;
const useUpdateServiceLane = ({ route, finalRoute, setFinalRoute, data, refetch }) => {
	const totalTransit = Number(route?.[Number(route?.length) - ONE]?.eta_day_count)
	- Number(route?.[GLOBAL_CONSTANTS.zeroth_index]?.etd_day_count);
	const [edit, setEdit] = useState(false);
	const [portEdit, setPortEdit] = useState(false);
	const [form, setForm] = useState(null);
	const [add, setAdd] = useState(null);
	const [deletePort, setDeletePort] = useState(null);
	const [submit, setSubmit] = useState(null);
	const tempRoute = Array.isArray(route) ? [...route] : [];
	const [frequency, setFrequency] = useState(null);
	let modifiedRoute = [];
	const handleClick = (input) => {
		if (input === 'edit') {
			setFinalRoute(route);
			setEdit(true);
		} else {
			setEdit(false);
		}
		setPortEdit(false);
		setForm(null);
		setAdd(null);
		setDeletePort(null);
	};

	const onClickAdd = (index) => {
		setForm(index);
		modifiedRoute = [...(tempRoute || []).slice(GLOBAL_CONSTANTS.zeroth_index, index),
			{ ...submit }, ...(tempRoute || []).slice(index, tempRoute.length)];
		const order = modifiedRoute.map((obj, i) => ({ ...obj, order: i }));
		setFinalRoute(order);
		setAdd(index);
	};
	const onClickEdit = (index) => {
		setForm(index);
		setAdd(null);
	};
	const onClickDelete = (index) => {
		if (add !== null) {
			const updatedFinalRoute = [...finalRoute];
			if (index >= GLOBAL_CONSTANTS.zeroth_index && index < updatedFinalRoute.length) {
				updatedFinalRoute.splice(index, ONE);
			}
			setFinalRoute(updatedFinalRoute);
			setAdd(null);
		} else if (!portEdit) {
			setForm(null);
			setDeletePort((prevDeletePort) => (prevDeletePort ? [...prevDeletePort, index] : [index]));
			modifiedRoute = [...finalRoute.slice(
				GLOBAL_CONSTANTS.zeroth_index,
				index,
			), ...finalRoute.slice(index + ONE, finalRoute.length)];
			const order = modifiedRoute.map((obj, i) => ({ ...obj, order: i }));
			setFinalRoute(order);
		}
		setForm(null);
		setPortEdit(false);
		setSubmit(null);
	};

	const [{ loading }, trigger] = useRequest({
		url    : '/update_service_lane',
		method : 'POST',
	}, { manual: true });

	const updateServiceLane = async (payload) => {
		if (form) {
			if (!(submit?.location_id && submit?.eta_day_count && submit?.etd_day_count)) {
				Toast.error('Please fill all values');
				return;
			}
		}
		try {
			await trigger({ data: payload });
			refetch();
			setEdit(false);
			Toast.success('Service Lane Updated');
		} catch (err) {
			Toast.error(err);
		}
	};
	const onSubmitHandler = async () => {
		const payload = getPayload({ finalRoute, data, form, submit, frequency });
		await updateServiceLane(payload);
	};
	return {
		updateServiceLane,
		loading,
		totalTransit,
		handleClick,
		onClickAdd,
		onClickEdit,
		onClickDelete,
		setSubmit,
		setPortEdit,
		edit,
		deletePort,
		form,
		add,
		onSubmitHandler,
		setFrequency,
		frequency,
	};
};

export default useUpdateServiceLane;
