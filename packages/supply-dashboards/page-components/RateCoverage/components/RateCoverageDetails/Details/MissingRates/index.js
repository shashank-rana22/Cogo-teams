import { Placeholder, ButtonIcon, Pagination, Table } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { pascalCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import useListFreightRateRequest from '../../../../hooks/useListFreightRateRequest';
import AddRateModel from '../AddRateModel';
import styles from '../styles.module.css';

function MissingRates({ setIndex, value, filter }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [show, setShow] = useState(false);
	const { loading, data = {} } = useListFreightRateRequest({ filter, currentPage });

	const { total_count = 0 } = data;
	const { page_limit = 0 } = data;
	const { list = [] } = data;

	const listData = list.map((item) => ({
		originPort      : (filter.service === 'air_freight') ? item?.origin_airport?.name : item?.origin_port?.name,
		destinationPort : (filter.service === 'air_freight')
			? item?.destination_airport?.name
			: item?.destination_port?.name,
		commodity     : pascalCase(item.commodity),
		containerType : item.container_type,
		containerSize : item.container_size,
	}));

	const onPageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const column = {
		lcl_freight: [
			{ Header: 'ORIGIN PORT', accessor: 'originPort', id: 'origin_port' },
			{ Header: 'DESTINATION PORT', accessor: 'destinationPort', id: 'destination_port' },
			{ Header: 'COMMODITY', accessor: 'commodity', id: 'commodity' },
			{
				Header   : ' ',
				accessor : () => (
					<button
						className={styles.add_rate}
						onClick={
						() => setShow(true)
				}>
						Add Rate

					</button>
				),
			},
		],
		fcl_freight: [
			{ Header: 'ORIGIN PORT', accessor: 'originPort', id: 'origin_port' },
			{ Header: 'DESTINATION PORT', accessor: 'destinationPort', id: 'destination_port' },
			{ Header: 'COMMODITY', accessor: 'commodity', id: 'commodity' },
			{
				Header   : ' ',
				accessor : () => (
					<button
						className={styles.add_rate}
						onClick={
						() => setShow(true)
				}>
						Add Rate

					</button>
				),
			},
			{ Header: 'CONTAINER TYPE', accessor: 'containerType', id: 'container_type' },
			{ Header: 'CONTAINER SIZE', accessor: 'containerSize', id: 'container_size' },
		],

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
						<div style={{ color: '#828282', fontWeight: '700' }}>{!isNaN(value)?value:0}</div>
						<div>
							rates are missing today
						</div>
					</div>
					<div>
						Download Rate Density Results
					</div>
				</div>

				{loading && <Placeholder className={styles.loader} />}
				{!loading
				&& (list.length > 0 ? (
					<div className={styles.table}>
						<Table columns={column[filter.service] || column.lcl_freight} data={listData || []} />
						<div className={styles.pagination}>
							<Pagination
								type="table"
								currentPage={currentPage}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={onPageChange}
							/>
						</div>

					</div>
				) : <EmptyState />)}

			</div>
		</>
	);
}

export default MissingRates;
