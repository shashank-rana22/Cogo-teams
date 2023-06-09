const FIXED_SPLIT = 1;
const CTC_CONST_1 = 1;
const CTC_CONST_0_4 = 0.4;
const CTC_CONST_0_5 = 0.5;
const CTC_CONST_1600 = 1600;
const CTC_CONST_2200 = 2200;
const CTC_CONST_2700 = 2700;
const CTC_CONST_500 = 500;
const CTC_CONST_15000 = 15000;
const CTC_CONST_12 = 12;
const CTC_CONST_0_015 = 0.015;
const CTC_CONST_0_0833 = 0.0833;
const CTC_CONST_21000 = 21000;
const CTC_CONST_9056 = 9056;
const CTC_CONST_754 = 754;
const CTC_CONST_0 = 0;
const CTC_CONST_0_1301 = 0.1301;
const CTC_CONST_0_0483 = 0.0483;
const CTC_CONST_2400 = 2400;
const CTC_CONST_1950 = 1950;
const CTC_CONST_200 = 200;
const CTC_CONST_1800 = 1800;
const CTC_CONST_1250 = 1250;

const calculateValue = (basicYearlyValue) => {
	if (basicYearlyValue / CTC_CONST_12 < CTC_CONST_15000) {
		return CTC_CONST_0_1301 * basicYearlyValue;
	}
	return CTC_CONST_1950 * CTC_CONST_12;
};

