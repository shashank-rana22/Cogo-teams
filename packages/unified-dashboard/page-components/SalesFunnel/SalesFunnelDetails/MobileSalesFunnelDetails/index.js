import NoDataFound from '../../../../common/NoDataFound';

import FieldSales from './FieldSales';
import styles from './styles.module.css';

function MobileFunnelHeader({
	currency,
	salesFunnel = {},
	filters,
}) {
	const { distribution } = salesFunnel;

	return (
		<div className={styles.card_wrapper}>
			{distribution?.length > 0 ? (distribution.map((val) => (
				<FieldSales val={val} currency={currency} filters={filters} />
			))) : (
				<NoDataFound className={styles.nodata} />
			)}

		</div>
	);
}

export default MobileFunnelHeader;
