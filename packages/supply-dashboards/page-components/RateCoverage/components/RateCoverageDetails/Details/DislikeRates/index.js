import { Placeholder, ButtonIcon, Pagination, Table } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import useListFreightRateFeedback from '../../../../hooks/useListFreightRateFeedback';
import AddRateModel from '../AddRateModel';
import styles from '../styles.module.css';

const column = {
	lcl_freight: [
		{ Header: 'ORIGIN PORT', accessor: 'originPort' },
		{ Header: 'DESTINATION PORT', accessor: 'destinationPort' },
		{ Header: 'COMMODITY', accessor: 'commodity' },
		{ Header: 'NO OF RATES', accessor: 'noOfRates' },
	],
	fcl_freight: [
		{ Header: 'ORIGIN PORT', accessor: 'originPort' },
		{ Header: 'DESTINATION PORT', accessor: 'destinationPort' },
		{ Header: 'COMMODITY', accessor: 'commodity' },
		{ Header: 'CONTAINER TYPE', accessor: 'containerType' },
		{ Header: 'CONTAINER SIZE', accessor: 'containerSize' },
		{ Header: 'NO OF RATES', accessor: 'noOfRates' },
	],
};

function DislikeRates({ setIndex, value, filter }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [show, setShow] = useState(false);
	const { loading, data = {} } = useListFreightRateFeedback({ filter, currentPage });
	const { list = [] } = data;
	const { page_limit = 0 } = data;
	const { total_count = 0 } = data;

	const listData = list.map((item) => ({
		originPort      : item.origin_airport?.name || item.origin_port?.name,
		destinationPort : item.destination_airport?.name || item.destination_port?.name,
		commodity       : startCase(item.commodity),
		containerType   : startCase(item.container_type),
		containerSize   : item.container_size,
		noOfRates       : '-',
	}));

	if (loading) {
		return <Placeholder className={styles.loader} />;
	}

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
						<div style={{ color: '#7278AD', fontWeight: '700' }}>{!isNaN(value) ? value : 0}</div>
						<div>
							Dislike rate density as per today
						</div>
					</div>
					<div>
						Download Dislike Rate Density Results
					</div>
				</div>
				{!isEmpty(list) ? (
					<div className={styles.table}>
						<Table columns={column[filter.service] || column.lcl_freight} data={listData} />
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

export default DislikeRates;
