import { ButtonIcon, Pagination, Table } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import useListPartnerExpertises from '../../../../hooks/useListPartnerExpertises';
import AddRateModel from '../AddRateModel';
import styles from '../styles.module.css';

function RateDensityDetails({ setIndex, value }) {
	const [show, setShow] = useState(false);
	const [currentPage, setCurrentPage] = useState();
	console.log(currentPage, 'currentPage');

	const { data } = useListPartnerExpertises({ currentPage });
	const columns = [
		{ Header: 'ORIGIN PORT', accessor: 'location.origin_location.name' },
		{ Header: 'DESTINATION PORT', accessor: 'location.destination_location.name' },
		{ Header: 'COMMODITY', accessor: 'commodity' },
		{ Header: 'CONTAINER TYPE', accessor: 'containerType' },
		{ Header: 'CONTAINER SIZE', accessor: 'containerSize' },
		{ Header: 'NO OF RATES', accessor: 'noOfRates' },
		{
			Header   : ' ',
			accessor : () => (
				<button
					className={styles.add_rate}
					onClick={
						() => setShow(true)
				}
				>
					Add Rate
				</button>
			),
		},
	];

	const onPageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	return (
		<>
			<AddRateModel show={show} setShow={setShow} />
			<div className={styles.parent}>
				<div className={styles.nav}>
					<div>
						<div>
							<ButtonIcon
								onClick={() => setIndex(-1)}
								size="md"
								icon={<IcMArrowBack />}
								themeType="primary"
								style={{ backgroundColor: 'inherit' }}
							/>
						</div>
						<div style={{ color: '#7278AD', fontWeight: '700' }}>{value}</div>
						<div>
							rate density as per today
						</div>
					</div>
					<div>
						Download Rate Density Results
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

export default RateDensityDetails;
