import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState, useEffect } from 'react';

import useGetNextPayroll from '../../../../hooks/useGetNextPayroll';
import PayrollEarning from '../PayrollEarning';
import FinalPaymentReport from '../PayrollSubmitted';
import ReviewPayroll from '../ReviewPayroll';
import RunPayroll from '../RunPayroll';

const THREE = 3;

function InitiatePayrollMap({
	handleSetup = () => {}, from_payroll = '', id = '',
	setFromPayroll = () => {},
}) {
	const [proceed, setProceed] = useState(GLOBAL_CONSTANTS.zeroth_index);
	const [selectedItems, setSelectedItems] = useState({});
	const { data:month } = useGetNextPayroll({ return_list: false });
	const [listId, setlistId] = useState(id);

	const handleBack = () => {
		if (proceed === GLOBAL_CONSTANTS.zeroth_index || from_payroll === 'pending') {
			handleSetup('');
		} else if (proceed === THREE) {
			handleSetup('');
		} else {
			setProceed(proceed - GLOBAL_CONSTANTS.one);
		}
		setFromPayroll('');
	};

	useEffect(() => {
		if (from_payroll === 'pending') {
			setProceed(GLOBAL_CONSTANTS.two);
		} else if (from_payroll === 'paid') {
			setProceed(THREE);
		}
	}, [from_payroll]);

	if (proceed === GLOBAL_CONSTANTS.zeroth_index) {
		return (
			<RunPayroll
				proceed={proceed}
				handleBack={handleBack}
				setProceed={setProceed}
				selectedItems={selectedItems}
				setSelectedItems={setSelectedItems}
				month={month}
			/>

		);
	}
	if (proceed === GLOBAL_CONSTANTS.one) {
		return (
			<PayrollEarning
				proceed={proceed}
				handleBack={handleBack}
				setProceed={setProceed}
				selectedItems={selectedItems}
				setSelectedItems={setSelectedItems}
				createId
				month={month}
				setlistId={setlistId}
			/>
		);
	}
	if (proceed === GLOBAL_CONSTANTS.two) {
		return (

			<ReviewPayroll
				proceed={proceed}
				setProceed={setProceed}
				month={month}
				handleBack={handleBack}
				listId={listId}
			/>
		);
	}
	if (proceed === THREE) {
		return (
			<FinalPaymentReport
				proceed={proceed}
				setProceed={setProceed}
				handleBack={handleBack}
				month={month}
				listId={listId}
				handleSetup={handleSetup}
			/>
		);
	}
}

export default InitiatePayrollMap;
