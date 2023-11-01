import { Button, Table } from '@cogoport/components';
import { DatepickerController, SelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { getMonth, getDate, getYear, startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import getOrderColumns from '../../../commons/MyOrderColumns/getOrderColumns';
import useCancelOrder from '../../../hooks/useCancelOrder';
import useGetOrderDetails from '../../../hooks/useGetOrderDetails';
import useGetProductFilterDetail from '../../../hooks/useGetProductFilterDetail';
import usePlaceOrder from '../../../hooks/usePlaceOrder';
import useUpdateStatus from '../../../hooks/useUpdateStatus';
import { MONTHS, STATUS_OPTIONS } from '../../../utils/constants';

import styles from './styles.module.css';

function OrderDetails() {
	const { query, push } = useRouter();

	const {
		control,
		setValue,
	} = useForm();

	const { data } = usePlaceOrder();
	let { id } = data || {};

	if (query.id) {
		id = query.id;
	}

	const { data: getOrderData, getOrderDetails } = useGetOrderDetails({ id });
	const {
		order_items_list, order_ticket_id, delivery_date, total_amount,
		order_status, created_at,
	} = getOrderData || {};

	const { data: productData } = useGetProductFilterDetail();

	const { is_hr_admin, currency_code } = productData || {};

	const { color } = productData || {};

	const { cancelOrder } = useCancelOrder(getOrderDetails);
	const handleCancelOrder = () => {
		const payload = {
			order_id     : id,
			order_status : 'cancelled',
		};
		cancelOrder({ payload });
	};

	const time = formatDate({
		date       : created_at,
		dateFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'time',
	});

	const month = getMonth(new Date(created_at));
	const date = getDate(new Date(created_at));
	const year = getYear(new Date(created_at));

	const { updateStatus } = useUpdateStatus({ getOrderDetails });

	const onSubmit = async (val) => {
		const payload = {
			order_id      : id,
			order_status,
			delivery_date : val,
		};
		await updateStatus({ payload });
		getOrderDetails();
	};

	const handleStatusChange = async (newStatus) => {
		if (newStatus !== '') {
			const payload = {
				order_id     : id,
				order_status : newStatus,
			};
			await updateStatus({ payload });
			getOrderDetails();
		}
	};

	useEffect(() => {
		setValue('delivery_day', delivery_date && new Date(getOrderData?.delivery_date));
		setValue('order_status', order_status);
	}, [delivery_date, getOrderData?.delivery_date, order_status, setValue]);

	const columns = getOrderColumns({ color, currency_code });

	return (
		<div className={styles.order_detail_outer}>
			<div className={styles.order_detail_container}>
				<div className={styles.order_detail_header}>
					<IcMArrowBack style={{ cursor: 'pointer' }} onClick={() => push('/cogo-store')} />
					<span>Order Details</span>
				</div>
				<div className={styles.order_detail_info}>
					<div className={styles.order_main_detail}>
						<div className={styles.order_left_detail}>
							<div className={styles.order_left_detail_top}>
								#
								{order_ticket_id}
							</div>
							<div className={styles.order_left_detail_bottom}>
								{order_items_list?.length}
								{' '}
								Products • Order
								{' '}
								{startCase(order_status)}
								{' '}
								on
								{' '}
								{date}
								{' '}
								{MONTHS[month]}
								,
								{' '}
								{year}
								{' '}
								at
								{' '}
								{time}
							</div>
						</div>
						<div className={styles.order_right_detail}>
							{currency_code}
							{total_amount}
						</div>
					</div>
					<div className={styles.order_expected}>
						<div className={styles.order_expected_left}>
							<span className={styles.order_expected_arrival}>Order expected arrival</span>
							{delivery_date ? (
								<span className={styles.order_expected_date}>
									{formatDate({
										date       : delivery_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})}

								</span>
							) : (<span className={styles.order_expected_date}>in 7 Days</span>)}
						</div>
						<div className={styles.order_expected_right}>
							{order_status !== 'cancelled' ? (
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									onClick={handleCancelOrder}
								>
									Cancel Order

								</Button>
							) : null}
						</div>
					</div>
					{is_hr_admin ? (
						<div className={styles.delivery_date}>
							<div className={styles.delivery_date_details}>
								<span>Expected ETD</span>
								<DatepickerController
									placeholder="Select Date"
									control={control}
									dateFormat="MM/dd/yyyy"
									name="delivery_day"
									size="md"
									className={styles.date_picker}
									onChange={onSubmit}
								/>
							</div>
							<div className={styles.delivery_date_details}>
								<span>Update Status</span>
								<SelectController
									placeholder="Status"
									name="order_status"
									size="md"
									height={36}
									control={control}
									options={STATUS_OPTIONS}
									onChange={handleStatusChange}
									isClearable
								/>
							</div>
						</div>
					) : null}
					{/* <Button onClick={handleSubmit(onSubmit)}>set date</Button> */}
					<div className={styles.product_listed}>
						<div className={styles.product_listed_heading}>
							Product
							<span>
								(
								{order_items_list?.length}
								)

							</span>

						</div>
						<div className={styles.table_container}>
							<Table columns={columns} data={order_items_list || []} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderDetails;
