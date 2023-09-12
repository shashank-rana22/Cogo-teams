import { IcMFtick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from '../styles.module.css';

function NegotitionRemarks({
	loading = false,
	selectedCard = {},
	isEmpty = false,
}) {
	const ZEROVALUE = 0;
	const ONEVALUE = 1;
	return (
		<div className={styles.remarks}>
			{!loading
			&& selectedCard?.negotiation_remarks !== null
			&& selectedCard?.negotiation_remarks?.length > ZEROVALUE
			&& selectedCard?.negotiation_card
				.slice()
				.reverse()
				.map((negotiation_card, index) => (
					<>
						<div className={styles.main}>
							<div className={styles.tick}>
								<IcMFtick className={styles.adjust} />
								{negotiation_card?.negotiation_rank === ONEVALUE ? 'First' : 'Second'}
								Negotiation Remark:
							</div>

							<div className={styles.date}>
								{selectedCard?.negotiation_rank === ONEVALUE
									? format(selectedCard?.negotiation_remarks[index]?.date, 'dd MMMM YYYY')
									: format(
										selectedCard?.negotiation_remarks[ONEVALUE - index]?.date,
										'dd MMMM YYYY',
									)}
							</div>
						</div>
						<div className={styles.remark}>
							{selectedCard?.negotiation_rank === ONEVALUE
								? selectedCard?.negotiation_remarks[index]?.remarks
								: selectedCard?.negotiation_remarks[ONEVALUE - index]?.remarks}
						</div>

						<>
							<div>{selectedCard?.negotiation_remarks?.remarks}</div>
							<div className={styles.more}>
								<div className={styles.image}>
									<div
										style={{
											backgroundImage:
												`url('${
													negotiation_card?.rates?.shipping_line?.logo_url
												}')`,
											height           : '30px',
											width            : '30px',
											backgroundSize   : '30px 24px',
											backgroundRepeat : 'no-repeat',
										}}
									/>

									<p>
										{negotiation_card?.rates?.shipping_line?.short_name}
									</p>
								</div>
								<p className={styles.image}>
									{negotiation_card?.rates?.shipping_line?.business_name}
								</p>
								<p className={styles.image}>
									{negotiation_card.total_price_currency}
									{negotiation_card?.rates?.price}
								</p>
							</div>
							<div className={styles.table}>
								<p>Service</p>
								<p className={styles.unit}>Unit</p>
								<p className={styles.price}>Price</p>
							</div>
							{Object.values(negotiation_card?.rates?.service_rates).map(
								(item) => (
									<>
										<div>
											{item?.trade_type
												&& item?.trade_type === 'export'
												&& item?.line_items?.length > ZEROVALUE && (
													<>
														<div className={styles.tables}>
															<p className={styles.captailaize}>
																destination
																{item?.service_type?.replace('_', ' ')}
															</p>
															<p>
																{item?.total_price_currency}
																{item?.price}
															</p>
														</div>
														<div>
															{item?.line_items.map((itm) => (
																<div className={styles.tables} key={item?.id}>
																	<div>{itm.code}</div>
																	<div className={styles.captailaizers}>
																		{itm?.unit?.replace('_', ' ')}
																	</div>
																	<div>
																		{itm?.currency}
																		{itm?.price}
																	</div>
																</div>
															))}
														</div>
													</>
											)}
										</div>
										<div>
											{item?.trade_type
												&& item?.trade_type === 'import'
												&& item?.line_items?.length > ZEROVALUE && (
													<>
														<div className={styles.tables}>
															<p className={styles.captailaize}>
																Origin
																{item?.service_type?.replace('_', ' ')}
															</p>
															<p>
																{item?.total_price_currency}
																{item?.price}
															</p>
														</div>
														<div>
															{item?.line_items.map((itm) => (
																<div className={styles.tables} key={itm?.id}>
																	<p>{itm.code}</p>
																	<p className={styles.captailaizers}>
																		{itm?.unit?.replace('_', ' ')}
																	</p>
																	<p>
																		{itm?.currency}
																		{itm?.price}
																	</p>
																</div>
															))}
														</div>
													</>
											)}
										</div>
										<div>
											{!item?.trade_type
												&& item?.line_items.map((itm) => (
													<>
														<div className={styles.tables}>
															<p className={styles.captailaize}>
																{itm?.service_name?.replace('_', ' ')}
															</p>
															<p>
																{itm?.currency}
																{itm?.price}
															</p>
														</div>
														<div className={styles.tables}>
															<p>{itm.code}</p>
															<p className={styles.captailaizers}>
																{itm?.unit?.replace('_', ' ')}
															</p>
															<p>{itm?.price}</p>
														</div>
													</>
												))}
										</div>
									</>
								),
							)}
						</>
						<div style={{ marginBottom: '36px' }} />
					</>
				))}
			{
			selectedCard?.commodity_remarks && (
				<>
					<div className={styles.main}>
						<div className={styles.tick}>
							<IcMFtick className={styles.adjust} />
							Initial Remark:
						</div>
					</div>
					<div className={styles.remark}>
						{selectedCard?.commodity_remarks}
					</div>
				</>
			)
		}
			{isEmpty && <p>No remarks found</p>}
		</div>
	);
}

export default NegotitionRemarks;
