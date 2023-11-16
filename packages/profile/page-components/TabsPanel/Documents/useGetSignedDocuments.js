import { Button, Toast } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const createDownload = (url) => {
	if (!url) {
		Toast.error('Url does not exist!');
	} else {
		window.open(url, '_self');
		Toast.success('Attendance Report Downloaded successfully');
	}
};

const useGetSignedDocuments = ({
	setShow = () => {},
	setName = () => {},
	setUrl = () => {},
}) => ([
	{
		Header   : 'NAME',
		accessor : (item) => (<div className={styles.table_item}>{startCase(item.name)}</div>),
		id       : 'name',
	},
	{
		Header   : 'UPDATED AT',
		accessor : (item) => (<div className={styles.table_item}>{item.updatedAt}</div>),
		id       : 'updatedAt',
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (
			<div className={styles.table_item}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.download_button}
					onClick={() => createDownload(item.url)}
					disabled={!item.url}
				>
					<IcMDownload width={14} height={14} />
				</Button>
				<Button
					size="md"
					themeType="secondary"
					className={styles.view_button}
					onClick={() => { setShow(true); setUrl(item.url); setName(item.name); }}
					disabled={!item.url}
				>
					<span className={styles.view_text}>View</span>
				</Button>
			</div>
		),
		id: 'action',
	},
]);

export default useGetSignedDocuments;
