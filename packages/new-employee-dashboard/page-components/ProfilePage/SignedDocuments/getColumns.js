import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMDocument, IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({ onClickViewDocument, setShowModal = () => {} }) => [
	{
		Header   : 'DOCUMENT TYPE',
		accessor : (item) => <div className={styles.name}>{item?.name || 'Aadhar Card'}</div>,
	},

	{
		Header   : 'FILE',
		accessor : (item) => (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<IcMDocument width={14} height={14} />
				<div style={{ margin: '0 4px' }}>
					{item?.signed_document_url || item?.document_url || 'Aadhar Card'}

				</div>
				<IcMEyeopen
					width={14}
					height={14}
					style={{ cursor: 'pointer' }}
					onClick={() => onClickViewDocument({ url: item?.signed_document_url || item?.document_url })}
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
					: <div>{startCase(item?.status) || 'Approved'}</div>}
			</div>
		),
	},
];

export default getColumns;
