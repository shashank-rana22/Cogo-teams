function generateArrayOfYears() {
	const currentYear = new Date().getFullYear();
	const newArray = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
	return newArray;
}

const optionsVal = () => generateArrayOfYears().map((item) => ({ value: item.toString(), label: item.toString() }));

interface DisabledConfigProps {
	date?: boolean,
	month?: boolean,
	year?: boolean
}

interface ObjectProps {
	date?: Date,
	month?: string,
	year?: string
}

export const filterControls = (toggleData: boolean, disabledConfig: DisabledConfigProps, filters: ObjectProps) => {
	const today = new Date();

	return [
		{
			name                  : 'date',
			placeholder           : 'Select Date',
			type                  : 'datepicker',
			isPreviousDaysAllowed : true,
			maxDate               : today,
			span                  : 3.3,
			disable               : disabledConfig.date,
			value                 : filters.date,
		},
		{
			name        : 'month',
			placeholder : 'By Month',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : [
				{ value: 'JAN', label: 'January' },
				{ value: 'FEB', label: 'February' },
				{ value: 'MAR', label: 'March' },
				{ value: 'APR', label: 'April' },
				{ value: 'MAY', label: 'May' },
				{ value: 'JUN', label: 'June' },
				{ value: 'JUL', label: 'July' },
				{ value: 'AUG', label: 'August' },
				{ value: 'SEP', label: 'September' },
				{ value: 'OCT', label: 'October' },
				{ value: 'NOV', label: 'November' },
				{ value: 'DEC', label: 'December' },
			],
			disabled: disabledConfig.month || toggleData,
		},
		{
			name        : 'year',
			placeholder : 'By Year',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : optionsVal(),
			disabled    : disabledConfig.year || toggleData,

		},
	];
};
