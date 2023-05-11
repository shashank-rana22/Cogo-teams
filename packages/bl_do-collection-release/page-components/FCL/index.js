import { Loader } from '@cogoport/components';

import List from '../../commons/List';
import useListBlDOShipments from '../../hooks/useListBlDOShipment';

import styles from './styles.module.css';

function FCL({ stateProps = {}, setStateProps = () => {} }) {
	const { data, loading, refetch } = useListBlDOShipments({ prefix: 'fcl_freight', stateProps });

	if (loading) {
		return (
			<div className={styles.loader}>
				<div>Loading Shipments...</div>
				<Loader />
			</div>
		);
	}

	return (
		<div className={styles.list_container}>
			<List data={data} stateProps={stateProps} setStateProps={setStateProps} refetch={refetch} />
		</div>
	);
}
export default FCL;
