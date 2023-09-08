import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;
function GraphListView({ setIsSortBy = () => {}, sortedData = [], listTitle = {}, isSortBy = '' }) {
	const { nameTitle = '', valueTitle = '' } = listTitle;
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div className={styles.styled_col}>
						<div className={styles.heading}>{nameTitle}</div>
					</div>
					<div className={styles.styled_col}>
						<div
							className={styles.heading}
							onClick={() => setIsSortBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
							role="presentation"
						>
							<IcMArrowRotateUp className={cl`${isSortBy === 'asc'
								? styles.arrow_icon_up : styles.arrow_icon_down}`}
							/>
							{valueTitle}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.wrapper}>
				{(sortedData || []).map((item) => (
					<div className={styles.styled_row} key={item?.sub_label}>
						<div className={styles.styled_col}>
							<div className={styles.tittle}>{item.sub_label}</div>
						</div>
						<div className={styles.styled_col}>
							<div className={styles.amount}>
								{formatAmount({
									amount   : item?.value || DEFAULT_AMOUNT,
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
