import { Popover, Table, Tooltip, Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EditDeletePopup from './EditDeletePopup';
import SlabContent from './SlabContent';
import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;

function ListingArea({ data = {}, refetch = () => {}, loading = false }) {
	const [visible, setVisible] = useState(null);

	const columns = [
		{ Header: 'Service Name', accessor: (item) => startCase(item?.service) || '-' },
		{
			Header   : 'Origin',
			accessor : (item) => (
				<div className={styles.origin}>
					{item?.origin_location?.name || '-'}
					{' '}
				</div>
			),
		},
		{ Header: 'Destination', accessor: (item) => item?.destination_location?.name || '-' },
		{
			Header   : 'Shipping Line',
			accessor : (item) => startCase(item?.shipping_line?.business_name) || '-',
		},
		{ Header: 'Charge Type', accessor: (item) => (startCase(item?.charge_type) || '-') },

		{ Header: 'Milestone', accessor: (item) => (startCase(item?.milestone) || '-') },
		{
			Header   : 'Charge',
			accessor : (item) => (!item?.free_days
				?	(
					<div className={styles.charge}>
						{`${item?.currency} ${item?.value} ${item?.charge_type === 'percentage' ? '%' : ''}`}
					</div>
				) : '-'),

		},
		{ Header: 'Booking Type', accessor: (item) => startCase(item?.booking_type) || '-' },
		{
			Header   : 'Rate Type',
			accessor : (item) => (item?.rate_type ? (
				<Pill className={styles.rate_type} color="rgb(254 241 223)">
					{startCase(item?.rate_type)}
				</Pill>
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
				!isEmpty(item?.slabs) ? (
					<div className={styles.slabs_container}>
						<div className={styles.slab_detail}>
							<div className={styles.max_content}>
								{`${item?.slabs[GLOBAL_CONSTANTS.zeroth_index]?.lower_limit} - 
								${item?.slabs[GLOBAL_CONSTANTS.zeroth_index]?.upper_limit} Days`}
							</div>
							<div className={styles.price_currency}>
								{item?.slabs[GLOBAL_CONSTANTS.zeroth_index]?.currency}
								{' '}
								{item?.slabs[GLOBAL_CONSTANTS.zeroth_index]?.price}
							</div>

						</div>

						{item?.slabs?.length > ONE ? (
							<Tooltip
								theme="light"
								content={<SlabContent item={item} />}
							>
								<Pill>
									<div className={styles.max_content}>
										{`+${(item?.slabs?.length || ZERO) - ONE} more`}
									</div>
								</Pill>
							</Tooltip>
						) : null}
					</div>
				) : (
					'-'
				)

			),
		},
		{
			Header   : '  ',
			accessor : (item) => (
				<Popover
					trigger="click"
					render={<EditDeletePopup item={item} refetch={refetch} setVisible={setVisible} visible={visible} />}
					visible={visible === item?.id}
					onClickOutside={() => { setVisible(false); }}
				>
					<Button themeType="tertiary" onClick={() => { setVisible(item?.id); }}>
						<IcMOverflowDot />
					</Button>
				</Popover>
			),
		},
	];
	return (
		<div className={styles.table_container}>
			<Table columns={columns} data={data?.list || []} loading={loading} />
		</div>
	);
}

export default ListingArea;
