import { Loader } from '@cogoport/components';

import List from '../../commons/List';
import useListBlDOShipments from '../../hooks/useListBlDOShipment';

import styles from './styles.module.css';

function LCL({ stateProps = {} }) {
	const { data, loading } = useListBlDOShipments({ prefix: 'lcl_freight', stateProps });

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader />
				Loading
				{' '}
				{stateProps.activeTab}
				{' '}
				collection release data
			</div>
		);
	}
	return (
		<div>
			<List data={data} stateProps={stateProps} />
		</div>
	);
}
export default LCL;
