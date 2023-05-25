import { useEffect } from 'react';

import useListShipments from '../../../hooks/useListShipments';

export default function ChildrenShipments({ parentShipmentId }) {
	const { data, loading, listShipments } = useListShipments();

	useEffect(() => {
		listShipments({
			filters: {
				parent_shipment_id : parentShipmentId,
				state              : [
					'confirmed_by_importer_exporter',
					'in_progress',
					'completed',
					'cancelled',
				],
				summary_data_required      : true,
				manifest_data_required     : true,
				revenue_desk_data_required : true,
			},
		});
	}, [parentShipmentId, listShipments]);

	if (loading || data?.list?.length === 0) {
		return null;
	}

	// return (data.list || []).map((item) => (
	// 	<>
	// 		<ListCard item={item} />
	// 		<Services />
	// 	</>
	// ));
}
