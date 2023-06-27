import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import { ctcModalControls } from '../../utils/ctc-modal-controls';
import { ctcModalLessControls } from '../../utils/ctc-modal-less-controls';

const CTC_THRESHOLD = 600000;
const FIXED_ZERO = 0;

const useProfileDetails = () => {
	const { query } = useSelector((state) => state.general);
	const { profile_id } = query || {};
	const [error, setError] = useState(false);
	const [ctcStructure, setCtcStructure] = useState({
		basic                : { heading: 'Basic', yearlyValue: FIXED_ZERO, monthlyValue: FIXED_ZERO },
		hra                  : { heading: 'HRA', yearlyValue: FIXED_ZERO, monthlyValue: FIXED_ZERO },
		conveyance_allowance : {
			heading      : 'Conveyance Allowance',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		special_allowance: {
			heading      : 'Special Allowance',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		food_allowance: {
			heading      : 'Food Allowance',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		fuel_allowance: {
			heading      : 'Fuel Allowance',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		telephone_allowance: {
			heading      : 'Telephone Allowance',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		annual_base: {
			heading      : 'Annual Base Salary [A]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		lta: {
			heading      : 'Leave Travel Allowance - LTA',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		medical_reimbursement: {
			heading      : 'Medical Reimbursement',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		flexible_benefits: {
			heading      : 'Flexible Benefits [B]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		provident_fund: {
			heading      : "Provident Fund (Employer's Contribution)",
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		gratuity: {
			heading      : 'Gratuity (As per Act)',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		medical_policy: {
			heading      : 'Medical Policy',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		retirals: {
			heading      : 'Retirals [C]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		sub_total_monthly_gross: {
			heading      : 'Sub-Total Monthly Gross Annualized [A + B + C]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		statutory_bonus: {
			heading      : 'Statutory Bonus [D]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		annual_gross_salary: {
			heading      : 'Annual Gross Salary [ A + B + C + D]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		incentives: {
			heading      : 'Incentives [E]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		variable_component: {
			heading      : 'Variable Component [V]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		total_targeted_compensation: {
			heading      : 'Total Targeted Compensation [ A + B + C + D + E + V]',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
		},
		approx_in_hand: {
			heading      : 'Approx in Hand without TDS Deduction',
			yearlyValue  : FIXED_ZERO,
			monthlyValue : FIXED_ZERO,
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

		if (initialQuestion >= CTC_THRESHOLD) {
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
