import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function audienceListColumns({ onClickEdit, onClickDeleteIcon }) {
	const listColumns = [
		{
			Header   : 'NAME',
			accessor : (items) => (
				<div className={styles.question}>
					{startCase(items?.name) || '--'}
				</div>
			),
		},
		{
			Header   : 'AUTH ROLES',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.auth_function) || '--'}
				</div>
			),
		},
		{
			Header   : 'NO OF TAGS',
			accessor : () => (
				<div className={styles.tags}>
					26
				</div>
			),
		},
		{
			Header   : 'ACTIONS',
			accessor : (item) => (
				<div className={styles.button_container}>
					<div className={styles.delete_button}>
						<IcMDelete height={20} width={20} onClick={() => onClickDeleteIcon(item)} />
					</div>
					<Button
						themeType="secondary"
						size="sm"
						style={{ marginRight: 8 }}
						onClick={() => onClickEdit(item)}
					>
						EDIT

					</Button>
				</div>
			),
		},
	];
	return { listColumns };
}

export default audienceListColumns;
