import { Pagination, Table } from '@cogoport/components';
// import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

// import useListPartnerExpertises from '../../../../hooks/useListPartnerExpertises';
// import AddRateModel from '../AddRateModel';
import styles from '../styles.module.css';

function SpotSearchesDetails({ value, data }) {
	// const [show, setShow] = useState(false);
	const [setCurrentPage] = useState();

	const columns = [
		{ Header: 'ORIGIN PORT', accessor: 'origin_port' },
		{ Header: 'DESTINATION PORT', accessor: 'destination_port' },
		{ Header: 'COMMODITY', accessor: 'commodity' },
		{ Header: 'CONTAINER TYPE', accessor: 'container_type' },
		{ Header: 'CONTAINER SIZE', accessor: 'container_size' },
	];

	const onPageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	return (
		<>
			{/* <AddRateModel show={show} setShow={setShow} /> */}
			<div className={styles.parent}>
				<div className={styles.nav}>
					<div>

						<div style={{ color: '#828282', fontWeight: '700' }}>
							{value}
							{' '}
							Spot Searches as per today
							{' '}
						</div>
					</div>
				</div>
				<div className={styles.table}>
					<Table columns={columns} data={data?.list || []} />
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={data?.page}
							totalItems={data?.total_count}
							pageSize={data?.page_limit}
							onPageChange={(val) => onPageChange(val)}
						/>

					</div>

				</div>
			</div>

		</>
	);
}

export default SpotSearchesDetails;
