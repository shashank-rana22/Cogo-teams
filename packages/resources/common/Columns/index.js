import { Button, Pill } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import PossibleScopesTable from './PossibleScopesTable';
import styles from './styles.module.css';

const useGetColumns = ({
	setUpdateResource = () => {},
}) => {
	const columns = [{
		Header   : <div className={styles.head}>RESOURCE NAME</div>,
		accessor : (item = {}) => (
			<div className={styles.head_content}>
				<div
					className={styles.container}
				>
					{item.name}
				</div>
			</div>
		),
		id  : 'name',
		key : 'name',
	},

	{
		Header   : <div className={styles.head}>DISPLAY NAME</div>,
		accessor : (item = {}) => (
			<div className={styles.head_content}>
				<div
					className={styles.container}
				>
					{item.display_name || '---'}
				</div>
			</div>
		),
		id  : 'display_name',
		key : 'display_name',
	},

	{
		Header   : <div className={styles.head}>POSSIBLE SCOPES</div>,
		accessor : (item = {}) => (
			<div className={styles.head_content}>
				<PossibleScopesTable resourceScopes={item.resource_scopes || []} styles={styles} />
			</div>
		),
		id  : 'resource_scopes',
		key : 'resource_scopes',
	},

	{
		Header   : <div className={styles.head}>SERVICE</div>,
		accessor : (item = {}) => (
			<div className={styles.head_content}>
				<div
					className={styles.container}
				>
					{startCase(item.service || '---')}
				</div>
			</div>
		),
		id  : 'service',
		key : 'service',
	},

	{
		Header   : <div className={styles.head}>ACCESS TYPE</div>,
		accessor : (item = {}) => (
			<div className={styles.head_content}>
				<div
					className={styles.container}
				>
					{startCase(item.access_type || '---')}
				</div>
			</div>
		),
		id  : 'access_type',
		key : 'access_type',
	},

	{
		Header   : <div className={styles.head}>STATUS</div>,
		accessor : (item = {}) => (
			<div className={styles.head_content}>
				<Pill
					color={item.status ? 'green' : 'yellow'}
				>
					{item.status ? 'Active' : 'Inactive'}
				</Pill>
			</div>
		),
		id  : 'status',
		key : 'status',
	},

	{
		Header   : <div className={styles.head}>CREATED AT</div>,
		accessor : (item = {}) => (
			<div className={styles.head_content}>
				{formatDate({
					date       : item.created_at,
					formatType : 'date',
					dateFormat : 'dd MMM yyyy',
				})}
			</div>
		),
		id  : 'created_at',
		key : 'created_at',
	},

	{
		Header   : <div className={styles.head} />,
		accessor : (item = {}) => (
			<div className={styles.head_content}>
				<Button type="button" onClick={() => { setUpdateResource(item); }} size="sm" themeType="secondary">
					Update
				</Button>
			</div>
		),
		id  : 'update',
		key : 'update',
	},
	];

	return columns;
};

export default useGetColumns;
