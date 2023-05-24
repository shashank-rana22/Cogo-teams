export const ctcModalLessControls = (ctcInput) => {
  const basicYearlyValue = ctcInput * 0.4;
  const hraYearlyValue = basicYearlyValue * 0.5;
  const conveyanceYearlyValue = 6000;
  const providentFunds = Math.round(
    basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
  );
  const flexible_benefit_sum = 0.0833 * ctcInput * 0.4 + 15000;
  const telephoneAllowanceYearlyValue = 6000;
  const statutoryBonus =
    basicYearlyValue / 12 > 21000
      ? 0
      : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
      ? 754 * 12
      : 754 * 12;
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

  const statutory_sum =
    basicYearlyValue / 12 > 21000
      ? 0
      : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
      ? 754 * 12
      : 754 * 12;

  const controls = {
    basic: {
      heading: "basic",
      yearlyValue: basicYearlyValue,
      monthlyValue: basicYearlyValue / 12,
    },
    hra: {
      heading: "hra",
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
      heading: "Medical Reimbursement",
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
      heading: "Annual Gross Salary [A+B+C+D]",
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
        (basicYearlyValue / 12 > 21000
          ? 0
          : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
          ? 754 * 12
          : 754 * 12),
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
          (basicYearlyValue / 12 > 21000
            ? 0
            : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
            ? 754 * 12
            : 754 * 12)) /
        12,
    },
  };

  return {
    controls,
  };
};

export const ctcModalControls = (ctcInput) => {
  const basicYearlyValue = ctcInput * 0.4;
  const hraYearlyValue = basicYearlyValue * 0.5;
  const conveyanceYearlyValue = 1600 * 12;

  const foodAllowanceYearlyValue = 2200 * 12;
  const fuelAllowanceYearlyValue = 2700 * 12;
  const telephoneAllowanceYearlyValue = Math.max(0.015 * ctcInput, 500 * 12);
  const flexible_benefit_sum = 0.0833 * basicYearlyValue + 15000;

  let result;
  if (
    ctcInput -
      (basicYearlyValue +
        hraYearlyValue +
        conveyanceYearlyValue +
        foodAllowanceYearlyValue +
        fuelAllowanceYearlyValue +
        telephoneAllowanceYearlyValue +
        0.0833 * basicYearlyValue +
        15000 +
        Math.round(
          basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
        ) +
        0.0483 * basicYearlyValue +
        basicYearlyValue / 12 >
      21000
        ? 0
        : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
        ? 754 * 12
        : 754 * 12) >
    0
  ) {
    result =
      ctcInput -
      (basicYearlyValue +
        hraYearlyValue +
        conveyanceYearlyValue +
        foodAllowanceYearlyValue +
        fuelAllowanceYearlyValue +
        telephoneAllowanceYearlyValue +
        flexible_benefit_sum +
        Math.round(
          basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
        ) +
        0.0483 * basicYearlyValue +
        2400 +
        (basicYearlyValue / 12 > 21000
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

  const sum =
    basicYearlyValue +
    hraYearlyValue +
    conveyanceYearlyValue +
    specialAllowanceYearlyValue +
    foodAllowanceYearlyValue +
    fuelAllowanceYearlyValue +
    telephoneAllowanceYearlyValue;

  const statutory_sum =
    basicYearlyValue / 12 > 21000
      ? 0
      : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
      ? 754 * 12
      : 754 * 12;

  const controls = {
    basic: {
      heading: "Basic",
      yearlyValue: basicYearlyValue,
      monthlyValue: basicYearlyValue / 12,
    },
    hra: {
      heading: "HRA",
      yearlyValue: basicYearlyValue * 0.5,
      monthlyValue: (basicYearlyValue * 0.5) / 12,
    },
    conveyance_allowance: {
      heading: "Conveyance Allowance",
      yearlyValue: 1600 * 12,
      monthlyValue: 1600,
    },
    special_allowance: {
      heading: "Special Allowance",
      yearlyValue: specialAllowanceYearlyValue,
      monthlyValue: specialAllowanceYearlyValue / 12,
    },
    food_allowance: {
      heading: "Food Allowance",
      yearlyValue: 2200 * 12,
      monthlyValue: 2200,
    },
    fuel_allowance: {
      heading: "Fuel Allowance",
      yearlyValue: 2700 * 12,
      monthlyValue: 2700,
    },
    telephone_allowance: {
      heading: "Telephone Allowance",
      yearlyValue: Math.max(0.015 * ctcInput, 500 * 12),
      monthlyValue: Math.max(0.015 * ctcInput, 500 * 12) / 12,
    },
    annual_base: {
      heading: "Annual Base Salary [A]",
      yearlyValue: sum,
      monthlyValue: sum / 12,
    },
    lta: {
      heading: "Leave Travel Allowance - LTA",
      yearlyValue: 0.0833 * basicYearlyValue,
      monthlyValue: (0.0833 * basicYearlyValue) / 12,
    },
    medical_reimbursement: {
      heading: "Medical Reimbursement",
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
    statutory_bonus: {
      heading: "Statutory Bonus [D]",
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
      heading: "Annual Gross Salary [A+B+C+D]",
      yearlyValue:
        sum +
        (basicYearlyValue / 12 > 21000
          ? 0
          : basicYearlyValue / 12 < 21000 && basicYearlyValue / 12 > 9056
          ? 754 * 12
          : 754 * 12) +
        Math.round(
          basicYearlyValue / 12 < 15000 ? 0.1301 * basicYearlyValue : 1950 * 12
        ) +
        0.0483 * basicYearlyValue +
        2400 +
        flexible_benefit_sum,
      monthlyValue: 0,
    },
  };

  return {
    controls,
  };
};
