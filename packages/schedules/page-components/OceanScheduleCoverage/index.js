import { Pagination, Table } from '@cogoport/components';
import { useState } from 'react';

import Filter from './Filter';
import { getColumns } from './helpers/column';
import useListSailingSchedulePortPairs from './hooks/useListSailingSchedulePortPairs';
import OSCPortToPort from './OSCPortToPort';
import styles from './styles.module.css';

function OceanScheduleCoverage() {
	const [filters, setFilters] = useState({});
	const [currentPage, setCurrentPage] = useState(1);

	const onPageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	const [show, setShow] = useState(null);
	const { data, totalCount } = useListSailingSchedulePortPairs({ filters, currentPage });
	const [isPortToPort, setIsPortToPort] = useState(false);
	const [originPort, setOriginPort] = useState(null);
	const [destinationPort, setDestinationPort] = useState(null);
	const {
		columns, columnsForPattern,
		columnsForPortToPort,
	} =	 getColumns({ setOriginPort, setDestinationPort, setIsPortToPort, setShow });
	return (
		<>
			{ !isPortToPort && (
				<>
					<Filter filters={filters} setFilters={setFilters} />
					{columns && data
			&& <Table columns={columns} data={data} className={styles.table} />}
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={currentPage}
							totalItems={totalCount}
							pageSize={10}
							onPageChange={onPageChange}
						/>
					</div>
				</>
			)}
			{ isPortToPort && (
				<OSCPortToPort
					originPort={originPort}
					destinationPort={destinationPort}
					setIsPortToPort={setIsPortToPort}
					columnsForPortToPort={columnsForPortToPort}
					columnsForPattern={columnsForPattern}
					show={show}
					setShow={setShow}
				/>
			)}

		</>
	);
}
export default OceanScheduleCoverage;
