export const ctcModalLessControls = (ctcInput, data) => {
	const fixed_split = 1;
	const variable_split = 1 - fixed_split;
	console.log('data', data);

	const basicYearlyValue = ctcInput * 0.4;
	const hraYearlyValue = basicYearlyValue * 0.5;
	const conveyanceYearlyValue = 6000;
	const providentFunds = Math.round(
		basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
	);
	const flexible_benefit_sum = 0.0833 * ctcInput * 0.4 + 15000;
	const telephoneAllowanceYearlyValue = 6000;
	const statutoryBonus = basicYearlyValue / 12 > 21000
    	? 0
    	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
    		? 754 * 12
    		: 754 * 12;
	const specialAllowanceYearlyValue = ctcInput
    - (basicYearlyValue
      + hraYearlyValue
      + conveyanceYearlyValue
      + telephoneAllowanceYearlyValue
      + flexible_benefit_sum
      + providentFunds
      + 0.0483 * basicYearlyValue
      + 2400
      + statutoryBonus);

	const sum = basicYearlyValue
    + hraYearlyValue
    + conveyanceYearlyValue
    + specialAllowanceYearlyValue
    + telephoneAllowanceYearlyValue;

	const statutory_sum = basicYearlyValue / 12 > 21000
    	? 0
    	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
    		? 754 * 12
    		: 754 * 12;

	const controls = {
		basic: {
			heading      : 'Basic',
			yearlyValue  : basicYearlyValue,
			monthlyValue : basicYearlyValue / 12,
		},
		hra: {
			heading      : 'HRA',
			yearlyValue  : hraYearlyValue,
			monthlyValue : hraYearlyValue / 12,
		},
		conveyance_allowance: {
			heading      : 'Conveyance Allowance',
			yearlyValue  : conveyanceYearlyValue,
			monthlyValue : conveyanceYearlyValue / 12,
		},
		special_allowance: {
			heading      : 'Special Allowance',
			yearlyValue  : specialAllowanceYearlyValue,
			monthlyValue : specialAllowanceYearlyValue / 12,
		},
		telephone_allowance: {
			heading      : 'Telephone Allowance',
			yearlyValue  : 6000,
			monthlyValue : 6000 / 12,
		},

		annual_base: {
			heading      : 'Annual Base Salary [A]',
			yearlyValue  : sum,
			monthlyValue : sum / 12,
		},
		lta: {
			heading      : 'Leave Travel Allowance - LTA',
			yearlyValue  : 0.0833 * ctcInput * 0.4,
			monthlyValue : (0.0833 * ctcInput * 0.4) / 12,
		},
		medical_reimbursement: {
			heading      : 'Medical allowance ',
			yearlyValue  : 15000,
			monthlyValue : 1250,
		},
		flexible_benefits: {
			heading      : 'Flexible Benefits [B]',
			yearlyValue  : flexible_benefit_sum,
			monthlyValue : flexible_benefit_sum / 12,
		},
		provident_fund: {
			heading     : "Provident Fund (Employer's Contribution)",
			yearlyValue : Math.round(
				basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
			),
			monthlyValue:
        Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        ) / 12,
		},
		gratuity: {
			heading      : 'Gratuity (As per Act)',
			yearlyValue  : 0.0483 * basicYearlyValue,
			monthlyValue : (0.0483 * basicYearlyValue) / 12,
		},
		medical_policy: {
			heading      : 'Medical Policy',
			yearlyValue  : 2400,
			monthlyValue : 200,
		},
		retirals: {
			heading: 'Retirals [C]',
			yearlyValue:
        Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + 2400,
			monthlyValue:
        (Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
          + 0.0483 * basicYearlyValue
          + 2400)
        / 12,
		},
		sub_total_monthly_gross: {
			heading: 'Sub-Total Monthly Gross Annualized [A + B+ C]',
			yearlyValue:
        Math.round(
        	(basicYearlyValue / 12 < 15000
        		? 0.1301 * basicYearlyValue
        		: 1950 * 12)
            + 0.0483 * basicYearlyValue
            + 2400,
        )
        + sum
        + flexible_benefit_sum,
			monthlyValue:
        (Math.round(
        	(basicYearlyValue / 12 < 15000
        		? 0.1301 * basicYearlyValue
        		: 1950 * 12)
            + 0.0483 * basicYearlyValue
            + 2400,
        )
          + sum
          + flexible_benefit_sum)
        / 12,
		},
		statutory_bonus: {
			heading: 'Statutory Bonus [D]',
			yearlyValue:
        basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12,
			monthlyValue:
        (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12) / 12,
		},
		annual_gross_salary: {
			heading: 'Annual Gross Salary [A + B + C + D]',
			yearlyValue:
        Math.round(
        	(basicYearlyValue / 12 < 15000
        		? 0.1301 * basicYearlyValue
        		: 1950 * 12)
            + 0.0483 * basicYearlyValue
            + 2400,
        )
        + sum
        + flexible_benefit_sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12),
			monthlyValue:
        (Math.round(
        	(basicYearlyValue / 12 < 15000
        		? 0.1301 * basicYearlyValue
        		: 1950 * 12)
            + 0.0483 * basicYearlyValue
            + 2400,
        )
          + sum
          + flexible_benefit_sum
          + (basicYearlyValue / 12 > 21000
          	? 0
          	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
          		? 754 * 12
          		: 754 * 12))
        / 12,
		},

		incentives: {
			heading: 'Incentives [E]',
			yearlyValue:
        Number(data?.joining_bonus_yearly)
        + Number(data?.sign_on_bonus_yearly),
			monthlyValue:
        Number(data?.joining_bonus_monthly)
        + Number(data?.sign_on_bonus_monthly),
		},
		variable_component: {
			heading      : 'Variable Component [V]',
			yearlyValue  : ctcInput * variable_split,
			monthlyValue : (ctcInput * variable_split) / 12,
		},

		total_targeted_compensation: {
			heading: 'Total Targeted Compensation [A+B+C+D+E+V]',
			yearlyValue:
        ctcInput * variable_split
        + Number(data?.joining_bonus_yearly)
        + Number(data?.sign_on_bonus_yearly) + Math.round(
        	(basicYearlyValue / 12 < 15000
        		? 0.1301 * basicYearlyValue
        		: 1950 * 12)
            + 0.0483 * basicYearlyValue
            + 2400,
        )
        + sum
        + flexible_benefit_sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12),

			monthlyValue: (ctcInput * variable_split) / 12 + Number(data?.joining_bonus_monthly)
      + Number(data?.sign_on_bonus_monthly) + (Math.round(
				(basicYearlyValue / 12 < 15000
					? 0.1301 * basicYearlyValue
					: 1950 * 12)
          + 0.0483 * basicYearlyValue
          + 2400,
			)
        + sum
        + flexible_benefit_sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12))
      / 12
			,
		},
		monthly_in_hand_without_tds: {
			heading      : 'Monthly Approx in Hand without TDS Deduction',
			monthlyValue : (ctcInput * variable_split) / 12 + Number(data?.joining_bonus_monthly)
      + Number(data?.sign_on_bonus_monthly) + (Math.round(
				(basicYearlyValue / 12 < 15000
					? 0.1301 * basicYearlyValue
					: 1950 * 12)
          + 0.0483 * basicYearlyValue
          + 2400,
			)
        + sum
        + flexible_benefit_sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12))
      / 12 - Math.round(
				basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
			) / 12 - (0.0483 * basicYearlyValue) / 12 - 1800 - 200 - 200,
			yearlyValue: null,
		},
	};

	return {
		controls,
	};
};

