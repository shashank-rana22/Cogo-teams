import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../common/EmptyState';

import getColumns from './getColumns';
import Statistics from './Statistics';
import styles from './styles.module.css';

const handlePercentage = (item) => {
	if (item?.type === 'percentage') {
		if (item?.min_value && item?.max_value) {
			if (item?.min_value === item?.max_value) {
				return `(${item?.min_value})`;
			}
			return `(${item?.currency}(${item?.min_value}-${item?.max_value}))`;
		}
		return `${item?.currency} 0`;
	}
	return null;
};

function MarginValues({ data = {} }) {
	const { margin_slabs, margin_slabs_currency } = data || [];

	const LIST = [];
	margin_slabs.forEach((slab) => {
		slab.margin_values.forEach((marginValue) => {
			LIST.push({
				...slab,
				...marginValue,
				margin_slabs_currency,
			});
		});
	});

	const columns = getColumns(handlePercentage);

	if (isEmpty(margin_slabs)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.detail_container}>
			<div className={styles.table}>
				<h4 className={styles.slab_details}>Slab Details</h4>
				<Table
					columns={columns}
					data={LIST}

				/>
			</div>
			<div className={styles.stats_data}>
				<Statistics marginId={data?.id} />
			</div>
		</div>
	);
}
export default MarginValues;
