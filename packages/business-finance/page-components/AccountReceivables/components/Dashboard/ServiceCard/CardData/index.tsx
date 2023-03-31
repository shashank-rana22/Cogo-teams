import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

interface DataProps {
	currency?: string,
	key?: string,
	name?: string,
	openInvoiceAmount?: number
}
interface TabProps {
	key?: string,
	data?: DataProps[]
}
interface CardDataProps {
	tab?: TabProps
}

function CardData({ tab }: CardDataProps) {
	return (
		<div className={styles.container}>
			<div className={styles.key_container}>{tab?.key}</div>
			<div className={styles.sub_container}>
				{
				(tab?.data || [{}]).map((item) => {
					const getFormat = getFormattedPrice(
						item?.openInvoiceAmount || 0,
						item?.currency,
						{
							notation              : 'compact',
							compactDisplay        : 'short',
							maximumFractionDigits : 2,
							style                 : 'decimal',
						},
					);
					return (
						<>
							<div className={styles.lable_container}>
								<div className={styles.item_container}>

									<div className={styles.name}>

										{	item?.name?.length > 20 || item?.name === 'others' ? (
											<Tooltip
												placement="top"
												content={
											item?.name === 'others' ? 'No Service Tagged'
												: startCase(item?.name)
}
											>

												{item?.name === 'others'
													? (
														<text>
															{`${(startCase(item?.name)).substring(
																0,
																20,
															)}`}
														</text>
													) : (
														<text>
															{`${(startCase(item?.name)).substring(
																0,
																20,
															)}...`}
														</text>
													)}
											</Tooltip>
										)
											: (
												<div className={styles.cursor_pointer}>
													{startCase(item?.name)}
												</div>
											)}
									</div>
									<div>
										<Tooltip content={(
											<div>
												{getFormattedPrice(
													item?.openInvoiceAmount,
													item?.currency,

												)}
											</div>
										)}
										>
											<div className={styles.wrapper}>
												{getFormat.substring(0, getFormat.length - 1)}
												{getFormat.slice(-1) === 'T' ? 'K' : getFormat.slice(-1)}
											</div>

										</Tooltip>

									</div>
								</div>

							</div>
							<div className={styles.right_line} />
						</>
					);
				})
			}
			</div>

		</div>
	);
}
export default CardData;
