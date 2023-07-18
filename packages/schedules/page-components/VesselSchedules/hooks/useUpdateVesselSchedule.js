import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getPayload from '../helpers/update_payload';

const useUpdateVesselSchedule = ({ route, data, finalRoute, setFinalRoute, refetch }) => {
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
	const [{ loading }, trigger] = useRequest({
		url    : '/update_vessel_schedule',
		method : 'POST',
	}, { manual: true });

	const updateVesselSchedule = async (payload) => {
		if (form) {
			if (!(submit?.eta && submit?.etd && submit?.location_id)) {
				Toast.error('Please fill all values');
				return;
			}
		}
		try {
			await trigger({ data: payload });
			refetch();
			setEdit(false);
			Toast.success('Vessel Schedule Updated');
		} catch (err) {
			Toast.error(err);
		}
	};
	const onSubmitHandler = async () => {
		const payload = getPayload({ finalRoute, data, form, submit });
		await updateVesselSchedule(payload);
	};
	return {
		updateVesselSchedule,
		setPortEdit,
		setSubmit,
		edit,
		form,
		add,
		deletePort,
		loading,
		handleClick,
		onClickAdd,
		onClickEdit,
		onClickDelete,
		onSubmitHandler,
	};
};

export default useUpdateVesselSchedule;
