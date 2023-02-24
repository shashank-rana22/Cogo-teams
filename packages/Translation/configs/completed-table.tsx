import { startCase } from '@cogoport/utils';

import CreateRoleModal from '../page-components/CreateForm';

import styles from './styles.module.css';

const completedColumn = (refetch) => [
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
		Header   : 'Translated Text',
		accessor : ({ translatedText }) => (
			<div className={styles.name}>
				{translatedText}
			</div>
		),
	},
	{
		Header   : 'Updated At',
		accessor : ({ updatedAt }) => (
			<div className={styles.date}>
				{updatedAt}
			</div>
		),
	},
	{
		Header   : '',
		id       : 'edit',
		accessor : (row) => (
			<CreateRoleModal row={row} status="COMPLETED" showEdit refetch={refetch} />
		),
	},
];

export default completedColumn;
