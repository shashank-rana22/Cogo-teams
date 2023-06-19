import { ButtonIcon, Pagination, Table, Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { format, isEmpty, startCase } from '@cogoport/utils';
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
		originPort      : item?.origin_port?.name || item?.origin_airport?.name,
		destinationPort : item?.destination_port?.name || item?.destination_airport?.name,
		commodity       : startCase(item.commodity),
		containerType   : startCase(item.container_type),
		stops           : item?.validities[0]?.number_of_stops || 0,
		validity        : `${format(item.validities[0]?.validity_start || item.validity_start, 'dd MMMM')} -
							${format(item.validities[0].validity_end || item.validity_end, 'dd MMMM')}`,
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

	if (loading) {
		return <Placeholder className={styles.loader} />;
	}

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
						<div style={{ color: '#F37166', fontWeight: '700' }}>{!isNaN(value) ? value : 0}</div>
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
