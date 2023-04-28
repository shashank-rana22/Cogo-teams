import { useLensRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetMails = ({
	multiple,
	onChange,
	values,
	taskApi,
	entity_name,
	show,
}) => {
	const valueKey = 'id';
	const [query, setQuery] = useState('');
	const [selectedMails, setSelectedMails] = useState([]);

	const [recentClassifiedShipmentApi, trigger] = useLensRequest({
		url    : 'list_rpa_mails',
		method : 'GET',
		params : {
			filters: JSON.stringify({
				q           : query,
				entity_type : taskApi || undefined,
				entity_name,
			}),
			page_limit: 10,
		},
	}, { manual: true });

	const fetchMails = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	const optionIds = (recentClassifiedShipmentApi?.data?.body || []).map(
		(item) => item.id,
	);

	const remainingOptions = (selectedMails || []).filter(
		(item) => !optionIds.includes(item.id),
	);

	const options = [
		...(recentClassifiedShipmentApi?.data?.body || []),
		...remainingOptions,
	];

	const handleChange = (selectedOption, selectedObj) => {
		const index = values.indexOf(selectedOption);
		if (!multiple) {
			onChange([selectedOption], [selectedObj]);
			setSelectedMails([selectedObj]);
		} else if (index > -1) {
			const newVal = values.filter((item) => item !== selectedOption);
			const selectedOptionList = options.filter(
				(item) => newVal.indexOf(item[valueKey]) >= 0,
			);
			onChange(newVal, selectedOptionList);
			setSelectedMails(selectedOptionList);
		} else {
			const newVal = [...(values || []), selectedOption];
			const selectedOptionList = options.filter(
				(item) => newVal.indexOf(item[valueKey]) >= 0,
			);
			onChange(newVal, selectedOptionList);
			setSelectedMails(selectedOptionList);
		}
	};

	let newData = {};

	if (!recentClassifiedShipmentApi?.data?.body) {
		newData = {
			body          : selectedMails,
			total_records : selectedMails.length,
		};
	}

	useEffect(() => {
		if (show) {
			fetchMails();
		}
	}, [query, taskApi, show, fetchMails]);

	return {
		data    : recentClassifiedShipmentApi?.data || newData,
		loading : recentClassifiedShipmentApi?.loading,
		fetchMails,
		setQuery,
		query,
		handleChange,
	};
};

export default useGetMails;
