import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDocument, IcMEyeopen } from '@cogoport/icons-react';

import styles from './styles.module.css';

const getColumns = ({ onClickViewDocument, setShowModal = () => {} }) => [
	{
		Header   : 'DOCUMENT TYPE',
		accessor : (item) => (
			<div className={styles.name}>{item?.doc_type || 'Aadhar Card'}</div>
		),
	},
	{
		Header   : 'FILE',
		accessor : (item) => (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<IcMDocument width={14} height={14} />
				<div style={{ margin: '0 4px' }}>{item?.file_url?.document_name || 'Aadhar Card'}</div>
				<IcMEyeopen
					width={14}
					height={14}
					style={{ cursor: 'pointer' }}
					onClick={() => onClickViewDocument(item?.id)}
				/>
			</div>
		),
	},
	{
		Header   : 'UPLOAD DATE',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item.created_at || new Date(),
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
	},
	{
		Header   : 'ACTION/STATUS',
		accessor : (item) => (
			<div>
				{item?.status === 'pending'
					? <Button onClick={() => setShowModal(true)} size="sm">Review &amp; Approve</Button>
					: <div>{item?.status || 'Approved'}</div>}
			</div>
		),
	},
];

export default getColumns;
