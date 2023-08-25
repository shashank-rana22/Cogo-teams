import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function GraphListView({ sortedData, listTitle }) {
	const { nameTitle = '', valueTitle = '' } = listTitle;
	const { zeroth_index } = GLOBAL_CONSTANTS || {};
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className="styled-row">
					<div>
						<div className={styles.heading}>{nameTitle}</div>
					</div>
					<div>
						<div
							className={styles.heading}
							// className="show-cursor"
							// onClick={() => setIsSortBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
						>
							{/* <ArrowIcon isSortable={isSortBy === 'asc'} /> */}
							{valueTitle}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.wrapper}>
				{(sortedData || []).map((item) => (
					<div key={item?.sub_label}>
						<div>
							<div className={styles.tittle}>{item.sub_label}</div>
						</div>
						<div>
							<div className={styles.amount}>
								{formatAmount({
									amount   : item.value || zeroth_index,
									currency : 'INR',
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										minimumFractionDigits : 0,
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default GraphListView;
