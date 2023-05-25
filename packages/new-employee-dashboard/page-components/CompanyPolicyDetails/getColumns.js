import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDocument, IcMEyeopen, IcMDelete } from '@cogoport/icons-react';

import styles from './styles.module.css';

const getColumns = ({ onClickViewDocument, setShowModal, onClickDeleteButton, loading }) => [
	{
		Header   : 'DOCUMENT TYPE',
		accessor : (item) => (
			<div className={styles.name}>{item?.name || '-'}</div>
		),
	},
	{
		Header   : 'FILE',
		accessor : (item) => {
			const arr = item?.document_url.split('/');
			const docName = arr[arr.length - 1];

			return (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<IcMDocument width={14} height={14} />
					<div style={{ margin: '0 4px' }}>{docName || 'View PDF'}</div>
					<IcMEyeopen
						width={14}
						height={14}
						style={{ cursor: 'pointer' }}
						onClick={() => onClickViewDocument(item?.document_url)}
					/>
				</div>
			);
		},
	},
	{
		Header   : 'UPLOAD DATE',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item.updated_at || '-',
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
	},
	{
		Header   : 'UPLOAD/DELETE',
		accessor : (item) => (
			<div style={{ display: 'flex' }}>
				<Button
					size="sm"
					themeType="secondary"
					style={{ marginRight: 8 }}
					onClick={() => setShowModal(item)}
					disabled={loading}
				>
					Update Document
				</Button>

				<IcMDelete
					width={20}
					height={20}
					style={{ cursor: 'pointer' }}
					onClick={() => {
						if (!loading) onClickDeleteButton(item?.id);
					}}
				/>
			</div>
		),
	},
];

export default getColumns;
