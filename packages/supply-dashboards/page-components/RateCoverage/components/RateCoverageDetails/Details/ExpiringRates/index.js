import { Pagination, Table } from '@cogoport/components';
// import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
// import useListFreightRate from '../../../../hooks/useListFreightRate';
import styles from '../styles.module.css';

// import ExpiringRatesFilter from './ExpiringRatesFilter';
// import ExtendExpiryModel from './ExtendExpiryModel';
// import SendEmailModel from './SendEmailModel';

const CONSTANT_ZERO = 0;
const CONSTANT_ONE = 1;
// const CONSTANT_TWO = 2;
// const CONSTANT_THREE = 3;
// const CONSTANT_FOUR = 4;
function ExpiringRates({ value, filter, data }) {
	// const [extendExpiryShow, setExtendExpiryShow] = useState(false);
	// const [sendEmailShow, setSendEmailShow] = useState(false);
	// console.log(data, 'data');
	const [currentPage, setCurrentPage] = useState(CONSTANT_ONE);
	const { service = '' } = filter;
	const { list = [] } = data;
	const { total_count = CONSTANT_ZERO } = data;
	const { page_limit = CONSTANT_ZERO } = data;

	const listData = list.map((item) => ({
		originPort      : item?.origin_port?.name || item?.origin_airport?.name,
		destinationPort : item?.destination_port?.name || item?.destination_airport?.name,
		commodity       : startCase(item.commodity),
		// containerType   : startCase(item.container_type),
		// stops           : item?.validities[0]?.number_of_stops || 0,
		// validity        : `${format(item.validities[0]?.validity_start || item.validity_start, 'dd MMMM')} -
		// 					${format(item.validities[0].validity_end || item.validity_end, 'dd MMMM')}`,
		// serviceProvider: item?.service_provider?.short_name,
	}));

	const column = {
		fcl_freight: [
			{ Header: 'ORIGIN PORT', accessor: 'originPort' },
			{ Header: 'DESTINATION PORT', accessor: 'destinationPort' },
			{ Header: 'COMMODITY', accessor: 'commodity' },
			// { Header: 'CONTAINER TYPE', accessor: 'containerType' },
			// { Header: 'VALIDITY', accessor: 'validity' },
			// { Header: 'SERVICE PROVIDER', accessor: 'serviceProvider' },
		],
		lcl_freight: [
			{ Header: 'ORIGIN PORT', accessor: 'originPort' },
			{ Header: 'DESTINATION PORT', accessor: 'destinationPort' },
			{ Header: 'COMMODITY', accessor: 'commodity' },
			// { Header: 'VALIDITY', accessor: 'validity' },
			// { Header: 'STOPS', accessor: 'stops' },
			// { Header: 'SERVICE PROVIDER', accessor: 'serviceProvider' },
		],
	};

	return (
		<>
			{/* <ExtendExpiryModel show={extendExpiryShow} setShow={setExtendExpiryShow} />
			<SendEmailModel show={sendEmailShow} setShow={setSendEmailShow} /> */}
			<div className={styles.parent}>
				<div className={styles.nav}>
					<div>
						<div style={{ color: '#828282', fontWeight: '700' }}>
							{value || CONSTANT_ZERO}
							{' '}

							{' '}
							Rates are expiring today
						</div>

					</div>
				</div>
				{!isEmpty(listData) ? (
					<div className={styles.table}>
						<Table columns={column[service] || column.lcl_freight} data={listData || []} />
						<div className={styles.pagination}>
							<Pagination
								type="table"
								currentPage={currentPage}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={(pageNumber) => { setCurrentPage(pageNumber); }}
							/>
						</div>
					</div>
				) : <EmptyState />}
			</div>
		</>

	);
}

export default ExpiringRates;