export const ctcModalControls = (ctcInput, data = {}) => {
	const variable_split = CTC_CONST_1 - FIXED_SPLIT;
	const basicYearlyValue = ctcInput * CTC_CONST_0_4;
	const hraYearlyValue = basicYearlyValue * CTC_CONST_0_5;
	const conveyanceYearlyValue = CTC_CONST_1600 * CTC_CONST_12;
	const foodAllowanceYearlyValue = CTC_CONST_2200 * CTC_CONST_12;
	const fuelAllowanceYearlyValue = CTC_CONST_2700 * CTC_CONST_12;
	const telephoneAllowanceYearlyValue = Math.max(CTC_CONST_0_015 * ctcInput, CTC_CONST_500 * CTC_CONST_12);
	const flexible_benefit_sum = CTC_CONST_0_0833 * basicYearlyValue + CTC_CONST_15000;
	const statutorySum = (inputVal) => {
		if (inputVal / CTC_CONST_12 > CTC_CONST_21000) {
			return CTC_CONST_0;
		}
		if (
			inputVal / CTC_CONST_12 < CTC_CONST_21000
      && inputVal / CTC_CONST_12 > CTC_CONST_9056
		) {
			return CTC_CONST_754 * CTC_CONST_12;
		}
		return CTC_CONST_754 * CTC_CONST_12;
	};
	let result;
	if (
		ctcInput
      - (basicYearlyValue + hraYearlyValue + conveyanceYearlyValue + foodAllowanceYearlyValue
		+ fuelAllowanceYearlyValue + telephoneAllowanceYearlyValue + CTC_CONST_0_0833 * basicYearlyValue
        + CTC_CONST_15000 + Math.round(calculateValue(basicYearlyValue)) + CTC_CONST_0_0483 * basicYearlyValue
        + statutorySum(basicYearlyValue))
    > CTC_CONST_0
	) {
		result = ctcInput
      - (basicYearlyValue + hraYearlyValue + conveyanceYearlyValue + foodAllowanceYearlyValue
        + fuelAllowanceYearlyValue + telephoneAllowanceYearlyValue
		+ flexible_benefit_sum + Math.round(calculateValue(basicYearlyValue))
        + CTC_CONST_0_0483 * basicYearlyValue
        + CTC_CONST_2400 + statutorySum(basicYearlyValue));
	} else {
		result = CTC_CONST_0;
	}

	const specialAllowanceYearlyValue = result;

	const sum = basicYearlyValue + hraYearlyValue + conveyanceYearlyValue
    + specialAllowanceYearlyValue
    + foodAllowanceYearlyValue
    + fuelAllowanceYearlyValue
    + telephoneAllowanceYearlyValue;

	const controls = {
		basic: {
			heading      : 'Basic',
			yearlyValue  : basicYearlyValue,
			monthlyValue : basicYearlyValue / CTC_CONST_12,
		},
		hra: {
			heading      : 'HRA',
			yearlyValue  : basicYearlyValue * CTC_CONST_0_5,
			monthlyValue : (basicYearlyValue * CTC_CONST_0_5) / CTC_CONST_12,
		},
		conveyance_allowance: {
			heading      : 'Conveyance Allowance',
			yearlyValue  : CTC_CONST_1600 * CTC_CONST_12,
			monthlyValue : CTC_CONST_1600,
		},
		special_allowance: {
			heading      : 'Special Allowance',
			yearlyValue  : specialAllowanceYearlyValue,
			monthlyValue : specialAllowanceYearlyValue / CTC_CONST_12,
		},
		food_allowance: {
			heading      : 'Food Allowance',
			yearlyValue  : CTC_CONST_2200 * CTC_CONST_12,
			monthlyValue : CTC_CONST_2200,
		},
		fuel_allowance: {
			heading      : 'Fuel Allowance',
			yearlyValue  : CTC_CONST_2700 * CTC_CONST_12,
			monthlyValue : CTC_CONST_2700,
		},
		telephone_allowance: {
			heading     : 'Telephone Allowance',
			yearlyValue : Math.max(
				CTC_CONST_0_015 * ctcInput,
				CTC_CONST_500 * CTC_CONST_12,
			),
			monthlyValue:
        Math.max(CTC_CONST_0_015 * ctcInput, CTC_CONST_500 * CTC_CONST_12)
        / CTC_CONST_12,
		},
		annual_base: {
			heading      : 'Annual Base Salary [A]',
			yearlyValue  : sum,
			monthlyValue : sum / CTC_CONST_12,
		},
		lta: {
			heading      : 'Leave Travel Allowance - LTA',
			yearlyValue  : CTC_CONST_0_0833 * basicYearlyValue,
			monthlyValue : (CTC_CONST_0_0833 * basicYearlyValue) / CTC_CONST_12,
		},
		medical_reimbursement: {
			heading      : 'Medical Reimbursement',
			yearlyValue  : CTC_CONST_15000,
			monthlyValue : CTC_CONST_1250,
		},
		flexible_benefits: {
			heading      : 'Flexible Benefits [B]',
			yearlyValue  : flexible_benefit_sum,
			monthlyValue : flexible_benefit_sum / CTC_CONST_12,
		},
		provident_fund: {
			heading      : "Provident Fund (Employer's Contribution)",
			yearlyValue  : Math.round(calculateValue(basicYearlyValue)),
			monthlyValue : Math.round(calculateValue(basicYearlyValue)) / CTC_CONST_12,
		},
		gratuity: {
			heading      : 'Gratuity (As per Act)',
			yearlyValue  : CTC_CONST_0_0483 * basicYearlyValue,
			monthlyValue : (CTC_CONST_0_0483 * basicYearlyValue) / CTC_CONST_12,
		},
		medical_policy: {
			heading      : 'Medical Policy',
			yearlyValue  : CTC_CONST_2400,
			monthlyValue : 200,
		},
		retirals: {
			heading: 'Retirals [C]',
			yearlyValue:
        Math.round(calculateValue(basicYearlyValue))
        + CTC_CONST_0_0483 * basicYearlyValue
        + CTC_CONST_2400,
			monthlyValue:
        (Math.round(calculateValue(basicYearlyValue))
          + CTC_CONST_0_0483 * basicYearlyValue
          + CTC_CONST_2400)
        / CTC_CONST_12,
		},
		statutory_bonus: {
			heading      : 'Statutory Bonus [D]',
			yearlyValue  : statutorySum(basicYearlyValue),
			monthlyValue : statutorySum(basicYearlyValue) / CTC_CONST_12,
		},
		annual_gross_salary: {
			heading: 'Annual Gross Salary [ A + B + C + D]',
			yearlyValue:
        sum
        + statutorySum(basicYearlyValue)
        + Math.round(calculateValue(basicYearlyValue))
        + CTC_CONST_0_0483 * basicYearlyValue
        + CTC_CONST_2400
        + flexible_benefit_sum,
			monthlyValue:
        (sum
          + statutorySum(basicYearlyValue)
          + Math.round(calculateValue(basicYearlyValue))
          + CTC_CONST_0_0483 * basicYearlyValue
          + CTC_CONST_2400
          + flexible_benefit_sum)
        / CTC_CONST_12,
		},
		incentives: {
			heading: 'Incentives [E]',
			yearlyValue:
        Number(data?.yearlyJoiningBonus || CTC_CONST_0)
        + Number(data?.yearlyPerformance || CTC_CONST_0)
        + Number(data?.yearlyRetentionBonus || CTC_CONST_0),
			monthlyValue:
        Number(data?.monthlyJoiningBonus || CTC_CONST_0)
        + Number(data?.monthlyPerformance || CTC_CONST_0)
        + Number(data?.monthlyRetentionBonus || CTC_CONST_0),
		},
		variable_component: {
			heading      : 'Variable Component [V]',
			yearlyValue  : ctcInput * variable_split,
			monthlyValue : (ctcInput * variable_split) / CTC_CONST_12,
		},
		total_targeted_compensation_no_retention: {
			heading: 'Total Targeted Compensation without retention [A+B+C+D+E]',
			yearlyValue:
        Number(data?.yearlyJoiningBonus || CTC_CONST_0)
        + Number(data?.yearlyPerformance || CTC_CONST_0)
        + Number(data?.yearlyRetentionBonus || CTC_CONST_0)
        + sum
        + statutorySum(basicYearlyValue)
        + Math.round(calculateValue(basicYearlyValue))
        + CTC_CONST_0_0483 * basicYearlyValue
        + CTC_CONST_2400
        + flexible_benefit_sum,
			monthlyValue:
        Number(data?.monthlyJoiningBonus || CTC_CONST_0)
        + Number(data?.monthlyPerformance || CTC_CONST_0)
        + Number(data?.monthlyRetentionBonus || CTC_CONST_0)
        + (sum
          + statutorySum(basicYearlyValue)
          + Math.round(calculateValue(basicYearlyValue))
          + CTC_CONST_0_0483 * basicYearlyValue
          + CTC_CONST_2400
          + flexible_benefit_sum)
          / CTC_CONST_12,
		},
		total_targeted_compensation: {
			heading: 'Total Targeted Compensation [A+B+C+D+E+V]',
			yearlyValue:
        ctcInput * variable_split
        + Number(data?.yearlyJoiningBonus || CTC_CONST_0)
        + Number(data?.yearlyPerformance || CTC_CONST_0)
        + Number(data?.yearlyRetentionBonus || CTC_CONST_0)
        + sum
        + statutorySum(basicYearlyValue)
        + Math.round(calculateValue(basicYearlyValue))
        + CTC_CONST_0_0483 * basicYearlyValue
        + CTC_CONST_2400
        + flexible_benefit_sum,
			monthlyValue:
        (ctcInput * variable_split) / CTC_CONST_12
        + Number(data?.monthlyJoiningBonus || CTC_CONST_0)
        + Number(data?.monthlyPerformance || CTC_CONST_0)
        + Number(data?.monthlyRetentionBonus || CTC_CONST_0)
        + (sum
          + statutorySum(basicYearlyValue)
          + Math.round(calculateValue(basicYearlyValue))
          + CTC_CONST_0_0483 * basicYearlyValue
          + CTC_CONST_2400
          + flexible_benefit_sum)
          / CTC_CONST_12,
		},
		monthly_in_hand_without_tds: {
			heading     : 'Monthly Approx in Hand without TDS Deduction',
			yearlyValue : null,
			monthlyValue:
        (sum
          + statutorySum(basicYearlyValue)
          + Math.round(calculateValue(basicYearlyValue))
          + CTC_CONST_0_0483 * basicYearlyValue
          + CTC_CONST_2400
          + flexible_benefit_sum)
          / CTC_CONST_12
        - Math.round(calculateValue(basicYearlyValue)) / CTC_CONST_12
        - (CTC_CONST_0_0483 * basicYearlyValue) / CTC_CONST_12
        - CTC_CONST_200
        - Number(data?.monthlyJoiningBonus || CTC_CONST_0)
        - CTC_CONST_1800
        - CTC_CONST_200,
		},
	};

	return {
		controls,
	};
};
