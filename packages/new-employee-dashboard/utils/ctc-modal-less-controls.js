const FIXED_SPLIT = 1;
const CONVEYANCE_YEARLY_VALUE = 6000;
const CONSTANT_ONE = 1;
const CONSTANT_ZERO_POINT_FOUR = 0.4;
const CONSTANT_ZERO_POINT_FIVE = 0.5;
const CONSTANT_SIX_THOUSAND = 6000;
const CONSTANT_FIFTEEN_THOUSAND = 15000;
const CONSTANT_TWELVE = 12;
const CONSTANT_ZERO_POINT_ZERO_EIGHT_THREE_THREE = 0.0833;
const CONSTANT_TWENTY_ONE_THOUSAND = 21000;
const CONSTANT_NINE_THOUSAND_FIFTY_SIX = 9056;
const CONSTANT_SEVEN_FIFTY_FOUR = 754;
const CONSTANT_ZERO = 0;
const CONSTANT_ZERO_POINT_ONE_THREE_ZERO_ONE = 0.1301;
const CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE = 0.0483;
const CONSTANT_TWENTY_FOUR_HUNDRED = 2400;
const CONSTANT_NINETEEN_FIFTY = 1950;
const CONSTANT_TWO_HUNDRED = 200;
const CONSTANT_EIGHTEEN_HUNDRED = 1800;

const calculateResult = (basicYearlyValue) => (basicYearlyValue / CONSTANT_TWELVE < CONSTANT_FIFTEEN_THOUSAND
	? CONSTANT_ZERO_POINT_ONE_THREE_ZERO_ONE * basicYearlyValue
	: CONSTANT_NINETEEN_FIFTY * CONSTANT_TWELVE);

