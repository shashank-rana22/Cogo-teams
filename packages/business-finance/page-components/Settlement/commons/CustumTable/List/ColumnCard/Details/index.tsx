import React from 'react';

import useGetJvLineItems from '../../../../../hooks/useGetJvLineItems';
import getFormattedAmount from '../../../../Utils/getFormattedAmount';
import ToolTipWrapper from '../ToolTipWrapper';

import LineItemsHeader from './LineItemsHeader';
import styles from './styles.module.css';

function Details({ item = {} }) {
	const { data: list = [], loading } = useGetJvLineItems({ parentJVId: item?.id });

	const listTotal = list?.length;

	return (
		<div className={styles.details}>
			<div className={styles.posttosage}>Post To Sage</div>
			<div className={styles.table}>
				<LineItemsHeader />
				{list.map((singleitem, index) => (
					<div
						className={`${styles.col} ${listTotal - 1 === index ? styles.islast : ''}`}
						key={singleitem?.id}
					>
						<div className={styles.entity}>{singleitem?.entityCode}</div>
						<div className={styles.jvmode}>{singleitem?.accMode || 'N/A'}</div>
						<div className={styles.businesss}>
							<ToolTipWrapper text={singleitem?.tradePartyName || '--'} maxlength={30} />
						</div>
						<div className={styles.type}>{singleitem?.type}</div>
						<div className={styles.glcode}>{singleitem?.glCode}</div>
						<div className={styles.legamount}>
							{getFormattedAmount({
								amount   : singleitem?.ledAmount,
								currency : singleitem?.ledCurrency,
							})}
						</div>
						<div className={styles.amount}>
							{getFormattedAmount({
								amount   : singleitem?.amount,
								currency : singleitem?.currency,
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Details;
