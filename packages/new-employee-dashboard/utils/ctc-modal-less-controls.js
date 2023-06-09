export const ctcModalLessControls = (ctcInput, data = {}) => {
  const fixed_split = 1;
  const variable_split = 1 - fixed_split;

  const basicYearlyValue = ctcInput * 0.4;
  const hraYearlyValue = basicYearlyValue * 0.5;
  const conveyanceYearlyValue = 6000;
  const providentFunds = Math.round(
    basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
  );
  const flexible_benefit_sum = 0.0833 * ctcInput * 0.4 + 15000;
  const telephoneAllowanceYearlyValue = 6000;
  const statutorySum = (inputVal) => {
    if (inputVal / 12 > 21000) {
      return 0;
    }
    if (inputVal / 12 < 21000 && inputVal / 12 > 9056) {
      return 754 * 12;
    }
    return 754 * 12;
  };
  const statutoryBonus = statutorySum(basicYearlyValue);
  const specialAllowanceYearlyValue =
    ctcInput -
    (basicYearlyValue +
      hraYearlyValue +
      conveyanceYearlyValue +
      telephoneAllowanceYearlyValue +
      flexible_benefit_sum +
      providentFunds +
      0.0483 * basicYearlyValue +
      2400 +
      statutoryBonus);

  const sum =
    basicYearlyValue +
    hraYearlyValue +
    conveyanceYearlyValue +
    specialAllowanceYearlyValue +
    telephoneAllowanceYearlyValue;

  const controls = {
    basic: {
      heading: "Basic",
      yearlyValue: basicYearlyValue,
      monthlyValue: basicYearlyValue / 12,
    },
    hra: {
      heading: "HRA",
      yearlyValue: hraYearlyValue,
      monthlyValue: hraYearlyValue / 12,
    },
    conveyance_allowance: {
      heading: "Conveyance Allowance",
      yearlyValue: conveyanceYearlyValue,
      monthlyValue: conveyanceYearlyValue / 12,
    },
    special_allowance: {
      heading: "Special Allowance",
      yearlyValue: specialAllowanceYearlyValue,
      monthlyValue: specialAllowanceYearlyValue / 12,
    },
    telephone_allowance: {
      heading: "Telephone Allowance",
      yearlyValue: 6000,
      monthlyValue: 6000 / 12,
    },

    annual_base: {
      heading: "Annual Base Salary [A]",
      yearlyValue: sum,
      monthlyValue: sum / 12,
    },
    lta: {
      heading: "Leave Travel Allowance - LTA",
      yearlyValue: 0.0833 * ctcInput * 0.4,
      monthlyValue: (0.0833 * ctcInput * 0.4) / 12,
    },
    medical_reimbursement: {
      heading: "Medical allowance ",
      yearlyValue: 15000,
      monthlyValue: 1250,
    },
    flexible_benefits: {
      heading: "Flexible Benefits [B]",
      yearlyValue: flexible_benefit_sum,
      monthlyValue: flexible_benefit_sum / 12,
    },
    provident_fund: {
      heading: "Provident Fund (Employer's Contribution)",
      yearlyValue: Math.round(
        basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
      ),
      monthlyValue:
        Math.round(
          basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
        ) / 12,
    },
    gratuity: {
      heading: "Gratuity (As per Act)",
      yearlyValue: 0.0483 * basicYearlyValue,
      monthlyValue: (0.0483 * basicYearlyValue) / 12,
    },
    medical_policy: {
      heading: "Medical Policy",
      yearlyValue: 2400,
      monthlyValue: 200,
    },
    retirals: {
      heading: "Retirals [C]",
      yearlyValue:
        Math.round(
          basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
        ) +
        0.0483 * basicYearlyValue +
        2400,
      monthlyValue:
        (Math.round(
          basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
        ) +
          0.0483 * basicYearlyValue +
          2400) /
        12,
    },
    sub_total_monthly_gross: {
      heading: "Sub-Total Monthly Gross Annualized [A + B+ C]",
      yearlyValue:
        Math.round(
          (basicYearlyValue / 12 < 15000
            ? 0.1301 * basicYearlyValue
            : 1950 * 12) +
            0.0483 * basicYearlyValue +
            2400
        ) +
        sum +
        flexible_benefit_sum,
      monthlyValue:
        (Math.round(
          (basicYearlyValue / 12 < 15000
            ? 0.1301 * basicYearlyValue
            : 1950 * 12) +
            0.0483 * basicYearlyValue +
            2400
        ) +
          sum +
          flexible_benefit_sum) /
        12,
    },
    statutory_bonus: {
      heading: "Statutory Bonus [D]",
      yearlyValue: statutorySum(basicYearlyValue),
      monthlyValue: statutorySum(basicYearlyValue) / 12,
    },
    annual_gross_salary: {
      heading: "Annual Gross Salary [A + B + C + D]",
      yearlyValue:
        Math.round(
          (basicYearlyValue / 12 < 15000
            ? 0.1301 * basicYearlyValue
            : 1950 * 12) +
            0.0483 * basicYearlyValue +
            2400
        ) +
        sum +
        flexible_benefit_sum +
        statutorySum(basicYearlyValue),

      monthlyValue:
        (Math.round(
          (basicYearlyValue / 12 < 15000
            ? 0.1301 * basicYearlyValue
            : 1950 * 12) +
            0.0483 * basicYearlyValue +
            2400
        ) +
          sum +
          flexible_benefit_sum +
          statutorySum(basicYearlyValue)) /
        12,
    },

    incentives: {
      heading: "Incentives [E]",
      yearlyValue:
        Number(data?.yearlyJoiningBonus || 0) +
        Number(data?.yearlySignInBonus || 0),
      monthlyValue:
        Number(data?.monthlyJoiningBonus || 0) +
        Number(data?.monthlySignInBonus || 0),
    },
    variable_component: {
      heading: "Variable Component [V]",
      yearlyValue: ctcInput * variable_split,
      monthlyValue: (ctcInput * variable_split) / 12,
    },

    total_targeted_compensation: {
      heading: "Total Targeted Compensation [A + B + C + D + E + V]",
      yearlyValue:
        ctcInput * variable_split +
        (Number(data?.yearlyJoiningBonus || 0) +
          Number(data?.yearlySignInBonus || 0)) +
        (Math.round(
          (basicYearlyValue / 12 < 15000
            ? 0.1301 * basicYearlyValue
            : 1950 * 12) +
            0.0483 * basicYearlyValue +
            2400
        ) +
          sum +
          flexible_benefit_sum +
          statutorySum(basicYearlyValue)),

      monthlyValue:
        (ctcInput * variable_split) / 12 +
        Number(data?.monthlyJoiningBonus || 0) +
        Number(data?.monthlySignInBonus || 0) +
        (Math.round(
          (basicYearlyValue / 12 < 15000
            ? 0.1301 * basicYearlyValue
            : 1950 * 12) +
            0.0483 * basicYearlyValue +
            2400
        ) +
          sum +
          flexible_benefit_sum +
          statutorySum(basicYearlyValue)) /
          12,
    },
    monthly_in_hand_without_tds: {
      heading: "Monthly Approx in Hand without TDS Deduction",
      monthlyValue:
        (ctcInput * variable_split) / 12 +
        Number(data?.monthlyJoiningBonus || 0) +
        Number(data?.monthlySignInBonus || 0) +
        (Math.round(
          (basicYearlyValue / 12 < 15000
            ? 0.1301 * basicYearlyValue
            : 1950 * 12) +
            0.0483 * basicYearlyValue +
            2400
        ) +
          sum +
          flexible_benefit_sum +
          statutorySum(basicYearlyValue)) /
          12 -
        Math.round(
          basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
        ) /
          12 -
        (0.0483 * basicYearlyValue) / 12 -
        1800 -
        200 -
        200,
      yearlyValue: null,
    },
  };

  return {
    controls,
  };
};
