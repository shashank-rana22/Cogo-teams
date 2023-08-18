import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import CardList from '../../../commons/CardList';

import styles from './styles.module.css';
import { tableColumn } from './tableColumn';

function LineItems({ item = {}, loading = false }) {
	const { line_items = [], detail = {} } = item;
	const { shipment_data } = useContext(ShipmentDetailContext);

	return (
		<div className={styles.container}>
			<CardList
				fields={tableColumn({ serviceItem: item, shipment_data })}
				data={line_items}
				detail={detail}
				loading={loading}
				creditNote
			/>
		</div>
	);
}

export default LineItems;
