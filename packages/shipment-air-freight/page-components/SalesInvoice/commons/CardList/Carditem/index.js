import { Placeholder } from '@cogoport/components';

import getValue from '../../../../../commons/utils/getValue';
import CONSTANTS from '../../../../../constants/CONSTANTS';

import styles from './styles.module.css';

const { TOTAL_SPAN, FLEX_HUNDRED } = CONSTANTS;

function Item({
	item = {},
	fields = [],
	loading = false,
}) {
	return (
		<div className={styles.row}>
			{fields?.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}
				const { span, render = () => {}, label } = singleItem;
				const widthVal = (span / TOTAL_SPAN) * FLEX_HUNDRED;
				return (
					<div
						style={{ width: `${widthVal}%` }}
						key={label}
						className={styles.column}
					>
						{loading ? <Placeholder width="100%" height="20px" /> : null}

						{render && !loading ? render(item) : null}

						{loading && !render ? (
							<span className={styles.title_black}>
								{getValue(item, singleItem, false, {}) || '-'}
							</span>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default Item;
