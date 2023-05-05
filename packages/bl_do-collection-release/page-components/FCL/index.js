import useListBLShipments from '../../hooks/useListBLShipment';
import useListDOShipments from '../../hooks/useListDOShipments';

function FCL({ stateProps = {} }) {
	let data = {};
	if (stateProps.activeTab === 'bl_collection') {
		data = useListBLShipments({ prefix: 'fcl_freight' });
	} else {
		data = useListDOShipments({ prefix: 'fcl_freight' });
	}

	return (
		<div>FCL</div>
	);
}
export default FCL;
