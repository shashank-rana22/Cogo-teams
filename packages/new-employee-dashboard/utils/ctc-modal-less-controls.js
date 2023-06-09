const FIXED_SPLIT = 1;
const CTC_CONST_1 = 1;
const CTC_CONST_0_4 = 0.4;
const CTC_CONST_0_5 = 0.5;
const CTC_CONST_6000 = 6000;
const CTC_CONST_15000 = 15000;
const CTC_CONST_12 = 12;
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
const CONVEYANCE_YEARLY_VALUE = 6000;

const calculateResult = (basicYearlyValue) => (basicYearlyValue / CTC_CONST_12 < CTC_CONST_15000
	? CTC_CONST_0_1301 * basicYearlyValue
	: CTC_CONST_1950 * CTC_CONST_12);

export const ctcModalLessControls = (ctcInput, data = {}) => {
	const variable_split = CTC_CONST_1 - FIXED_SPLIT;

	const basicYearlyValue = ctcInput * CTC_CONST_0_4;
	const hraYearlyValue = basicYearlyValue * CTC_CONST_0_5;
	const TELEPHONE_ALLOWANCE_YEARLY_VALUE = 6000;
	const providentFunds = Math.round(calculateResult(basicYearlyValue));
	const flexible_benefit_sum = CTC_CONST_0_0833 * ctcInput * CTC_CONST_0_4 + CTC_CONST_15000;
	const statutorySum = (inputVal) => {
		if (inputVal / CTC_CONST_12 > CTC_CONST_21000) {
			return CTC_CONST_0;
		}
		if (inputVal / CTC_CONST_12 < CTC_CONST_21000 && inputVal / CTC_CONST_12 > CTC_CONST_9056) {
			return CTC_CONST_754 * CTC_CONST_12;
		}
		return CTC_CONST_754 * CTC_CONST_12;
	};
	const statutoryBonus = statutorySum(basicYearlyValue);
	const specialAllowanceYearlyValue = ctcInput
    - (basicYearlyValue
      + hraYearlyValue
      + CONVEYANCE_YEARLY_VALUE
      + TELEPHONE_ALLOWANCE_YEARLY_VALUE
      + flexible_benefit_sum
      + providentFunds
      + CTC_CONST_0_0483 * basicYearlyValue
      + CTC_CONST_2400
      + statutoryBonus);

	const sum = basicYearlyValue
    + hraYearlyValue
    + CONVEYANCE_YEARLY_VALUE
    + specialAllowanceYearlyValue
    + TELEPHONE_ALLOWANCE_YEARLY_VALUE;

	const controls = {
		basic: {
			heading      : 'Basic',
			yearlyValue  : basicYearlyValue,
			monthlyValue : basicYearlyValue / CTC_CONST_12,
		},
		hra: {
			heading      : 'HRA',
			yearlyValue  : hraYearlyValue,
			monthlyValue : hraYearlyValue / CTC_CONST_12,
		},
		conveyance_allowance: {
			heading      : 'Conveyance Allowance',
			yearlyValue  : CONVEYANCE_YEARLY_VALUE,
			monthlyValue : CONVEYANCE_YEARLY_VALUE / CTC_CONST_12,
		},
		special_allowance: {
			heading      : 'Special Allowance',
			yearlyValue  : specialAllowanceYearlyValue,
			monthlyValue : specialAllowanceYearlyValue / CTC_CONST_12,
		},
		telephone_allowance: {
			heading      : 'Telephone Allowance',
			yearlyValue  : CTC_CONST_6000,
			monthlyValue : CTC_CONST_6000 / CTC_CONST_12,
		},

		annual_base: {
			heading      : 'Annual Base Salary [A]',
			yearlyValue  : sum,
			monthlyValue : sum / CTC_CONST_12,
		},
		lta: {
			heading      : 'Leave Travel Allowance - LTA',
			yearlyValue  : CTC_CONST_0_0833 * ctcInput * CTC_CONST_0_4,
			monthlyValue : (CTC_CONST_0_0833 * ctcInput * CTC_CONST_0_4) / CTC_CONST_12,
		},
		medical_reimbursement: {
			heading      : 'Medical allowance ',
			yearlyValue  : CTC_CONST_15000,
			monthlyValue : 1250,
		},
		flexible_benefits: {
			heading      : 'Flexible Benefits [B]',
			yearlyValue  : flexible_benefit_sum,
			monthlyValue : flexible_benefit_sum / CTC_CONST_12,
		},
		provident_fund: {
			heading     : "Provident Fund (Employer's Contribution)",
			yearlyValue : Math.round(calculateResult(basicYearlyValue)),
			monthlyValue:
        Math.round(calculateResult(basicYearlyValue)) / CTC_CONST_12,
		},
		gratuity: {
			heading      : 'Gratuity (As per Act)',
			yearlyValue  : CTC_CONST_0_0483 * basicYearlyValue,
			monthlyValue : (CTC_CONST_0_0483 * basicYearlyValue) / CTC_CONST_12,
		},
		medical_policy: {
			heading      : 'Medical Policy',
			yearlyValue  : CTC_CONST_2400,
			monthlyValue : CTC_CONST_200,
		},
		retirals: {
			heading: 'Retirals [C]',
			yearlyValue:
        Math.round(calculateResult(basicYearlyValue))
        + CTC_CONST_0_0483 * basicYearlyValue
        + CTC_CONST_2400,
			monthlyValue:
        (Math.round(calculateResult(basicYearlyValue))
          + CTC_CONST_0_0483 * basicYearlyValue
          + CTC_CONST_2400)
        / CTC_CONST_12,
		},
		sub_total_monthly_gross: {
			heading: 'Sub-Total Monthly Gross Annualized [A + B+ C]',
			yearlyValue:
        Math.round(calculateResult(basicYearlyValue)

            + CTC_CONST_0_0483 * basicYearlyValue
            + CTC_CONST_2400)
        + sum
        + flexible_benefit_sum,
			monthlyValue:
        (Math.round(calculateResult(basicYearlyValue)
            + CTC_CONST_0_0483 * basicYearlyValue
            + CTC_CONST_2400)
          + sum
          + flexible_benefit_sum)
        / CTC_CONST_12,
		},
		statutory_bonus: {
			heading      : 'Statutory Bonus [D]',
			yearlyValue  : statutorySum(basicYearlyValue),
			monthlyValue : statutorySum(basicYearlyValue) / CTC_CONST_12,
		},
		annual_gross_salary: {
			heading: 'Annual Gross Salary [A + B + C + D]',
			yearlyValue:
        Math.round(calculateResult(basicYearlyValue)
            + CTC_CONST_0_0483 * basicYearlyValue
            + CTC_CONST_2400)
        + sum
        + flexible_benefit_sum
        + statutorySum(basicYearlyValue),

			monthlyValue:
        (Math.round(calculateResult(basicYearlyValue)
            + CTC_CONST_0_0483 * basicYearlyValue
            + CTC_CONST_2400)
          + sum
          + flexible_benefit_sum
          + statutorySum(basicYearlyValue))
        / CTC_CONST_12,
		},

		incentives: {
			heading: 'Incentives [E]',
			yearlyValue:
        Number(data?.yearlyJoiningBonus || CTC_CONST_0)
        + Number(data?.yearlySignInBonus || CTC_CONST_0),
			monthlyValue:
        Number(data?.monthlyJoiningBonus || CTC_CONST_0)
        + Number(data?.monthlySignInBonus || CTC_CONST_0),
		},
		variable_component: {
			heading      : 'Variable Component [V]',
			yearlyValue  : ctcInput * variable_split,
			monthlyValue : (ctcInput * variable_split) / CTC_CONST_12,
		},

		total_targeted_compensation: {
			heading: 'Total Targeted Compensation [A + B + C + D + E + V]',
			yearlyValue:
        ctcInput * variable_split
        + (Number(data?.yearlyJoiningBonus || CTC_CONST_0)
          + Number(data?.yearlySignInBonus || CTC_CONST_0))
        + (Math.round(calculateResult(basicYearlyValue)
            + CTC_CONST_0_0483 * basicYearlyValue
            + CTC_CONST_2400)
          + sum
          + flexible_benefit_sum
          + statutorySum(basicYearlyValue)),

			monthlyValue:
        (ctcInput * variable_split) / CTC_CONST_12
        + Number(data?.monthlyJoiningBonus || CTC_CONST_0)
        + Number(data?.monthlySignInBonus || CTC_CONST_0)
        + (Math.round(calculateResult(basicYearlyValue)
            + CTC_CONST_0_0483 * basicYearlyValue
            + CTC_CONST_2400)
          + sum
          + flexible_benefit_sum
          + statutorySum(basicYearlyValue))
          / CTC_CONST_12,
		},
		monthly_in_hand_without_tds: {
			heading: 'Monthly Approx in Hand without TDS Deduction',
			monthlyValue:
        (ctcInput * variable_split) / CTC_CONST_12
        + Number(data?.monthlyJoiningBonus || CTC_CONST_0)
        + Number(data?.monthlySignInBonus || CTC_CONST_0)
        + (Math.round(calculateResult(basicYearlyValue)
            + CTC_CONST_0_0483 * basicYearlyValue
            + CTC_CONST_2400)
          + sum
          + flexible_benefit_sum
          + statutorySum(basicYearlyValue))
          / CTC_CONST_12
        - Math.round(calculateResult(basicYearlyValue))
          / CTC_CONST_12
        - (CTC_CONST_0_0483 * basicYearlyValue) / CTC_CONST_12
        - CTC_CONST_1800
        - CTC_CONST_200
        - CTC_CONST_200,
			yearlyValue: null,
		},
	};

	return {
		controls,
	};
};
