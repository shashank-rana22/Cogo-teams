import { useLensRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const VALUE_KEY = 'id';
const VALUE_KEY_INDEX_GREATER_THAN_FOR_SELECTED_MAILS = 0;

const SELECTED_OPTION_INDEX_GREATER_THAN = -1;

const useGetMails = ({
	multiple,
	onChange = () => {},
	values = [],
	taskApi = '',
	entity_name,
	show,
}) => {
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
		} else if (index > SELECTED_OPTION_INDEX_GREATER_THAN) {
			const newVal = values.filter((item) => item !== selectedOption);
			const selectedOptionList = options.filter(
				(item) => newVal.indexOf(item[VALUE_KEY]) >= VALUE_KEY_INDEX_GREATER_THAN_FOR_SELECTED_MAILS,
			);
			onChange(newVal, selectedOptionList);
			setSelectedMails(selectedOptionList);
		} else {
			const newVal = [...(values || []), selectedOption];
			const selectedOptionList = options.filter(
				(item) => newVal.indexOf(item[VALUE_KEY]) >= VALUE_KEY_INDEX_GREATER_THAN_FOR_SELECTED_MAILS,
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
