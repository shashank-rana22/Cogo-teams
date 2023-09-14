import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import { useRequest } from '@/packages/request';

const getTimePayload = (time) => {
	const date = new Date(time);

	const hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${hours}:${minutes}`;
};

const useDsrSchedule = ({ dsrList = [], selectedContact = {}, closeModalHandler, getDsrList }) => {
	const { id, dsrId } = selectedContact || {};

	const selectedContactDsr = useMemo(() => dsrList.filter((dsr) => (
		dsr?.poc_details?.id === id
	))?.[0], [dsrList, id]);

	const { schedule: prevSchedule = '' } = selectedContactDsr || {};

	const url = useMemo(() => (
		prevSchedule ? '/update_dsr_schedule' : '/create_dsr_schedule'
	), [prevSchedule]);

	const [{ loading }, trigger] = useRequest({
		method: 'post',
		url,
	}, { manual: true });

	const createUpdateSchedule = async ({ data }) => {
		const { frequency, day = '', time } = data || {};
		const newTime = getTimePayload(time);
		const dsrKey = prevSchedule ? 'id' : 'saas_dsr_id';
		try {
			await trigger({
				data: {
					schedule_type  : startCase(frequency),
					schedule_value : startCase(day),
					schedule_time  : newTime,
					[dsrKey]       : dsrId,
				},
			});
			await getDsrList();
			closeModalHandler();
		} catch (err) {
			console.error(err);
		}
	};

	return {
		loading, createUpdateSchedule, selectedContactDsr, prevSchedule,

	};
};

export default useDsrSchedule;
