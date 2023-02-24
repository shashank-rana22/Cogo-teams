import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const requestedColumns = () => [
	{
		Header   : 'Service Name',
		id       : 'name',
		accessor : ({ serviceName }) => (<div className={styles.name}>{startCase(serviceName)}</div>)
		,
	},
	{
		Header   : 'Sub Module',
		accessor : ({ subModule }) => (<div className={styles.name}>{subModule}</div>),
	},
	{
		Header   : 'Original Text',
		accessor : ({ text }) => (<div className={styles.name}>{text}</div>),
	},
	{
		Header   : 'Target Language',
		accessor : ({ targetLanguage }) => (<div className={styles.name}>{targetLanguage}</div>),
	},
	{
		Header   : 'Requested At',
		accessor : ({ createdAt }) => (
			<div className={styles.date}>
				{createdAt}
			</div>
		),
	},
];

export default requestedColumns;
