const FIXED_SPLIT = 1;

const CONSTANT_ONE = 1;
const CONSTANT_ZERO_POINT_FOUR = 0.4;
const CONSTANT_ZERO_POINT_FIVE = 0.5;
const CONSTANT_SIXTEEN_HUNDRED = 1600;
const CONSTANT_TWENTY_TWO_HUNDRED = 2200;
const CONSTANT_TWENTY_SEVEN_HUNDRED = 2700;
const CONSTANT_FIVE_HUNDRED = 500;
const CONSTANT_FIFTEEN_THOUSAND = 15000;
const CONSTANT_TWELVE = 12;
const CONSTANT_ZERO_POINT_ZERO_ONE_FIVE = 0.015;
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
const CONSTANT_TWELVE_FIFTY = 1250;

const calculateValue = (basicYearlyValue) => {
	if (basicYearlyValue / CONSTANT_TWELVE < CONSTANT_FIFTEEN_THOUSAND) {
		return CONSTANT_ZERO_POINT_ONE_THREE_ZERO_ONE * basicYearlyValue;
	}
	return CONSTANT_NINETEEN_FIFTY * CONSTANT_TWELVE;
};

export const ctcModalControls = (ctcInput, data = {}) => {
	const variable_split = CONSTANT_ONE - FIXED_SPLIT;
	const basicYearlyValue = ctcInput * CONSTANT_ZERO_POINT_FOUR;
	const hraYearlyValue = basicYearlyValue * CONSTANT_ZERO_POINT_FIVE;
	const conveyanceYearlyValue = CONSTANT_SIXTEEN_HUNDRED * CONSTANT_TWELVE;
	const foodAllowanceYearlyValue = CONSTANT_TWENTY_TWO_HUNDRED * CONSTANT_TWELVE;
	const fuelAllowanceYearlyValue = CONSTANT_TWENTY_SEVEN_HUNDRED * CONSTANT_TWELVE;
	const telephoneAllowanceYearlyValue = Math.max(
		CONSTANT_ZERO_POINT_ZERO_ONE_FIVE * ctcInput,
		CONSTANT_FIVE_HUNDRED * CONSTANT_TWELVE,
	);
	const flexible_benefit_sum = CONSTANT_ZERO_POINT_ZERO_EIGHT_THREE_THREE * basicYearlyValue
		+ CONSTANT_FIFTEEN_THOUSAND;

	const statutorySum = (inputVal) => {
		if (inputVal / CONSTANT_TWELVE > CONSTANT_TWENTY_ONE_THOUSAND) {
			return CONSTANT_ZERO;
		}
		if (
			inputVal / CONSTANT_TWELVE < CONSTANT_TWENTY_ONE_THOUSAND
      && inputVal / CONSTANT_TWELVE > CONSTANT_NINE_THOUSAND_FIFTY_SIX
		) {
			return CONSTANT_SEVEN_FIFTY_FOUR * CONSTANT_TWELVE;
		}
		return CONSTANT_SEVEN_FIFTY_FOUR * CONSTANT_TWELVE;
	};
	let result;
	if (
		ctcInput - (basicYearlyValue + hraYearlyValue + conveyanceYearlyValue + foodAllowanceYearlyValue
		+ fuelAllowanceYearlyValue + telephoneAllowanceYearlyValue
		+ CONSTANT_ZERO_POINT_ZERO_EIGHT_THREE_THREE * basicYearlyValue
        + CONSTANT_FIFTEEN_THOUSAND + Math.round(calculateValue(basicYearlyValue))
		+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
        + statutorySum(basicYearlyValue)) > CONSTANT_ZERO
	) {
		result = ctcInput - (basicYearlyValue + hraYearlyValue + conveyanceYearlyValue + foodAllowanceYearlyValue
				+ fuelAllowanceYearlyValue + telephoneAllowanceYearlyValue + flexible_benefit_sum
				+ Math.round(calculateValue(basicYearlyValue))
				+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
				+ CONSTANT_TWENTY_FOUR_HUNDRED + statutorySum(basicYearlyValue));
	} else {
		result = CONSTANT_ZERO;
	}

	const specialAllowanceYearlyValue = result;

	const sum = basicYearlyValue + hraYearlyValue + conveyanceYearlyValue + specialAllowanceYearlyValue
				+ foodAllowanceYearlyValue + fuelAllowanceYearlyValue + telephoneAllowanceYearlyValue;

	const controls = {
		basic: {
			heading      : 'Basic',
			yearlyValue  : basicYearlyValue,
			monthlyValue : basicYearlyValue / CONSTANT_TWELVE,
		},
		hra: {
			heading      : 'HRA',
			yearlyValue  : basicYearlyValue * CONSTANT_ZERO_POINT_FIVE,
			monthlyValue : (basicYearlyValue * CONSTANT_ZERO_POINT_FIVE) / CONSTANT_TWELVE,
		},
		conveyance_allowance: {
			heading      : 'Conveyance Allowance',
			yearlyValue  : CONSTANT_SIXTEEN_HUNDRED * CONSTANT_TWELVE,
			monthlyValue : CONSTANT_SIXTEEN_HUNDRED,
		},
		special_allowance: {
			heading      : 'Special Allowance',
			yearlyValue  : specialAllowanceYearlyValue,
			monthlyValue : specialAllowanceYearlyValue / CONSTANT_TWELVE,
		},
		food_allowance: {
			heading      : 'Food Allowance',
			yearlyValue  : CONSTANT_TWENTY_TWO_HUNDRED * CONSTANT_TWELVE,
			monthlyValue : CONSTANT_TWENTY_TWO_HUNDRED,
		},
		fuel_allowance: {
			heading      : 'Fuel Allowance',
			yearlyValue  : CONSTANT_TWENTY_SEVEN_HUNDRED * CONSTANT_TWELVE,
			monthlyValue : CONSTANT_TWENTY_SEVEN_HUNDRED,
		},
		telephone_allowance: {
			heading     : 'Telephone Allowance',
			yearlyValue : Math.max(
				CONSTANT_ZERO_POINT_ZERO_ONE_FIVE * ctcInput,
				CONSTANT_FIVE_HUNDRED * CONSTANT_TWELVE,
			),
			monthlyValue: Math.max(
				CONSTANT_ZERO_POINT_ZERO_ONE_FIVE * ctcInput,
				CONSTANT_FIVE_HUNDRED * CONSTANT_TWELVE,
			) / CONSTANT_TWELVE,
		},
		annual_base: {
			heading      : 'Annual Base Salary [A]',
			yearlyValue  : sum,
			monthlyValue : sum / CONSTANT_TWELVE,
		},
		lta: {
			heading      : 'Leave Travel Allowance - LTA',
			yearlyValue  : CONSTANT_ZERO_POINT_ZERO_EIGHT_THREE_THREE * basicYearlyValue,
			monthlyValue : (CONSTANT_ZERO_POINT_ZERO_EIGHT_THREE_THREE * basicYearlyValue) / CONSTANT_TWELVE,
		},
		medical_reimbursement: {
			heading      : 'Medical Reimbursement',
			yearlyValue  : CONSTANT_FIFTEEN_THOUSAND,
			monthlyValue : CONSTANT_TWELVE_FIFTY,
		},
		flexible_benefits: {
			heading      : 'Flexible Benefits [B]',
			yearlyValue  : flexible_benefit_sum,
			monthlyValue : flexible_benefit_sum / CONSTANT_TWELVE,
		},
		provident_fund: {
			heading      : "Provident Fund (Employer's Contribution)",
			yearlyValue  : Math.round(calculateValue(basicYearlyValue)),
			monthlyValue : Math.round(calculateValue(basicYearlyValue)) / CONSTANT_TWELVE,
		},
		gratuity: {
			heading      : 'Gratuity (As per Act)',
			yearlyValue  : CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue,
			monthlyValue : (CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue) / CONSTANT_TWELVE,
		},
		medical_policy: {
			heading      : 'Medical Policy',
			yearlyValue  : CONSTANT_TWENTY_FOUR_HUNDRED,
			monthlyValue : 200,
		},
		retirals: {
			heading     : 'Retirals [C]',
			yearlyValue : Math.round(calculateValue(basicYearlyValue))
			+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED,
			monthlyValue: (Math.round(calculateValue(basicYearlyValue))
			+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED) / CONSTANT_TWELVE,
		},
		statutory_bonus: {
			heading      : 'Statutory Bonus [D]',
			yearlyValue  : statutorySum(basicYearlyValue),
			monthlyValue : statutorySum(basicYearlyValue) / CONSTANT_TWELVE,
		},
		annual_gross_salary: {
			heading     : 'Annual Gross Salary [ A + B + C + D]',
			yearlyValue : sum + statutorySum(basicYearlyValue) + Math.round(calculateValue(basicYearlyValue))
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED + flexible_benefit_sum,
			monthlyValue: (sum + statutorySum(basicYearlyValue) + Math.round(calculateValue(basicYearlyValue))
						+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
						+ CONSTANT_TWENTY_FOUR_HUNDRED + flexible_benefit_sum) / CONSTANT_TWELVE,
		},
		incentives: {
			heading     : 'Incentives [E]',
			yearlyValue : Number(data?.yearlyJoiningBonus || CONSTANT_ZERO)
						+ Number(data?.yearlyPerformance || CONSTANT_ZERO)
						+ Number(data?.yearlyRetentionBonus || CONSTANT_ZERO),
			monthlyValue:
						Number(data?.monthlyJoiningBonus || CONSTANT_ZERO)
						+ Number(data?.monthlyPerformance || CONSTANT_ZERO)
						+ Number(data?.monthlyRetentionBonus || CONSTANT_ZERO),
		},
		variable_component: {
			heading      : 'Variable Component [V]',
			yearlyValue  : ctcInput * variable_split,
			monthlyValue : (ctcInput * variable_split) / CONSTANT_TWELVE,
		},
		total_targeted_compensation_no_retention: {
			heading: 'Total Targeted Compensation without retention [A+B+C+D+E]',
			yearlyValue:
					Number(data?.yearlyJoiningBonus || CONSTANT_ZERO)
					+ Number(data?.yearlyPerformance || CONSTANT_ZERO)
					+ Number(data?.yearlyRetentionBonus || CONSTANT_ZERO) + sum + statutorySum(basicYearlyValue)
					+ Math.round(calculateValue(basicYearlyValue))
					+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
					+ CONSTANT_TWENTY_FOUR_HUNDRED + flexible_benefit_sum,
			monthlyValue:
					Number(data?.monthlyJoiningBonus || CONSTANT_ZERO)
					+ Number(data?.monthlyPerformance || CONSTANT_ZERO)
					+ Number(data?.monthlyRetentionBonus || CONSTANT_ZERO) + (sum
					+ statutorySum(basicYearlyValue)
					+ Math.round(calculateValue(basicYearlyValue))
					+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
					+ CONSTANT_TWENTY_FOUR_HUNDRED + flexible_benefit_sum) / CONSTANT_TWELVE,
		},
		total_targeted_compensation: {
			heading: 'Total Targeted Compensation [A+B+C+D+E+V]',
			yearlyValue:
					ctcInput * variable_split + Number(data?.yearlyJoiningBonus || CONSTANT_ZERO)
					+ Number(data?.yearlyPerformance || CONSTANT_ZERO)
					+ Number(data?.yearlyRetentionBonus || CONSTANT_ZERO) + sum + statutorySum(basicYearlyValue)
					+ Math.round(calculateValue(basicYearlyValue))
					+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
					+ CONSTANT_TWENTY_FOUR_HUNDRED + flexible_benefit_sum,
			monthlyValue:
					(ctcInput * variable_split) / CONSTANT_TWELVE + Number(data?.monthlyJoiningBonus || CONSTANT_ZERO)
					+ Number(data?.monthlyPerformance || CONSTANT_ZERO)
					+ Number(data?.monthlyRetentionBonus || CONSTANT_ZERO) + (sum
					+ statutorySum(basicYearlyValue) + Math.round(calculateValue(basicYearlyValue))
					+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue + CONSTANT_TWENTY_FOUR_HUNDRED
					+ flexible_benefit_sum) / CONSTANT_TWELVE,
		},
		monthly_in_hand_without_tds: {
			heading      : 'Monthly Approx in Hand without TDS Deduction',
			yearlyValue  : null,
			monthlyValue : (sum + statutorySum(basicYearlyValue) + Math.round(calculateValue(basicYearlyValue))
					+ CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue
					+ CONSTANT_TWENTY_FOUR_HUNDRED + flexible_benefit_sum) / CONSTANT_TWELVE
					- Math.round(calculateValue(basicYearlyValue)) / CONSTANT_TWELVE
					- (CONSTANT_ZERO_POINT_ZERO_FOUR_EIGHT_THREE * basicYearlyValue) / CONSTANT_TWELVE
					- CONSTANT_TWO_HUNDRED - Number(data?.monthlyJoiningBonus || CONSTANT_ZERO)
					- CONSTANT_EIGHTEEN_HUNDRED - CONSTANT_TWO_HUNDRED,
		},
	};

	return {
		controls,
	};
};