export const ctcModalLessControls = (ctcInput, data = {}) => {
	const variable_split = CONSTANT_ONE - FIXED_SPLIT;

	const basicYearlyValue = ctcInput * CONSTANT_ZERO_POINT_FOUR;
	const hraYearlyValue = basicYearlyValue * CONSTANT_ZERO_POINT_FIVE;
	const TELEPHONE_ALLOWANCE_YEARLY_VALUE = 6000;
	const providentFunds = Math.round(calculateResult(basicYearlyValue));
	const flexible_benefit_sum = CONSTANT_ZERO_POINT_ZERO_EIGHT_THREE_THREE * ctcInput * CONSTANT_ZERO_POINT_FOUR
	+ CONSTANT_FIFTEEN_THOUSAND;
	const statutorySum = (inputVal) => {
		if (inputVal / CONSTANT_TWELVE > CONSTANT_TWENTY_ONE_THOUSAND) {
			return CONSTANT_ZERO;
		}
		if (inputVal / CONSTANT_TWELVE < CONSTANT_TWENTY_ONE_THOUSAND
		&& inputVal / CONSTANT_TWELVE > CONSTANT_NINE_THOUSAND_FIFTY_SIX) {
			return CONSTANT_SEVEN_FIFTY_FOUR * CONSTANT_TWELVE;
		}
		return CONSTANT_SEVEN_FIFTY_FOUR * CONSTANT_TWELVE;
	};
	const statutoryBonus = statutorySum(basicYearlyValue);
	const specialAllowanceYearlyValue = ctcInput - (basicYearlyValue + hraYearlyValue
					+ CONVEYANCE_YEARLY_VALUE + TELEPHONE_ALLOWANCE_YEARLY_VALUE + flexible_benefit_sum + providentFunds
					+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue + CONSTANT_TWENTY_FOUR_HUNDRED
					+ statutoryBonus);

	const sum = basicYearlyValue + hraYearlyValue + CONVEYANCE_YEARLY_VALUE + specialAllowanceYearlyValue
				+ TELEPHONE_ALLOWANCE_YEARLY_VALUE;

	const controls = {
		basic: {
			heading      : 'Basic',
			yearlyValue  : basicYearlyValue,
			monthlyValue : basicYearlyValue / CONSTANT_TWELVE,
		},
		hra: {
			heading      : 'HRA',
			yearlyValue  : hraYearlyValue,
			monthlyValue : hraYearlyValue / CONSTANT_TWELVE,
		},
		conveyance_allowance: {
			heading      : 'Conveyance Allowance',
			yearlyValue  : CONVEYANCE_YEARLY_VALUE,
			monthlyValue : CONVEYANCE_YEARLY_VALUE / CONSTANT_TWELVE,
		},
		special_allowance: {
			heading      : 'Special Allowance',
			yearlyValue  : specialAllowanceYearlyValue,
			monthlyValue : specialAllowanceYearlyValue / CONSTANT_TWELVE,
		},
		telephone_allowance: {
			heading      : 'Telephone Allowance',
			yearlyValue  : CONSTANT_SIX_THOUSAND,
			monthlyValue : CONSTANT_SIX_THOUSAND / CONSTANT_TWELVE,
		},

		annual_base: {
			heading      : 'Annual Base Salary [A]',
			yearlyValue  : sum,
			monthlyValue : sum / CONSTANT_TWELVE,
		},
		lta: {
			heading      : 'Leave Travel Allowance - LTA',
			yearlyValue  : CONSTANT_ZERO_POINT_ZERO_EIGHT_THREE_THREE * ctcInput * CONSTANT_ZERO_POINT_FOUR,
			monthlyValue : (CONSTANT_ZERO_POINT_ZERO_EIGHT_THREE_THREE * ctcInput * CONSTANT_ZERO_POINT_FOUR)
							/ CONSTANT_TWELVE,
		},
		medical_reimbursement: {
			heading      : 'Medical allowance ',
			yearlyValue  : CONSTANT_FIFTEEN_THOUSAND,
			monthlyValue : 1250,
		},
		flexible_benefits: {
			heading      : 'Flexible Benefits [B]',
			yearlyValue  : flexible_benefit_sum,
			monthlyValue : flexible_benefit_sum / CONSTANT_TWELVE,
		},
		provident_fund: {
			heading      : "Provident Fund (Employer's Contribution)",
			yearlyValue  : Math.round(calculateResult(basicYearlyValue)),
			monthlyValue : Math.round(calculateResult(basicYearlyValue)) / CONSTANT_TWELVE,
		},
		gratuity: {
			heading      : 'Gratuity (As per Act)',
			yearlyValue  : CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue,
			monthlyValue : (CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue) / CONSTANT_TWELVE,
		},
		medical_policy: {
			heading      : 'Medical Policy',
			yearlyValue  : CONSTANT_TWENTY_FOUR_HUNDRED,
			monthlyValue : CONSTANT_TWO_HUNDRED,
		},
		retirals: {
			heading     : 'Retirals [C]',
			yearlyValue : Math.round(calculateResult(basicYearlyValue))
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED,
			monthlyValue: (Math.round(calculateResult(basicYearlyValue))
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue + CONSTANT_TWENTY_FOUR_HUNDRED)
						/ CONSTANT_TWELVE,
		},
		sub_total_monthly_gross: {
			heading     : 'Sub-Total Monthly Gross Annualized [A + B+ C]',
			yearlyValue : Math.round(calculateResult(basicYearlyValue)
					+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue + CONSTANT_TWENTY_FOUR_HUNDRED)
					+ sum + flexible_benefit_sum,
			monthlyValue: (Math.round(calculateResult(basicYearlyValue)
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED) + sum
						+ flexible_benefit_sum) / CONSTANT_TWELVE,
		},
		statutory_bonus: {
			heading      : 'Statutory Bonus [D]',
			yearlyValue  : statutorySum(basicYearlyValue),
			monthlyValue : statutorySum(basicYearlyValue) / CONSTANT_TWELVE,
		},
		annual_gross_salary: {
			heading     : 'Annual Gross Salary [A + B + C + D]',
			yearlyValue : Math.round(calculateResult(basicYearlyValue)
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED) + sum + flexible_benefit_sum
						+ statutorySum(basicYearlyValue),
			monthlyValue: (Math.round(calculateResult(basicYearlyValue)
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED) + sum + flexible_benefit_sum + statutorySum(basicYearlyValue))
        / CONSTANT_TWELVE,
		},

		incentives: {
			heading     : 'Incentives [E]',
			yearlyValue : Number(data?.yearlyJoiningBonus || CONSTANT_ZERO)
						+ Number(data?.yearlySignInBonus || CONSTANT_ZERO),
			monthlyValue: Number(data?.monthlyJoiningBonus || CONSTANT_ZERO)
						+ Number(data?.monthlySignInBonus || CONSTANT_ZERO),
		},
		variable_component: {
			heading      : 'Variable Component [V]',
			yearlyValue  : ctcInput * variable_split,
			monthlyValue : (ctcInput * variable_split) / CONSTANT_TWELVE,
		},

		total_targeted_compensation: {
			heading     : 'Total Targeted Compensation [A + B + C + D + E + V]',
			yearlyValue : ctcInput * variable_split + (Number(data?.yearlyJoiningBonus || CONSTANT_ZERO)
						+ Number(data?.yearlySignInBonus || CONSTANT_ZERO))
						+ (Math.round(calculateResult(basicYearlyValue)
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED) + sum + flexible_benefit_sum + statutorySum(basicYearlyValue)),

			monthlyValue: (ctcInput * variable_split) / CONSTANT_TWELVE
						+ Number(data?.monthlyJoiningBonus || CONSTANT_ZERO)
						+ Number(data?.monthlySignInBonus || CONSTANT_ZERO)
						+ (Math.round(calculateResult(basicYearlyValue)
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue + CONSTANT_TWENTY_FOUR_HUNDRED)
						+ sum + flexible_benefit_sum + statutorySum(basicYearlyValue)) / CONSTANT_TWELVE,
		},
		monthly_in_hand_without_tds: {
			heading      : 'Monthly Approx in Hand without TDS Deduction',
			yearlyValue  : null,
			monthlyValue : (ctcInput * variable_split) / CONSTANT_TWELVE
						+ Number(data?.monthlyJoiningBonus || CONSTANT_ZERO)
						+ Number(data?.monthlySignInBonus || CONSTANT_ZERO)
						+ (Math.round(calculateResult(basicYearlyValue)
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue + CONSTANT_TWENTY_FOUR_HUNDRED)
						+ sum + flexible_benefit_sum + statutorySum(basicYearlyValue)) / CONSTANT_TWELVE
						- Math.round(calculateResult(basicYearlyValue)) / CONSTANT_TWELVE
						- (CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue) / CONSTANT_TWELVE
						- CONSTANT_EIGHTEEN_HUNDRED - CONSTANT_TWO_HUNDRED - CONSTANT_TWO_HUNDRED,

		},
	};

	return {
		controls,
	};
};
