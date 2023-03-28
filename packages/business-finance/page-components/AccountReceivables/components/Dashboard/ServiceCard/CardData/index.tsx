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
				(tab?.data || [{}]).map((item) => (
					<div className={styles.lable_container}>
						<div className={styles.item_container}>

							<div className={styles.name}>

								{	item?.name?.length > 20 ? (
									<Tooltip
										placement="top"
										content={startCase(item?.name)}
									>
										<text>
											{`${(startCase(item?.name)).substring(
												0,
												20,
											)}...`}
										</text>
									</Tooltip>
								)
									: (
										<div>
											{startCase(item?.name)}
										</div>
									)}
							</div>
							<div>
								{getFormattedPrice(
									item?.openInvoiceAmount,
									item?.currency,
								) }

							</div>
						</div>
						<div className={styles.right_line} />
					</div>
				))
			}
			</div>

		</div>
	);
}
export default CardData;
