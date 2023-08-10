import { Modal, Select, Button } from '@cogoport/components';
import ShipmentInventoryContext from '@cogoport/context/page-components/ShipmentInventoryContext';
import { useContext } from 'react';

import RoutePlan from '../RoutePlan';

const OPTIONS = [
	{
		label : 'Empty',
		value : 'empty',
	},
	{
		label : 'Loaded',
		value : 'loaded',
	},
];

function BulkUpdateRouteModal({ onClose = () => {}, show = false }) {
	const {
		route: { routeList, setRouteList },
		globalRoute: { globalRouteState = {}, setGlobalRouteState = () => {} },
	} = useContext(ShipmentInventoryContext);

	const handleSave = () => {
		[...(globalRouteState?.routeList ?? [])].forEach((containerIdx) => {
			if (globalRouteState?.isChecked?.index >= 0) {
				routeList[containerIdx].isChecked = globalRouteState?.isChecked;
			}

			if (globalRouteState?.status) { routeList[containerIdx].loading_status = globalRouteState?.status; }
		});

		setRouteList([...routeList]);

		setGlobalRouteState({
			routeList   : new Set(),
			allSelected : false,
			isChecked   : { index: -1, item: {} },
			status      : '',
		});

		onClose();
	};

	return (
		<Modal show={show} onClose={onClose}>
			<Modal.Header title="Change Status" />
			<Modal.Body>
				<RoutePlan
					list={{
						route     : routeList?.[0]?.route || [],
						isChecked : false,
					}}
					type="modal"
					routeStyles={{ background: 'white' }}
				/>
				<Select
					className="primary lg"
					options={OPTIONS}
					value={globalRouteState?.status || ''}
					onChange={(val) => setGlobalRouteState((prev) => ({ ...prev, status: val }))}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					themeType="secondary "
					size="md"
					onClick={onClose}
				>
					Cancel
				</Button>

				<Button
					themeType="primary"
					size="md"
					style={{ marginLeft: '15px' }}
					onClick={handleSave}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default BulkUpdateRouteModal;
