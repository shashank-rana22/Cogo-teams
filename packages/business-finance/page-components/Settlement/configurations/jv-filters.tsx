import styles from './styles.module.css';

export const jvFilters = [
	{
		name        : 'category',
		placeholder : 'JV Category',
		span        : 1,
		type        : 'asyncSelect',
		multiple    : false,
		size        : 'md',
		isClearable : true,
		initialCall : true,
		asyncKey    : 'journal_category',
		valueKey    : 'category',
		renderLabel : (option, key) => (
			<div className={styles.padding}>
				{`${option?.[key]} - ${option.description}`}
			</div>
		),
	},
	{
		name        : 'status',
		type        : 'select',
		placeholder : 'Status',
		isClearable : true,
		size        : 'md',
		selectWidth : '180px',
		span        : 1,
		options     : [
			{ label: 'APPROVED', value: 'APPROVED' },
			{ label: 'POSTED', value: 'POSTED' },
			{ label: 'POSTING FAILED', value: 'POSTING_FAILED' },
		],
	},
	{
		name                  : 'accountingDate',
		type                  : 'singleDateRange',
		placeholder           : 'Accounting Date',
		style                 : { width: '200px' },
		isPreviousDaysAllowed : true,
	},
];
