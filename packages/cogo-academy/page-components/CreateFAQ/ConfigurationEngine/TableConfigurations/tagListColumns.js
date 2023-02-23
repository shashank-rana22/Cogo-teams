import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function tagListColumns({ onClickEdit }) {
	const listColumns = [
		{
			Header   : 'TAG NAME',
			accessor : (items) => (
				<div className={styles.question}>
					{startCase(items?.name) || '--'}
				</div>
			),
		},
		{
			Header   : 'TAG DESCRIPTION',
			accessor : (items) => (
				<div className={styles.topics}>
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
			accessor : (item) => (
				<div className={styles.button_container}>
					<div className={styles.delete_button}>
						<IcMDelete height={20} width={20} />
					</div>
					<Button
						themeType="secondary"
						size="sm"
						style={{ marginRight: 8 }}
						onClick={() => onClickEdit(item)}
					>
						EDIT

					</Button>
					<Button themeType="primary" size="sm">VIEW</Button>
				</div>
			),
		},
	];
	return { listColumns };
}

export default tagListColumns;
