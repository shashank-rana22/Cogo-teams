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
	const [error, setError] = useState(false);
	const [ctcStructure, setCtcStructure] = useState({
		basic                : { heading: 'Basic', yearlyValue: 0, monthlyValue: 0 },
		hra                  : { heading: 'HRA', yearlyValue: 0, monthlyValue: 0 },
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
			heading      : 'Sub-Total Monthly Gross Annualized [A + B + C]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		statutory_bonus: {
			heading      : 'Statutory Bonus [D]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		annual_gross_salary: {
			heading      : 'Annual Gross Salary [ A + B + C + D]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		incentives: {
			heading      : 'Incentives [E]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		variable_component: {
			heading      : 'Variable Component [V]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		total_targeted_compensation: {
			heading      : 'Total Targeted Compensation [ A + B + C + D + E + V]',
			yearlyValue  : 0,
			monthlyValue : 0,
		},
		approx_in_hand: {
			heading      : 'Approx in Hand without TDS Deduction',
			yearlyValue  : 0,
			monthlyValue : 0,
		},

	});

	const [initialQuestion, setInitialQuestion] = useState('');

	const formProps = useForm();

	const { watch } = formProps;

	const yearlyJoiningBonus = watch('joining_bonus_yearly');
	const monthlyJoiningBonus = watch('joining_bonus_monthly');
	const yearlyRetentionBonus = watch('retention_bonus_yearly');
	const monthlyRetentionBonus = watch('retention_bonus_monthly');
	const yearlyPerformance = watch('performance_linked_variable_yearly');
	const monthlyPerformance = watch('performance_linked_variable_monthly');
	const yearlySignInBonus = watch('sign_on_bonus_yearly');
	const monthlySignInBonus = watch('sign_on_bonus_monthly');

	useEffect(() => {
		// const data = getValues();

		const data = {
			yearlyJoiningBonus,
			monthlyJoiningBonus,
			yearlyRetentionBonus,
			monthlyRetentionBonus,
			yearlyPerformance,
			monthlyPerformance,
			yearlySignInBonus,
			monthlySignInBonus,
		};

		if (initialQuestion >= 600000) {
			const ctcInfo = ctcModalControls(initialQuestion, data);
			setCtcStructure(ctcInfo.controls);
		} else {
			const ctcInfo = ctcModalLessControls(initialQuestion, data);
			setCtcStructure(ctcInfo.controls);
		}
	}, [initialQuestion, monthlyPerformance, yearlyPerformance,
		monthlyRetentionBonus, yearlyRetentionBonus, monthlyJoiningBonus,
		yearlyJoiningBonus, yearlySignInBonus, monthlySignInBonus]);

	const params = {
		id                      : profile_id,
		document_data_required  : true,
		progress_stats_required : true,
		offer_letter_required   : true,
	};

	const [{ loading, data }, trigger] = useHarbourRequest(
		{
			method : 'GET',
			url    : '/get_employee_details',
			params,
		},
		{ manual: false },
	);

	const getEmployeeDetails = async () => {
		try {
			await trigger({
				params,
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		data,
		getEmployeeDetailsLoading: loading,
		setCtcStructure,
		ctcStructure,
		initialQuestion,
		setInitialQuestion,
		formProps,
		getEmployeeDetails,
		error,
		setError,
	};
};

export default useProfileDetails;
