import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import {
	ctcModalControls,
	ctcModalLessControls,
} from '../../utils/ctc-modal-controls';

const useProfileDetails = () => {
	const { query } = useSelector((state) => state.general);
	const { profile_id } = query || {};

	const [ctcStructure, setCtcStructure] = useState({
		basic                : { heading: 'basic', yearlyValue: 0, monthlyValue: 0 },
		hra                  : { heading: 'hra', yearlyValue: 0, monthlyValue: 0 },
		conveyance_allowance : {
			heading      : 'Conveyance Allowance',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		special_allowance: {
			heading      : 'Special Allowance',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		food_allowance: {
			heading      : 'Food Allowance',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		fuel_allowance: {
			heading      : 'Fuel Allowance',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		telephone_allowance: {
			heading      : 'Telephone Allowance',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		annual_base: {
			heading      : 'Annual Base Salary [A]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		lta: {
			heading      : 'Leave Travel Allowance - LTA',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		medical_reimbursement: {
			heading      : 'Medical Reimbursement',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		flexible_benefits: {
			heading      : 'Flexible Benefits [B]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		provident_fund: {
			heading      : "Provident Fund (Employer's Contribution)",
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		gratuity: {
			heading      : 'Gratuity (As per Act)',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		medical_policy: {
			heading      : 'Medical Policy',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		retirals: {
			heading      : 'Retirals [C]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		sub_total_monthly_gross: {
			heading      : 'Sub-Total Monthly Gross Annualized [A + B+ C]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		statutory_bonus: {
			heading      : 'Statutory Bonus [D]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		annual_gross_salary: {
			heading      : 'Annual Gross Salary [A+B+C+D]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
	});

	const [initialQuestion, setInitialQuestion] = useState('');

	const formProps = useForm();

	useEffect(() => {
		if (initialQuestion >= 600000) {
			const ctcInfo = ctcModalControls(initialQuestion);
			setCtcStructure(ctcInfo.controls);
		} else {
			const ctcInfo = ctcModalLessControls(initialQuestion);
			setCtcStructure(ctcInfo.controls);
		}
	}, [initialQuestion]);

	const params = {
		id                     : profile_id,
		document_data_required : true,
	};

	const [{ loading, data }, trigger] = useHarbourRequest(
		{
			method : 'GET',
			url    : '/get_employee_details',
			params,
		},
		{ manual: false },
	);

	const getEmployeeDetails = () => {
		try {
			trigger({
				params,
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		data,
		loading,
		setCtcStructure,
		ctcStructure,
		initialQuestion,
		setInitialQuestion,
		formProps,
		getEmployeeDetails,
	};
};

export default useProfileDetails;
