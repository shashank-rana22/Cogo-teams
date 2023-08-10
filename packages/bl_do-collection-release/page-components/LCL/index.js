import List from '../../commons/List';
import LoadingState from '../../commons/LoadingState';
import useListBlDOShipments from '../../hooks/useListBlDOShipment';

import styles from './styles.module.css';

const LOADER_ARRAY_SIZE = 6;

function LCL({ stateProps = {}, setStateProps = () => {} }) {
	const { data, loading, refetch } = useListBlDOShipments({ prefix: 'lcl_freight', stateProps });

	if (loading) {
		return (
			<div className={styles.loader}>
				{[...Array(LOADER_ARRAY_SIZE).keys()].map((item) => (
					<div key={item}>
						<LoadingState />
					</div>
				))}
			</div>
		);
	}
	return (
		<div className={styles.list_container}>
			<List data={data} stateProps={stateProps} setStateProps={setStateProps} refetch={refetch} />
		</div>
	);
}
export default LCL;
