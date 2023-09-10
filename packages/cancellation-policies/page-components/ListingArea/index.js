import { Popover, Table, Tooltip, Button } from '@cogoport/components';
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
		{ Header: ' Service Name', accessor: (item) => startCase(item?.service) || '-' },
		{ Header: 'Origin', accessor: (item) => item?.origin_location?.name || '-' },
		{ Header: 'Destination', accessor: (item) => item?.destination_location?.name || '-' },
		{
			Header   : 'Shipping Line',
			accessor : (item) => (item?.shipping_line?.business_name?.toLowerCase()) || '-',
		},
		{ Header: 'Charge Type', accessor: (item) => (startCase(item?.charge_type) || '-') },

		{ Header: 'Milestone', accessor: (item) => (startCase(item?.milestone) || '-') },
		{
			Header   : 'Charge',
			accessor : (item) => (!item?.free_days
				?	 ` ${item?.currency} ${item?.value}${item?.charge_type === 'percentage' ? '%' : ''}` : '-'),

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

				!isEmpty(item?.slabs) ? (

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
								content={<SlabContent item={item} />}
								maxWidth="none"
							>

								<div className={styles.slabs}>
									+
									{(item?.slabs?.length || ZERO) - ONE}
									{' '}
									more
								</div>
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
