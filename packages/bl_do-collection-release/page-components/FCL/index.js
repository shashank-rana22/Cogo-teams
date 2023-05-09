import { Loader } from '@cogoport/components';

import List from '../../commons/List';
import useListBlDOShipments from '../../hooks/useListBlDOShipment';

import styles from './styles.module.css';

function FCL({ stateProps = {}, setStateProps = () => {} }) {
	const { data, loading } = useListBlDOShipments({ prefix: 'fcl_freight', stateProps, setStateProps });

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
				Loading
				{' '}
				{(stateProps.activeTab).toUpperCase()}
				{' '}
				Collection Release data
			</div>
		);
	}

	return (
		<div className={styles.list_container}>
			<List data={data} stateProps={stateProps} setStateProps={setStateProps} />
		</div>
	);
}
export default FCL;
