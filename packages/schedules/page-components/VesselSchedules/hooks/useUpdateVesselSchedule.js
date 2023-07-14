import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getPayload from '../helpers/update_payload';

const useUpdateVesselSchedule = ({ route, data, finalRoute, setFinalRoute }) => {
	const [edit, setEdit] = useState(false);
	const [portEdit, setPortEdit] = useState(false);
	const [form, setForm] = useState(null);
	const [add, setAdd] = useState(null);
	const [deletePort, setDeletePort] = useState(null);
	const tempRoute = Array.isArray(route) ? [...route] : [];
	const [submit, setSubmit] = useState(null);

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
		modifiedRoute = [...tempRoute?.slice(0, index), { ...submit }, ...tempRoute?.slice(index, tempRoute.length)];
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
			if (index >= 0 && index < updatedFinalRoute.length) {
				updatedFinalRoute.splice(index, 1);
			}
			setFinalRoute(updatedFinalRoute);
			setAdd(null);
		} else if (!portEdit) {
			setForm(null);
			setDeletePort((prevDeletePort) => (prevDeletePort ? [...prevDeletePort, index] : [index]));
			modifiedRoute = [...finalRoute.slice(0, index), ...finalRoute.slice(index + 1, finalRoute.length)];
			const order = modifiedRoute.map((obj, i) => ({ ...obj, order: i }));
			setFinalRoute(order);
		}
		setForm(null);
		setPortEdit(false);
		setSubmit(null);
	};
	const payload = getPayload({ finalRoute, data });

	const [{ loading }, trigger] = useRequest({
		url    : '/update_vessel_schedule',
		method : 'POST',
	}, { manual: true });

	const updateVesselSchedule = async () => {
		// try {
		const res = await trigger({ data: payload });
		// console.log(res, 'insidee');
		// } catch (error) {
		// 	if (error?.response) {
		// 		Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		// 	}
		// }
	};

	return {
		updateVesselSchedule,
		setPortEdit,
		setSubmit,
		edit,
		form,
		add,
		deletePort,
		handleClick,
		onClickAdd,
		onClickEdit,
		onClickDelete,
	};
};

export default useUpdateVesselSchedule;
