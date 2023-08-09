import { Placeholder, ButtonIcon, Pagination, Table } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../../common/EmptyState';
import useGetPartnerUser from '../../../../../RfqEnquiries/hooks/useGetPartneruser';
import useListRateChargeCodes from '../../../../hooks/useGetChargeCodes';
import useListFreightRateRequest from '../../../../hooks/useListFreightRateRequest';
import AddRateModel from '../AddRateModel';
import styles from '../styles.module.css';

const ONE = 1;
const ZERO = 0;
const MINUS_ONE = -1;
function MissingRates({ setIndex, value, filter }) {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));

	const { partner_user } = useGetPartnerUser({
		user_id: user_profile.id,
	});
	const [currentPage, setCurrentPage] = useState(ONE);
	const [show, setShow] = useState(false);
	const { loading, data = {} } = useListFreightRateRequest({ filter, currentPage, partner_user });

	const { total_count = ZERO } = data;
	const { page_limit = ZERO } = data;
	const { list = [] } = data;

	const {
		data: chargeCodeData,
		listRateChargeCodes,
	} = useListRateChargeCodes({ service: `${filter?.service}_charges` });

	const listData = list.map((item) => ({
		originPort      : (filter.service === 'air_freight') ? item?.origin_airport?.name : item?.origin_port?.name,
		destinationPort : (filter.service === 'air_freight')
			? item?.destination_airport?.name
			: item?.destination_port?.name,
		commodity     : startCase(item.commodity),
		containerType : startCase(item.container_type),
		containerSize : item.container_size,
	}));

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
						onClick={() => { setShow(true); listRateChargeCodes(); }}
					>
						Add Rates

					</button>
				),
			},
		],
		fcl_freight: [
			{ Header: 'ORIGIN PORT', accessor: 'originPort', id: 'origin_port' },
			{ Header: 'DESTINATION PORT', accessor: 'destinationPort', id: 'destination_port' },
			{ Header: 'COMMODITY', accessor: 'commodity', id: 'commodity' },
			{ Header: 'CONTAINER TYPE', accessor: 'containerType', id: 'container_type' },
			{ Header: 'CONTAINER SIZE', accessor: 'containerSize', id: 'container_size' },
			{
				Header   : ' ',
				accessor : () => (
					<button
						className={styles.add_rate}
						onClick={() => setShow(true)}
					>
						Add Rate
					</button>
				),
			},
		],

	};

	if (loading) {
		return <Placeholder className={styles.loader} />;
	}

	return (
		<>
			<AddRateModel show={show} setShow={setShow} line_item_data={chargeCodeData?.list} />
			<div className={styles.parent}>
				<div className={styles.nav}>
					<div>
						<div>
							<ButtonIcon
								onClick={() => setIndex(MINUS_ONE)}
								size="md"
								icon={<IcMArrowBack />}
								themeType="primary"
								style={{ backgroundColor: 'inherit' }}
							/>
						</div>
						<div style={{ color: '#828282', fontWeight: '700' }}>{!Number.isNaN(value) ? value : ZERO}</div>
						<div>
							rates are missing today
						</div>
					</div>
					<div>
						Download Rate Density Results
					</div>
				</div>

				{!isEmpty(list) ? (
					<div className={styles.table}>
						<Table columns={column[filter.service] || column.lcl_freight} data={listData || []} />
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

export default MissingRates;
