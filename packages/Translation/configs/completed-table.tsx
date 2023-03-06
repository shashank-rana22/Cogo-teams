import { startCase } from '@cogoport/utils';

import { Refetch } from '../common/interfaces';
import CreateRoleModal from '../page-components/CreateForm';
import ToolTipWrapper from '../page-components/ListComponents/ToolTipWrapper';

import styles from './styles.module.css';

const completedColumn = (refetch: Refetch) => [
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
		accessor : ({ text }) => (
			<div className={styles.name}>
				<ToolTipWrapper text={text} />
			</div>
		),
	},
	{
		Header   : 'Target Language',
		accessor : ({ targetLanguage }) => (<div className={styles.name}>{targetLanguage}</div>),
	},
	{
		Header   : 'Translated Text',
		accessor : ({ translatedText }) => (
			<div className={styles.name}>
				<ToolTipWrapper text={translatedText} />
			</div>
		),
	},
	{
		Header   : 'Updated At (UTC)',
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
