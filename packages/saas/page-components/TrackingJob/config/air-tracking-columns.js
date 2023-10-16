import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import SortColumns from './sort-columns';
import styles from './styles.module.css';

const getColumns = ({
	handleShowModal = () => {},
	setFilters = () => {},
	filters = {},
}) => [
	{
		id       : 'airway_bill_no',
		Header   : 'Airway Bill No.',
		accessor : (item) => (
			<b>{item?.data?.airway_bill_no}</b>
		),
	},
	{
		id       : 'company_logo',
		Header   : 'Airline',
		accessor : (item) => (
			<div className={styles.airline_data}>
				{item?.airline?.logo_url ? (
					<Image src={item?.airline?.logo_url} height={30} width={30} />
				) : null}

				<div>
					{item?.airline?.short_name}
				</div>
			</div>
		),
	},
	{
		id       : 'created_at',
		Header   : <SortColumns filters={filters} setFilters={setFilters} sortType="created_at" />,
		accessor : (item) => (
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
			<SortColumns filters={filters} setFilters={setFilters} sortType="updated_at" />
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
		Header   : 'Status',
		accessor : (item) => startCase(item?.data?.status),
	},
	{
		id       : 'last_updated_by',
		Header   : 'Last Updated By',
		accessor : (item) => (
			<p>{item?.performed_by?.name}</p>
		),
	},
	{
		id       : 'actions',
		Header   : 'Actions',
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
			<Button size="sm" onClick={() => handleShowModal(item)}>
				Update
			</Button>
		),
	},
];

export default getColumns;