export const ctcModalControls = (ctcInput, data) => {
	const fixed_split = 1;
	const variable_split = 1 - fixed_split;

	const basicYearlyValue = ctcInput * 0.4;
	const hraYearlyValue = basicYearlyValue * 0.5;
	const conveyanceYearlyValue = 1600 * 12;

	const foodAllowanceYearlyValue = 2200 * 12;
	const fuelAllowanceYearlyValue = 2700 * 12;
	const telephoneAllowanceYearlyValue = Math.max(0.015 * ctcInput, 500 * 12);
	const flexible_benefit_sum = 0.0833 * basicYearlyValue + 15000;

	let result;
	if (
		ctcInput
      - (basicYearlyValue
        + hraYearlyValue
        + conveyanceYearlyValue
        + foodAllowanceYearlyValue
        + fuelAllowanceYearlyValue
        + telephoneAllowanceYearlyValue
        + 0.0833 * basicYearlyValue
        + 15000
        + Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + basicYearlyValue / 12
      > 21000
      	? 0
      	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
      		? 754 * 12
      		: 754 * 12)
    > 0
	) {
		result = ctcInput
      - (basicYearlyValue
        + hraYearlyValue
        + conveyanceYearlyValue
        + foodAllowanceYearlyValue
        + fuelAllowanceYearlyValue
        + telephoneAllowanceYearlyValue
        + flexible_benefit_sum
        + Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + 2400
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12));
	} else {
		result = 0;
	}

	const specialAllowanceYearlyValue = result;
	// ctcInput -
	//   (basicYearlyValue +
	//     hraYearlyValue +
	//     conveyanceYearlyValue +
	//     foodAllowanceYearlyValue +
	//     fuelAllowanceYearlyValue +
	//     telephoneAllowanceYearlyValue +
	//     0.0833 * basicYearlyValue +
	//     15000 +
	//     Math.round(
	//       basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
	//     ) +
	//     0.0833 * basicYearlyValue +
	//     basicYearlyValue / 12 >
	//   21000
	//     ? 0
	//     : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
	//     ? 754 * 12
	//     : 754 * 12) >
	// 0
	//   ? ctcInput -
	//     (basicYearlyValue +
	//       hraYearlyValue +
	//       conveyanceYearlyValue +
	//       foodAllowanceYearlyValue +
	//       fuelAllowanceYearlyValue +
	//       telephoneAllowanceYearlyValue +
	//       0.0833 * basicYearlyValue +
	//       15000 +
	//       Math.round(
	//         basicYearlyValue / 12 < 15000
	//           ? 0.1301 * basicYearlyValue
	//           : 1950 * 12
	//       ) +
	//       0.0833 * basicYearlyValue +
	//       2400 +
	//       basicYearlyValue / 12 >
	//     21000
	//       ? 0
	//       : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
	//       ? 754 * 12
	//       : 754 * 12)
	//   : 0;

	const sum = basicYearlyValue
    + hraYearlyValue
    + conveyanceYearlyValue
    + specialAllowanceYearlyValue
    + foodAllowanceYearlyValue
    + fuelAllowanceYearlyValue
    + telephoneAllowanceYearlyValue;

	const statutory_sum = basicYearlyValue / 12 > 21000
    	? 0
    	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
    		? 754 * 12
    		: 754 * 12;

	const controls = {
		basic: {
			heading      : 'Basic',
			yearlyValue  : basicYearlyValue,
			monthlyValue : basicYearlyValue / 12,
		},
		hra: {
			heading      : 'HRA',
			yearlyValue  : basicYearlyValue * 0.5,
			monthlyValue : (basicYearlyValue * 0.5) / 12,
		},
		conveyance_allowance: {
			heading      : 'Conveyance Allowance',
			yearlyValue  : 1600 * 12,
			monthlyValue : 1600,
		},
		special_allowance: {
			heading      : 'Special Allowance',
			yearlyValue  : specialAllowanceYearlyValue,
			monthlyValue : specialAllowanceYearlyValue / 12,
		},
		food_allowance: {
			heading      : 'Food Allowance',
			yearlyValue  : 2200 * 12,
			monthlyValue : 2200,
		},
		fuel_allowance: {
			heading      : 'Fuel Allowance',
			yearlyValue  : 2700 * 12,
			monthlyValue : 2700,
		},
		telephone_allowance: {
			heading      : 'Telephone Allowance',
			yearlyValue  : Math.max(0.015 * ctcInput, 500 * 12),
			monthlyValue : Math.max(0.015 * ctcInput, 500 * 12) / 12,
		},
		annual_base: {
			heading      : 'Annual Base Salary [A]',
			yearlyValue  : sum,
			monthlyValue : sum / 12,
		},
		lta: {
			heading      : 'Leave Travel Allowance - LTA',
			yearlyValue  : 0.0833 * basicYearlyValue,
			monthlyValue : (0.0833 * basicYearlyValue) / 12,
		},
		medical_reimbursement: {
			heading      : 'Medical Reimbursement',
			yearlyValue  : 15000,
			monthlyValue : 1250,
		},
		flexible_benefits: {
			heading      : 'Flexible Benefits [B]',
			yearlyValue  : flexible_benefit_sum,
			monthlyValue : flexible_benefit_sum / 12,
		},
		provident_fund: {
			heading     : "Provident Fund (Employer's Contribution)",
			yearlyValue : Math.round(
				basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
			),
			monthlyValue:
        Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        ) / 12,
		},
		gratuity: {
			heading      : 'Gratuity (As per Act)',
			yearlyValue  : 0.0483 * basicYearlyValue,
			monthlyValue : (0.0483 * basicYearlyValue) / 12,
		},
		medical_policy: {
			heading      : 'Medical Policy',
			yearlyValue  : 2400,
			monthlyValue : 200,
		},
		retirals: {
			heading: 'Retirals [C]',
			yearlyValue:
        Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + 2400,
			monthlyValue:
        (Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
          + 0.0483 * basicYearlyValue
          + 2400)
        / 12,
		},
		statutory_bonus: {
			heading: 'Statutory Bonus [D]',
			yearlyValue:
        basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12,
			monthlyValue:
        (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12) / 12,
		},
		annual_gross_salary: {
			heading: 'Annual Gross Salary [ A + B + C + D]',
			yearlyValue:
        sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12)
        + Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + 2400
        + flexible_benefit_sum,
			monthlyValue:
        (sum
          + (basicYearlyValue / 12 > 21000
          	? 0
          	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
          		? 754 * 12
          		: 754 * 12)
          + Math.round(
          	basicYearlyValue / 12 < 15000
          		? 0.1301 * basicYearlyValue
          		: 1950 * 12,
          )
          + 0.0483 * basicYearlyValue
          + 2400
          + flexible_benefit_sum)
        / 12,
		},
		incentives: {
			heading: 'Incentives [E]',
			yearlyValue:
        Number(data?.joining_bonus_yearly)
        + Number(data?.performance_linked_variable_yearly)
        + Number(data?.retention_bonus_yearly),
			monthlyValue:
        Number(data?.joining_bonus_monthly)
        + Number(data?.performance_linked_variable_monthly)
        + Number(data?.retention_bonus_monthly),
		},
		variable_component: {
			heading      : 'Variable Component [V]',
			yearlyValue  : ctcInput * variable_split,
			monthlyValue : (ctcInput * variable_split) / 12,
		},
		total_targeted_compensation_no_retention: {
			heading: 'Total Targeted Compensation without retention [A+B+C+D+E]',
			yearlyValue:
        Number(data?.joining_bonus_yearly)
        + Number(data?.performance_linked_variable_yearly)
        + Number(data?.retention_bonus_yearly)
        + sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12)
        + Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + 2400
        + flexible_benefit_sum,
			monthlyValue:
        Number(data?.joining_bonus_monthly)
        + Number(data?.performance_linked_variable_monthly)
        + Number(data?.retention_bonus_monthly)
        + (sum
          + (basicYearlyValue / 12 > 21000
          	? 0
          	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
          		? 754 * 12
          		: 754 * 12)
          + Math.round(
          	basicYearlyValue / 12 < 15000
          		? 0.1301 * basicYearlyValue
          		: 1950 * 12,
          )
          + 0.0483 * basicYearlyValue
          + 2400
          + flexible_benefit_sum)
          / 12,
		},
		total_targeted_compensation: {
			heading: 'Total Targeted Compensation [A+B+C+D+E+V]',
			yearlyValue:
        ctcInput * variable_split
        + Number(data?.joining_bonus_yearly)
        + Number(data?.performance_linked_variable_yearly)
        + Number(data?.retention_bonus_yearly)
        + sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12)
        + Math.round(
        	basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + 2400
        + flexible_benefit_sum,
			monthlyValue: (ctcInput * variable_split) / 12 + Number(data?.joining_bonus_monthly)
      + Number(data?.performance_linked_variable_monthly)
      + Number(data?.retention_bonus_monthly)
      + (sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12)
        + Math.round(
        	basicYearlyValue / 12 < 15000
        		? 0.1301 * basicYearlyValue
        		: 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + 2400
        + flexible_benefit_sum) / 12,
		},
		monthly_in_hand_without_tds: {
			heading: 'Monthly Approx in Hand without TDS Deduction',

			yearlyValue  : null,
			monthlyValue : (sum
        + (basicYearlyValue / 12 > 21000
        	? 0
        	: basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        		? 754 * 12
        		: 754 * 12)
        + Math.round(
        	basicYearlyValue / 12 < 15000
        		? 0.1301 * basicYearlyValue
        		: 1950 * 12,
        )
        + 0.0483 * basicYearlyValue
        + 2400
        + flexible_benefit_sum)
      / 12 - Math.round(
				basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12,
			) / 12 - (0.0483 * basicYearlyValue) / 12 - 200 - Number(data?.joining_bonus_monthly) - 1800 - 200,
		},

	};

	return {
		controls,
	};
};
