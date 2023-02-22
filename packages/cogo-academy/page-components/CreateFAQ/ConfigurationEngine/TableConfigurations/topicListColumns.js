import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const topicListColumns = [
	{
		Header   : 'TOPIC NAME',
		accessor : (items) => (
			<div className={styles.question}>
				{startCase(items?.name)}
			</div>
		),
	},
	{
		Header   : 'TOPIC DESCRIPTION',
		accessor : (items) => (
			<div className={styles.topics}>
				{startCase(items?.description)}
			</div>
		),
	},
	{
		Header   : 'UPDATED BY',
		accessor : (items) => (
			<div className={styles.tags}>
				{items?.display_name}
			</div>
		),
	},
	{
		Header   : 'UPDATED AT',
		accessor : (items) => (
			<div className={styles.tags}>
				{format(items.updated_at, 'dd MMM yy')}
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
				<Button themeType="primary" size="sm">VIEW</Button>
			</div>
		),
	},
];

export default topicListColumns;
