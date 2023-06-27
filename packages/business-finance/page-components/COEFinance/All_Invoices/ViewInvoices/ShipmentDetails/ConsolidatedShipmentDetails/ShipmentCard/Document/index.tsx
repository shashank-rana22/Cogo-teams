import { isEmpty } from '@cogoport/utils';

import useShipmentDocument from '../../../../../../hook/useShipmentDocument';
import CardList from '../CardList/index';

import Loader from './Loader/index';
import styles from './styles.module.css';
import { tableColumn } from './tableColumn';

function Document({ shipmentId }) {
	const { data, loading } = useShipmentDocument(shipmentId);
	const documentData = data?.list;

	if (loading) {
		return <Loader />;
	}

	return (
		isEmpty(documentData)
			? <div className={styles.not_found}>Data Not Found</div>
			: (
				<CardList
					fields={tableColumn()}
					data={documentData}
					key="id"
				/>
			)
	);
}

export default Document;
