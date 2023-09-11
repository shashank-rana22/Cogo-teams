import { Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import styles from './styles.module.css';

const useGetColumns = () => ([
	{
		Header   : 'NAME',
		accessor : (item) => (<div className={styles.table_item}>{item.name}</div>),
		id       : 'name',
	},
	{
		Header   : 'UPDATED AT',
		accessor : (item) => (<div className={styles.table_item}>{item.updatedAt}</div>),
		id       : 'updatedAt',
	},
	{
		Header   : 'ACTION',
		accessor : () => (
			<div className={styles.table_item}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.download_button}
				>
					<IcMDownload width={14} height={14} />
				</Button>
				<Button
					size="md"
					themeType="secondary"
					className={styles.view_button}
				>
					<span className={styles.view_text}>View</span>
				</Button>
			</div>
		),
		id: 'action',
	},
]);

export default useGetColumns;
