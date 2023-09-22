import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useMemo } from 'react';

import styles from './styles.module.css';

export const columns = ({
	handleShowModal,
}) => useMemo(() => [
	{
		id       : 'airway_bill_no',
		Header   : <p>AIRWAY BILL NO.</p>,
		accessor : (item) => (
			<div>{item?.data?.airway_bill_no}</div>
		),
	},
	{
		id       : 'company_logo',
		Header   : <p>AIRLINE</p>,
		accessor : (item) => (
			<div className={styles.airline_data}>
				{item?.airline?.logo_url && (
					<img className="image" src={item?.airline?.logo_url} alt="" />
				)}
				<div className="title">
					{' '}
					{item?.airline?.short_name}
				</div>
			</div>
		),
	},
	{
		id     : 'created_at',
		Header : (
			<div>
				<p>
					CREATED AT
				</p>
			</div>
		),
		accessor: (item) => (
			<p>
				{formatDate({
					date       : item?.data?.created_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				})}
			</p>
		),
	},
	{
		id     : 'updated_at',
		Header : (
			<div>
				<div>
					LAST UPDATED AT
				</div>
			</div>
		),
		accessor: (item) => (
			<p>
				{formatDate({
					date       : item?.data?.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				})}
			</p>
		),
	},

	{
		id       : 'status',
		Header   : <p>STATUS</p>,
		accessor : (item) => <p>{item?.data?.status}</p>,
	},
	{
		id       : 'last_updated_by',
		Header   : <p>LAST UPDATED BY</p>,
		accessor : (item) => (
			<p>{item?.performed_by?.name}</p>
		),
	},
	{
		id       : 'actions',
		Header   : <p>ACTIONS</p>,
		accessor : (item) => {
			let action = '';
			if (item?.data?.action === 'track_new') {
				action = 'New';
			} else if (item?.data?.action === 'update_required') {
				action = 'Update Required';
			} else if (item?.data?.action === 'seen') {
				action = 'Seen';
			} else {
				action = item?.data?.action;
			}

			return <span>{action}</span>;
		},
	},

	{
		id       : 'flight_update',
		Header   : '',
		accessor : (item) => (
			<Button onClick={() => handleShowModal(item)}>
				update
			</Button>
		),
	},
], []);
