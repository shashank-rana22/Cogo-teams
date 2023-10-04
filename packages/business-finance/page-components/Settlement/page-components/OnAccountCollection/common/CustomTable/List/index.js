import React from 'react';

import Loader from '../../../../Loader';

import ColumnCard from './ColumnCard';
import RenderRibbon from './RenderRibbon';
import styles from './styles.module.css';

interface ItemInterface {
	customerName?: string;
	accCode?: string;
	bankAccountNumber?: string;
	orgSerialId?: string;
	bankName?: string;
	paymentNumValue?: string;
	amount?: string;
	utr?: string;
	entityType?: string;
	currency?: string;
	id?: string;
}
interface ListInterface {
	list?: Array<ItemInterface>;
	refetch?: () => void;
	loading?: boolean;
	getTableBodyCheckbox: (item: object) => React.JSX.Element;
}
function List({
	list = [],
	refetch,
	loading,
	getTableBodyCheckbox,
}: ListInterface) {
	return loading ? (
		<Loader />
	) : (
		<div className={styles.list}>
			{list?.map((item) => (
				<div className={styles.column} key={item?.id}>
					<ColumnCard
						item={item}
						refetch={refetch}
						getTableBodyCheckbox={getTableBodyCheckbox}
					/>
					<div>
						<RenderRibbon item={item} />
					</div>
				</div>
			))}
		</div>
	);
}

export default List;
