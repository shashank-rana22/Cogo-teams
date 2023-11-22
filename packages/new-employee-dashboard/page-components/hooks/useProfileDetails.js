import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback } from 'react';

// import { ctcModalControls } from '../../utils/ctc-modal-controls';
// import { ctcModalLessControls } from '../../utils/ctc-modal-less-controls';

// const CTC_THRESHOLD = 600000;
const FIXED_ZERO = 0;

const useProfileDetails = () => {
	const { query } = useSelector((state) => state.general);
	const { profile_id = '' } = query || {};

	const [error, setError] = useState(false);

	const [ctcStructure, setCtcStructure] = useState(
		{
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
		},
	);

	const [initialQuestion, setInitialQuestion] = useState('');

	const formProps = useForm({
		defaultValues: {
			retention: [],
		},
	});
	const { watch, control } = formProps;
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_details',
	}, { manual: true });

	const getEmployeeDetails = useCallback(
		async () => {
			try {
				const params = {
					id                      : profile_id,
					document_data_required  : true,
					progress_stats_required : true,
					offer_letter_required   : true,
				};

				await trigger({ params });
			} catch (err) {
				if (err.response?.data) Toast.error(getApiErrorString(err.response?.data));
			}
		},
		[profile_id, trigger],
	);

	useEffect(() => { if (profile_id) getEmployeeDetails(); }, [getEmployeeDetails, profile_id]);

	return {
		data,
		employee_detail_id        : profile_id,
		getEmployeeDetailsLoading : loading,
		setCtcStructure,
		ctcStructure,
		initialQuestion,
		setInitialQuestion,
		formProps,
		getEmployeeDetails,
		error,
		setError,
		watch,
		control,
	};
};

export default useProfileDetails;
