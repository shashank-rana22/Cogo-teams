import NoDataFound from '../../../../common/NoDataFound';

import FieldSales from './FieldSales';
import styles from './styles.module.css';

function MobileSalesOverallDetails({ currency, salesFunnel = {}, filters }) {
	const { list } = salesFunnel;

	return (
		<div className={styles.card_wrapper}>

			{list?.length > 0 ? (list.map((val) => (
				<FieldSales
					key={val.title}
					currency={currency}
					val={val}
					filters={filters}
				/>
			))) : (
				<NoDataFound className={styles.nodata} />
			)}
		</div>
	);
}

export default MobileSalesOverallDetails;
