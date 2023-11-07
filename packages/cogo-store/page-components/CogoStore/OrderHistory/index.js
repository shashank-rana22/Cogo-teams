import { Pagination } from '@cogoport/components';
import { useForm, CheckboxGroupController, RadioGroupController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCGreenCircle, IcCRedCircle, IcMClock } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { getMonth, getDate, getYear, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../commons/EmptyState';
import Loader from '../../../commons/Loader';
import useGetOrderHistory from '../../../hooks/useGetOrderHistory';
import useGetProductFilterDetail from '../../../hooks/useGetProductFilterDetail';
import { ORDER_STATUS, ORDER_IN, MONTHS } from '../../../utils/constants';
import Header from '../Header';

import styles from './styles.module.css';

function OrderHistory() {
	const { push } = useRouter();
	const { control, errors } = useForm();
	const { data:orderHistoryData, setFiltersHistory = () => {}, loading } = useGetOrderHistory();
	const { data:productData } = useGetProductFilterDetail();
	const { currency_code } = productData || {};
	const { list, page, page_limit, total_count } = orderHistoryData || {};

	let quantityNames = [];
	let imagesSrc = '';
	let month; let date; let year;

	const getDeliveryDate = ((dateDelivered) => {
		month = getMonth(new Date(dateDelivered));
		date = getDate(new Date(dateDelivered));
		year = getYear(new Date(dateDelivered));
	});

	const handlePagination = (pageNumber) => {
		setFiltersHistory((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	const getOrderData = ((orderData) => {
		quantityNames = [];
		imagesSrc = '';
		orderData.forEach((orderItem) => {
			const orderQuant = orderItem?.order_quantity || 0;
			const productNam = orderItem?.product_name || '';
			const productImages = orderItem?.product_images || [];

			if (imagesSrc === '') {
				imagesSrc = productImages[GLOBAL_CONSTANTS.zeroth_index];
			}
			// Multiply order_quantity by product_name
			const quantityName = `${orderQuant} x ${productNam}`;
			quantityNames.push(quantityName);
		});
	});

	return (
		<div className={styles.order_history_page}>
			<Header productData={productData} />
			<div className={styles.order_details_container}>
				<div className={styles.order_details_header}>
					<IcMClock />
					<span className={styles.order_details_header_text}>Order History</span>
				</div>
				<div className={styles.order_details}>
					<div className={styles.order_details_left_bar}>
						<div className={styles.order_status}>
							<div className={styles.order_status_header}>
								ORDER STATUS
							</div>
							<CheckboxGroupController
								control={control}
								errors={errors}
								options={ORDER_STATUS}
								className={styles.check_box_controller}
								name="order_status"
								onChange={(val) => {
									setFiltersHistory((prev) => ({
										...prev,
										order_status : val,
										page         : 1,
									}));
								}}
							/>
						</div>
						<div className={styles.order_status}>
							<div className={styles.order_status_header}>
								ORDER IN
							</div>
							<RadioGroupController
								control={control}
								errors={errors}
								options={ORDER_IN}
								className={styles.check_box_controller}
								name="order_in"
								onChange={(val) => {
									setFiltersHistory((prev) => ({
										...prev,
										order_in : val,
										page     : 1,
									}));
								}}
							/>
						</div>
					</div>
					{isEmpty(list) ? <EmptyState />
						: (
							<div className={styles.order_main_container}>
								{/* <div className={styles.search_input}>
							<Input
								size="md"
								placeholder="Search your orders"
								prefix={<IcMSearchlight />}
								style={{ marginBottom: 12 }}
							/>
						</div> */}
								{loading ? <Loader />
									: (
										<div
											className={styles.orders_list}
											aria-hidden
										>
											{(list || []).map((item) => (
												<div
													className={styles.order_item}
													key={item?.id}
													aria-hidden
													onClick={() => push(`/cogo-store/order-details?id=${item.id}`)}
												>
													<div className={styles.order_item_id}>
														{getOrderData(item?.order_items_list)}
														{getDeliveryDate(item?.updated_at)}
														<img
															src={imagesSrc}
															alt="order_img"
															width={80}
															height={80}
															style={{ objectFit: 'contain' }}
														/>
														<div className={styles.order_selected}>
															<span>
																#
																{item?.order_ticket_id}
															</span>
															<div className={styles.quantity_name}>
																{(quantityNames || []).map((QName) => (
																	<span key={QName}>
																		{QName}
																	</span>
																))}
															</div>
														</div>
													</div>
													<div className={styles.order_item_cost}>
														{currency_code}
														{' '}
														{item?.total_amount}
													</div>
													<div className={styles.order_deliver_status}>
														<div className={styles.deliver_text}>
															{item?.order_status === 'cancelled' ? (
																<IcCRedCircle />
															) : (
																<IcCGreenCircle />
															)}
															<span>
																{startCase(item?.order_status)}
																{' '}
																on
																{' '}
																{MONTHS[month]}
																{' '}
																{date}
																,
																{' '}
																{year}
															</span>
														</div>
														<div className={styles.delivered_item_text}>
															Your item has been
															{' '}
															{item?.order_status}
														</div>
													</div>
												</div>
											))}
										</div>
									)}
								{!loading && (
									<Pagination
										type="table"
										currentPage={page}
										totalItems={total_count}
										pageSize={page_limit}
										onPageChange={handlePagination}
										className={styles.pagination_container}
									/>
								)}
							</div>
						)}
				</div>
			</div>
		</div>
	);
}

export default OrderHistory;
