import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({ onClickViewDocument }) => [
	{
		Header   : 'DOCUMENT NAME',
		accessor : (item) => <div className={styles.name}>{startCase(item?.name)}</div>,
	},
	{
		Header   : 'FILE',
		accessor : (item) => (
			<div
				role="presentation"
				className={styles.view_container}
				onClick={() => onClickViewDocument({ url: item?.signed_document_url || item?.document_url })}
			>
				<div style={{ margin: '0 4px', textDecoration: 'underLine' }}>
					View
				</div>

				<IcMEyeopen
					width={14}
					height={14}
					style={{ cursor: 'pointer' }}

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
		Header   : 'STATUS',
		accessor : (item) => (
			<div>{startCase(item?.status)}</div>
		),
	},
];

export default getColumns;
