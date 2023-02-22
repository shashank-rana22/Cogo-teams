import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const tagListColumns = [
	{
		Header   : 'TAG NAME',
		accessor : (items) => (
			<div className={styles.name}>
				{startCase(items?.name) || '--'}
			</div>
		),
	},
	{
		Header   : 'TAG DESCRIPTION',
		accessor : (items) => (
			<div className={styles.description}>
				{startCase(items?.description) || '--'}
			</div>
		),
	},
	{
		Header   : 'UPDATED BY',
		accessor : (items) => (
			<div className={styles.tags}>
				{startCase(items.display_name) || '--'}
			</div>
		),
	},
	{
		Header   : 'UPDATED AT',
		accessor : (items) => (
			<div className={styles.tags}>
				{format(items.created_at, 'dd MMM yy') || '--'}
			</div>
		),
	},
	{
		Header   : 'ACTIONS',
		accessor : () => (
			<div className={styles.button_container}>
				<div className={styles.delete_button}>
					<IcMDelete height={20} width={20} />
				</div>
				<Button themeType="secondary" size="sm" style={{ marginRight: 8 }}>EDIT</Button>
			</div>
		),
	},
];

export default tagListColumns;
