import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowNext } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const TWO = GLOBAL_CONSTANTS.two;

function OverView({ data = {} }) {
	const { ARROW_RIGHT_TOP, ORDERS_PLACED, TRUCK, HOURGLASS, NOTE_BLUE, PROFIT } = GLOBAL_CONSTANTS.image_url;
	const { orders_delivered, orders_placed, orders_returned, profit, sales } = data || {};

	return (
		<div className={styles.content_overview}>
			<div className={styles.top_overview}>
				<div className={styles.overview_text}>
					Overview
				</div>
			</div>
			<div className={styles.overview_cards}>
				<div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img_1}>
							<img src={ORDERS_PLACED} alt="PROFILE_ICON" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>
								{orders_placed?.curr_month_orders || '0'}
							</span>
							<span className={styles.active_text}>Orders Placed</span>
						</div>
					</div>
					{parseFloat(orders_placed?.growth)
					< GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{parseFloat(orders_placed?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								vs
								{' '}
								{orders_placed?.prev_month_orders }
								{' '}
								last month
							</span>
						</div>
						) : (
							<div className={styles.icon_arrow_up}>
								<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
								{parseFloat(orders_placed?.growth).toFixed(TWO)}
								{' '}
								%
								<span className={styles.compare_month}>
									{' '}
									vs
									{' '}
									{orders_placed?.prev_month_orders }
									{' '}
									last month

								</span>
							</div>
						)}
				</div>
				<div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img_2}>
							<img src={TRUCK} alt="MONEY_VIEW" height="16px" width="16px" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>
								{orders_delivered?.curr_month_orders}
							</span>
							<span className={styles.active_text}>Delivered</span>
						</div>
					</div>
					{parseFloat(orders_delivered?.growth) < GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{parseFloat(orders_delivered?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								vs
								{' '}
								{orders_delivered?.prev_month_orders }
								{' '}
								last month

							</span>
						</div>
					) : (
						<div className={styles.icon_arrow_up}>
							<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
							{parseFloat(orders_delivered?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								vs
								{' '}
								{orders_delivered?.prev_month_orders }
								{' '}
								last month

							</span>
						</div>
					)}
				</div>
				<div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img_3}>
							<img src={HOURGLASS} alt="MONEY_VIEW_GREEN" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>
								{orders_returned?.curr_month_orders}
							</span>
							<span className={styles.active_text}>Returns</span>
						</div>
					</div>
					{parseFloat(orders_returned?.growth) < GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{parseFloat(orders_returned?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								vs
								{' '}
								{orders_returned?.prev_month_orders}
								{' '}
								last month
							</span>
						</div>
					) : (
						<div className={styles.icon_arrow_up}>
							<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
							{parseFloat(orders_returned?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								{' '}
								vs
								{' '}
								{orders_returned?.prev_month_orders}
								{' '}
								{' '}
								last month

							</span>
						</div>
					)}
				</div>
				<div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img_4}>
							<img src={NOTE_BLUE} alt="MONEY_VIEW_GREEN" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>
								{sales?.curr_month_sales}
							</span>
							<span className={styles.active_text}>Sales</span>
						</div>
					</div>
					{parseFloat(sales?.growth) < GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{parseFloat(sales?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								vs
								{' '}
								{sales?.prev_month_sales}
								{' '}
								last month
							</span>
						</div>
					) : (
						<div className={styles.icon_arrow_up}>
							<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
							{parseFloat(sales?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								vs
								{' '}
								{sales?.prev_month_sales}
								{' '}
								last month

							</span>
						</div>
					)}
				</div>
				<div className={styles.overview_card}>
					<div className={styles.card_item}>
						<div className={styles.profile_img_5}>
							<img src={PROFIT} alt="MONEY_VIEW_GREEN" />
						</div>
						<div className={styles.active_employees}>
							<span className={styles.active_count}>
								{profit?.curr_month_sales}
							</span>
							<span className={styles.active_text}>Profit</span>
						</div>
					</div>
					{parseFloat(profit?.growth) < GLOBAL_CONSTANTS.zeroth_index ? (
						<div className={styles.icon_arrow_down}>
							<IcMArrowNext className={styles.arrow_icon_down} />
							{parseFloat(profit?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								vs
								{' '}
								{profit?.prev_month_sales}
								{' '}
								last month
							</span>
						</div>
					) : (
						<div className={styles.icon_arrow_up}>
							<img src={ARROW_RIGHT_TOP} alt="Arrow_Top_Right" />
							{parseFloat(profit?.growth).toFixed(TWO)}
							{' '}
							%
							<span className={styles.compare_month}>
								{' '}
								vs
								{' '}
								{' '}
								{profit?.prev_month_sales}
								{' '}
								{' '}
								last month

							</span>
						</div>
					)}
				</div>

			</div>

		</div>
	);
}

export default OverView;
