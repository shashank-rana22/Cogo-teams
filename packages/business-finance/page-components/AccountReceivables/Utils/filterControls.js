function generateArrayOfYears() {
	const currentYear = new Date().getFullYear();
	const newArray = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
	return newArray;
}

const optionsVal = () => generateArrayOfYears().map((item) => ({ value: item.toString(), label: item.toString() }));

export const filterControls = (
	toggleData,
	disabledConfig,
	filters,
	t,
) => {
	const today = new Date();

	return [
		{
			name                  : 'date',
			placeholder           : t('select_date_placeholder'),
			type                  : 'datepicker',
			isPreviousDaysAllowed : true,
			maxDate               : today,
			span                  : toggleData ? 12 : 3.3,
			disable               : toggleData ? false : disabledConfig.date,
			value                 : filters.date,
		},
		{
			name        : 'month',
			placeholder : t('by_month_placeholder'),
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : [
				{ value: 'JAN', label: t('jan_month') },
				{ value: 'FEB', label: t('feb_month') },
				{ value: 'MAR', label: t('mar_month') },
				{ value: 'APR', label: t('apr_month') },
				{ value: 'MAY', label: t('may_month') },
				{ value: 'JUN', label: t('jun_month') },
				{ value: 'JUL', label: t('jul_month') },
				{ value: 'AUG', label: t('aug_month') },
				{ value: 'SEP', label: t('sep_month') },
				{ value: 'OCT', label: t('oct_month') },
				{ value: 'NOV', label: t('nov_month') },
				{ value: 'DEC', label: t('dec_month') },
			],
			disabled : disabledConfig.month || toggleData,
			show     : !toggleData,
		},
		{
			name        : 'year',
			placeholder : t('by_year_placeholder'),
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : optionsVal(),
			disabled    : disabledConfig.year || toggleData,
			show        : !toggleData,
		},
	];
};
