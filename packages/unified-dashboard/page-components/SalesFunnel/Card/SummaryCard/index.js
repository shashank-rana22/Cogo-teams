import formatAmount from '@cogoport/globalization/utils/formatAmount';

import BarChart from '../../../../common/BarChart';
import RevenueCardHeading from '../../../../common/RevenueCardHeading';
import SkeletonBox from '../../../../common/SkeletonBox';

import styles from './styles.module.css';

function SummaryCard({
	title, amount, currency, loading, text, revenueMonth, sale, customers, repeated_customers, containers, CBM, KG,
}) {
	return (
		<>
			<div className={styles.card_container}>
				<div>
					<RevenueCardHeading
						margin="16px 0 1.5px 0"
						title={title}
						marginRight="8px"
						showIcon={false}
						toolTipContent="SalesFunnel"
						enableFilter={false}
					/>
					{loading ? (
						<SkeletonBox />
					) : (

						<div className={styles.summary_card}>
							<div className={styles.container}>
								<div className={styles.col}>
									<div className={styles.booking_col}>
										<div className={styles.booking_total}>
											{formatAmount({
												amount  : amount || 0,
												currency,
												options : {
													style                 : 'currency',
													currencyDisplay       : 'symbol',
													notation              : 'compact',
													compactDisplay        : 'short',
													minimumFractionDigits : 2,
												},
											})}
										</div>

										<div className={styles.booking_value}>
											<div className={styles.stat}>
												<div className={styles.booking_details}>
													<span>
														#
														{text}
														{' '}
														{sale}
													</span>
													<span>
														#Customers
														{' '}
														{customers}
													</span>

													<span>
														<div className={styles.repeat_container}>
															<span>#Repeat Customers </span>
															<span>
																{repeated_customers}
															</span>
														</div>
													</span>
													<span>
														#Containers
														{' '}
														{(
												containers
											)}
													</span>
													<span>
														#CBM
														{' '}
														{(CBM ?? 0).toFixed(3)}
													</span>
													<span>
														#KGs
														{' '}
														{(KG ?? 0).toFixed(3)}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{revenueMonth?.length > 0 && (
				<div className={styles.revenue_container}>
					<div className={styles.card_wrapper}>
						<div className={styles.text_invoice}>
							Invoiced Revenue per month
						</div>
						{revenueMonth?.length > 0 ? (
							<div className={styles.horizontal_bar_graph}>
								<BarChart
									layout="horizontal"
									data={revenueMonth.slice(1) || []}
								/>
							</div>
						) : (
							<div>
								{!loading && (
									<div className={styles.text_nodata}>
										No Data Found
									</div>
								)}
							</div>

						)}
					</div>
				</div>
			)}
		</>
	);
}

export default SummaryCard;
