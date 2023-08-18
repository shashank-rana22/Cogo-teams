import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { TRUCK_STATE_KEYS } from '../utils/pageMappings';

const useViewDetailsHelper = ({ servicesList = [], truckNumber = {} }) => {
	const [mobileNumber, setMobileNumber] = useState('');
	const [showHistory, setShowHistory] = useState(false);

	const selectedTruckNumber =		truckNumber[TRUCK_STATE_KEYS.SELECTED_TRUCK_NUMBER];

	let mobileOptions = [];
	const isTaskCompleted = servicesList.some(
		(item) => !isEmpty(item?.truck_number),
	);
	if (isTaskCompleted) {
		const truck = servicesList.find(
			(item) => item?.truck_number?.toLowerCase()
				=== selectedTruckNumber?.toLowerCase(),
		);
		mobileOptions = [
			{
				label : truck?.driver_details?.contact,
				value : truck?.driver_details?.contact,
			},
		];
	}

	useEffect(() => {
		setMobileNumber('');
	}, [selectedTruckNumber]);

	return {
		mobileNumber,
		setMobileNumber,
		showHistory,
		setShowHistory,
		selectedTruckNumber,
		mobileOptions,
		isTaskCompleted,
	};
};

export default useViewDetailsHelper;
