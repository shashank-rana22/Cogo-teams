import React from 'react';

import ColumnCard from './ColumnCard';
import RenderRibbon from './RenderRibbon';
import styles from './styles.module.css';

interface ItemInterface {
	customerName?:string;
	accCode?:string;
	bankAccountNumber?:string;
	orgSerialId?:string;
	bankName?:string;
	paymentNumValue?:string;
	amount?:string;
	utr?:string;
	entityType?:string;
	currency?:string;
	id?:string;
}
interface ListInterface {
	list?:Array<ItemInterface>
	refetch?:() => void
	loading?:boolean
}
function List({ list = [], refetch, loading }:ListInterface) {
	return (
		<div className={styles.list}>
			{list?.map((item) => (
				<div className={styles.column} key={item?.id}>
					<ColumnCard item={item} refetch={refetch} loading={loading} />
					<div>
						<RenderRibbon item={item} />
					</div>
				</div>
			))}
		</div>
	);
}

export default List;
