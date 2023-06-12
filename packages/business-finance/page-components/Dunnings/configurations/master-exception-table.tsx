import styles from './styles.module.css';

const masterExceptionColumn = () => [
	{
		Header   : 'Customer Name',
		id       : 'customerName',
		accessor : 'customerName',
	},
	{
		Header   : 'PAN',
		id       : 'pan',
		accessor : 'pan',
	},
	{
		Header   : 'Category',
		id       : 'category',
		accessor : 'category',
	},
	{
		Header   : 'Credit Days',
		id       : 'creditDays',
		accessor : 'creditDays',
	},
	{
		Header   : 'Credit Amount',
		id       : 'creditAmount',
		accessor : 'creditAmount',
	},
	{
		Header   : 'Total Due',
		id       : 'totalDue',
		accessor : 'totalDue',
	},
];

export default masterExceptionColumn;
