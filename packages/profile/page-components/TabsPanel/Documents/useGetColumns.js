import { Button, Toast } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const createDownload = (url) => {
	if (!url) {
		Toast.error('Url does not exist!');
	} else {
		window.open(url, '_self');
		Toast.success('Attendance Report Downloaded successfully');
	}
};

// const handleOpenModal = ({ item, setdocno, setDocumentUrl, setName, setUploadShow }) => {
// 	setName(item.name);
// 	setDocumentNumber(item.number);
// 	setDocumentUrl(item.url);
// 	setUploadShow(true);
// };

const useGetColumns = (
	{
		setShow = () => {},
		setName = () => {},
		setUrl = () => {},
		setUploadShow = () => {},
		setdocno = () => {},
		setDocumentUrl = () => {},
		user_role = '',
	},
) => (
	[
		{
			Header   : 'NAME',
			accessor : (item) => (<div className={styles.table_item}>{startCase(item.name)}</div>),
			id       : 'name',
		},
		{
			Header   : 'DOCUMENT NUMBER',
			accessor : (item) => (<div className={styles.table_item}>{item.number || '-'}</div>),
			id       : 'document_number',
		},
		{
			Header   : 'UPDATED AT',
			accessor : (item) => (<div className={styles.table_item}>{item.updatedAt}</div>),
			id       : 'updatedAt',
		},
		{
			Header   : 'ACTION',
			accessor : (item) => {
				console.log(item.url, 'check');
				return (
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

						<Button
							size="md"
							themeType="secondary"
							className={styles.view_button}
							onClick={() => {
								setName(item.name);
								setdocno(item.number);
								setDocumentUrl(item.url);
								setUploadShow(true);
							// handleOpenModal({ item, setdocno, setDocumentUrl, setName, setUploadShow });
							}}
							disabled={!item.url || !(user_role === 'hrbp')}
						>
							<span className={styles.view_text}>{isEmpty(item.url) ? 'Upload' : 'Update'}</span>
						</Button>

					</div>
				);
			},
			id: 'action',
		},
	]);

export default useGetColumns;
