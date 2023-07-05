import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
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
				(tab?.data || [{}]).map((item) => (
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
											{formatAmount({
												amount   :	item?.openInvoiceAmount as any,
												currency :	item?.currency,
												options  : {
													style           : 'currency',
													currencyDisplay : 'code',
												},

											})}
										</div>
									)}
									>
										<div className={styles.wrapper}>
											{formatAmount({
												amount   : item?.openInvoiceAmount as any || 0,
												currency : item?.currency,
												options  : {
													notation              : 'compact',
													compactDisplay        : 'short',
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : 2,
												},
											})}
										</div>

									</Tooltip>

								</div>
							</div>

						</div>
						<div className={styles.right_line} />
					</>
				))
			}
			</div>

		</div>
	);
}
export default CardData;
