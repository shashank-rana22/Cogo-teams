import { Popover, Table, Tooltip, Tags } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import EditDeletePopup from './EditDeletePopup';
import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
function ListingArea({ data = {} }) {
	const columns = [
		{ Header: ' Service Name', accessor: (item) => startCase(item?.service) || '-' },
		{ Header: 'Origin', accessor: (item) => item?.origin_location?.name || '-' }, // key not present
		{ Header: 'Destination', accessor: (item) => item?.destination_location?.name || '-' }, // key not present
		{
			Header   : 'Shipping Line',
			accessor : (item) => (item?.shipping_line?.business_name?.toLowerCase()) || '-',
		},
		{ Header: 'Charge Type', accessor: (item) => startCase(item?.charge_type) || '-' },
		{ Header: 'Milestone', accessor: (item) => startCase(item?.milestone) || '-' },
		{
			Header   : 'Charge',
			accessor : (item) => (!item?.free_days
				? `${item?.currency} ${item?.value}${item.charge_type === 'percentage' ? '%' : ''}` : '-'),
		},
		{ Header: 'Booking Type', accessor: (item) => startCase(item?.booking_type) || '-' },
		{
			Header   : 'Rate Type',
			accessor : (item) => (item?.rate_type ? (

				startCase(item?.rate_type)

			) : (
				'-'
			)),
		},

		{
			Header   : 'Free Days',
			accessor : (item) => (
				<div style={{ textAlign: 'center' }}>{item?.free_days}</div>
			),
		},
		{
			Header   : 'Slabs',
			accessor : (item) => (

				item?.slabs ? (
					<>
						<div style={{ marginRight: '4px' }}>
							<div>
								{item?.slabs[GLOBAL_CONSTANTS.zeroth_index]?.lower_limit}
								{' '}
								-
								{' '}
								{item?.slabs[GLOBAL_CONSTANTS.zeroth_index]?.upper_limit}
								{' '}
								Days
							</div>
							<div style={{ color: '#5936F0' }}>
								{item?.slabs[GLOBAL_CONSTANTS.zeroth_index]?.currency}
								{' '}
								{item?.slabs[GLOBAL_CONSTANTS.zeroth_index]?.price}
							</div>
						</div>

						{item?.slabs?.length > ONE ? (
							<Tooltip
								theme="light"
								content={item}
								maxWidth="none"
							>

								<Tags className="primary sm">
									+
									{(item?.slabs.length || ZERO) - ONE}
									{' '}
									more
								</Tags>
							</Tooltip>
						) : null}
					</>
				) : (
					'-'
				)

			),
		},
		{
			Header   : '  ',
			accessor : (item) => (
				<Popover
					render={<EditDeletePopup id={item.id} />}

				>
					<IcMOverflowDot />
				</Popover>
			),
		},
	];
	return (
		<div>
			<Table columns={columns} data={data?.list || []} className={styles.table_container} />
		</div>
	);
}

export default ListingArea;
