import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({ onClickOpen = () => {} }) => [
	{
		Header   : 'DEVICE TYPE',
		accessor : (item) => (
			<div>{startCase(item?.device_type)}</div>
		),
	},
	{
		Header   : 'SERIAL ID',
		accessor : (item) => (
			<div>{item?.serial_id}</div>
		),
	},
	{
		Header   : 'INVOICE AMOUNT',
		accessor : (item) => (
			<div>
				INR
				{' '}
				{item?.invoice_amount}
			</div>
		),
	},
	{
		Header   : 'INVOICE PROOF',
		accessor : (item) => (
			<div>
				<Button
					size="md"
					type="button"
					themeType="tertiary"
					className={styles.view_text}
					onClick={() => onClickOpen(item?.invoice_url)}
				>
					View
				</Button>
			</div>
		),
	},
	{
		Header   : 'LAST UPDATED AT',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					formatType : 'dateTime',
				})}
			</div>
		),
	},
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<Pill size="md">{item?.status === 'active' ? 'Pending Approval' : startCase(item?.status)}</Pill>
		),
	},
	{
		Header   : 'REJECTION REASON',
		accessor : (item) => (
			<div>{item?.rejection_reason || '-'}</div>
		),
	},
];

export default getColumns;
