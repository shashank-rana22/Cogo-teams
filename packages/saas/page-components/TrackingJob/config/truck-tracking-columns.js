import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import SortColumns from './sort-columns';

const COLOR_MAPPING = {
	ongoing       : '#FFF4D0',
	completed     : '#CDF7D4',
	cargo_dropped : '#CDF7D4',
};
export const columns = ({
	handleShowModal = () => {},
	setFilters = () => {},
	filters = {},
}) => [
	{

		Header   : <p>SERIAL ID</p>,
		accessor : (item) => (
			<div>
				{item?.serial_id ? (
					<p className="serialId">
						{`${item?.serial_id}`}
					</p>
				) : (
					''
				)}
			</div>
		),
		id: 'serial_id',
	},
	{
		Header   : <p>Truck No./LR NO</p>,
		accessor : (item) => (
			<p>
				{`${item?.truck_number}`}
			</p>
		),
		id: 'truck_no',
	},
	{
		id       : 'service_provider',
		Header   : <p>Service Provider</p>,
		accessor : (item) => (
			<div>{item?.service_provider?.business_name}</div>

		),
	},
	{
		id     : 'created_at',
		Header : (
			<SortColumns filters={filters} setFilters={setFilters} sortType="created_at" />
		),
		accessor: (item) => (
			<p>
				{formatDate({
					date       : item?.created_at,
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
			<div>
				{formatDate({
					date       : item?.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				})}
			</div>
		),
	},
	{
		id       : 'container_update',
		Header   : <p>ACTIONS</p>,
		accessor : (item) => (
			<Button onClick={() => handleShowModal(item)} size="sm">
				View Status
			</Button>
		),
	},
	{
		id       : 'actions',
		Header   : <p>STATUS</p>,
		accessor : (item) => (

			<Pill color={COLOR_MAPPING[item?.status]}>
				{startCase(item?.status)}
			</Pill>

		),

	},
];
