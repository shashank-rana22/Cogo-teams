import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getPayload from '../helpers/update_payload';

const useUpdateServiceLane = ({ route, finalRoute, setFinalRoute, data }) => {
	const totalTransit = route?.[route?.length - 1]?.eta_day_count - route?.[0]?.etd_day_count;
	const [edit, setEdit] = useState(false);
	const [portEdit, setPortEdit] = useState(false);
	const [form, setForm] = useState(null);
	const [add, setAdd] = useState(null);
	const [deletePort, setDeletePort] = useState(null);
	const [submit, setSubmit] = useState(null);
	const tempRoute = Array.isArray(route) ? [...route] : [];

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
	const OBJECT_TO_INSERT = { display_name: '', location_id: '', order: null, port_code: '' };

	const onClickAdd = (index) => {
		setForm(index);
		modifiedRoute = [...(tempRoute?.slice(0, index) || []),
			{ ...submit },
			OBJECT_TO_INSERT, ...(tempRoute?.slice(index, tempRoute.length) || [])];
		const order = modifiedRoute.map((obj, i) => ({ ...obj, order: i }));
		setFinalRoute(order);
		setAdd(index);
	};
	const onClickEdit = (index) => {
		setForm(index);
		setAdd(null);
	};
	const onClickDelete = (index) => {
		if (add) {
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
		url    : '/update_service_lane',
		method : 'POST',
	}, { manual: true });

	const updateServiceLane = async () => {
		const res = await trigger({ data: payload });
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

	};
};

export default useUpdateServiceLane;
