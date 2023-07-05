import { Table } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext } from 'react';

import useListSaasRailDomesticFreightContainerDetails from '../../hooks/useListSaasRailDomesticFreightContainerDetails';

import tableColumns from './helpers/tableColumns';
import TablePagination from './TablePagination';

function Tracking() {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const { loading, setFilters, data, filters } = useListSaasRailDomesticFreightContainerDetails({
		defaultFilters: { shipment_id: shipment_data?.id },
	});

	return (
		<>
			<TablePagination data={data} filters={filters} setFilters={setFilters} />
			<Table
				columns={tableColumns}
				data={data?.list || []}
				onRowSelect={() => {}}
				loading={loading}
			/>
			<TablePagination data={data} filters={filters} setFilters={setFilters} />
		</>
	);
}

export default Tracking;
