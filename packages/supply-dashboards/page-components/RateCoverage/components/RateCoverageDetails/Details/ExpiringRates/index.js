import { ButtonIcon, Pagination, Table, Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { format, pascalCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import useListFreightRate from '../../../../hooks/useListFreightRate';
import styles from '../styles.module.css';

import ExpiringRatesFilter from './ExpiringRatesFilter';
import ExtendExpiryModel from './ExtendExpiryModel';
import SendEmailModel from './SendEmailModel';

function ExpiringRates({ setIndex, value, filter }) {
	const [extendExpiryShow, setExtendExpiryShow] = useState(false);
	const [sendEmailShow, setSendEmailShow] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const { loading, data = {} } = useListFreightRate({ filter, currentPage });
	const { service = '' } = filter;
	const { list = [] } = data;
	const { total_count = 0 } = data;
	const { page_limit = 0 } = data;

	const listData = list.map((item) => ({
		originPort      : !(service === 'air_freight') ? item?.origin_port?.name : item?.origin_airport?.name,
		destinationPort : !(service === 'air_freight') ? item?.destination_port?.name : item?.destination_airport?.name,
		commodity       : pascalCase(item.commodity),
		containerType   : item.container_type,
		stops           : !(service === 'air_freight') ? item?.validities[0]?.number_of_stops || 0 : 0,
		validity        : `${format(!(service === 'air_freight')
			? item.validities[0]?.validity_start
			: item.validity_start, 'dd MMMM')
		} -
			${format(!(service === 'air_freight')
			? item.validities[0].validity_end
			: item.validity_end, 'dd MMMM')}`,
		serviceProvider: item?.service_provider?.short_name,
	}));

	const column = {
		fcl_freight: [
			{ Header: 'ORIGIN PORT', accessor: 'originPort' },
			{ Header: 'DESTINATION PORT', accessor: 'destinationPort' },
			{ Header: 'COMMODITY', accessor: 'commodity' },
			{ Header: 'CONTAINER TYPE', accessor: 'containerType' },
			{ Header: 'VALIDITY', accessor: 'validity' },
			{ Header: 'SERVICE PROVIDER', accessor: 'serviceProvider' },
		],
		lcl_freight: [
			{ Header: 'ORIGIN PORT', accessor: 'originPort' },
			{ Header: 'DESTINATION PORT', accessor: 'destinationPort' },
			{ Header: 'COMMODITY', accessor: 'commodity' },
			{ Header: 'VALIDITY', accessor: 'validity' },
			{ Header: 'STOPS', accessor: 'stops' },
			{ Header: 'SERVICE PROVIDER', accessor: 'serviceProvider' },
		],
	};

	const onPageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<ExtendExpiryModel show={extendExpiryShow} setShow={setExtendExpiryShow} />
			<SendEmailModel show={sendEmailShow} setShow={setSendEmailShow} />
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
						<div style={{ color: '#F37166', fontWeight: '700' }}>{value}</div>
						<div>
							rates are expiring today
						</div>
					</div>
					<div>
						Download Expiring Rates Results
					</div>
				</div>
				<ExpiringRatesFilter
					setExtendExpiryShow={setExtendExpiryShow}
					setSendEmailShow={setSendEmailShow}
				/>
				{loading && <Placeholder className={styles.loader} />}
				{!loading
				&& (listData.length ? (
					<div className={styles.table}>
						<Table columns={column[service] || column.lcl_freight} data={listData || []} />
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

export default ExpiringRates;
