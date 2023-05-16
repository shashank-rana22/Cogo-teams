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
		span        : 1,
		placeholder : 'Status',
		isClearable : true,
		options     : [
			{ label: 'APPROVED', value: 'APPROVED' },
			{ label: 'POSTED', value: 'POSTED' },
			{ label: 'POSTING FAILED', value: 'POSTING_FAILED' },
		],
	},
];
