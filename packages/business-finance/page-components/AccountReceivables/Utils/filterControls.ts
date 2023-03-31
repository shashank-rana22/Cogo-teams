import { subtractDays } from '@cogoport/utils';

function generateArrayOfYears() {
	const currentYear = new Date().getFullYear();
	const newArray = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
	return newArray;
}

const optionsVal = () => generateArrayOfYears().map((item) => ({ value: item.toString(), label: item.toString() }));

export const filterControls = (toggleData) => {
	const today = new Date();

	const newStartDate = subtractDays(today, 1);
	return [
		{
			name                  : 'date',
			placeholder           : 'Select Date',
			type                  : 'datepicker',
			caret                 : true,
			isPreviousDaysAllowed : true,
			isClearable           : true,
			maxDate               : newStartDate,
			span                  : 3.3,
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
			disabled: toggleData,
		},
		{
			name        : 'year',
			placeholder : 'By Year',
			type        : 'select',
			caret       : true,
			isClearable : true,
			options     : optionsVal(),
			disabled    : toggleData,

		},
	];
};
