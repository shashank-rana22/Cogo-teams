import { Loader, Pagination } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../../commons/EmptyState';
import RedirectToShipmentDetailPage from '../../../../../../commons/RedirectToShipmentDetailPage';
import useListShipments from '../../../../../../hooks/useListShipments';

import styles from './styles.module.css';

function OrgShipments({ item = {}, filters = {}, setFilters = () => {} }) {
	const geo = getGeoConstants();

	const { data, loading } = useListShipments({ item, filters });

	const { list, total_count } = data;

	const { redirect } = RedirectToShipmentDetailPage();

	if (list?.length === 0 && !loading) {
		return <EmptyState />;
	}

	if (loading) {
		return (
			<div className={styles.loader}>
				Loading Shipments Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	const docStatusMapping = {
		pending  : 'Final BL not uploaded',
		uploaded : 'Final BL collected',
	};

	const renderBLDetails = (blDetails) => (
		<div>
			{['uploaded', 'pending'].includes(blDetails.status)
				? docStatusMapping[blDetails.status]
				: startCase(blDetails.status)}
		</div>
	);

	const renderPagination = (
		<Pagination
			type="table"
			totalItems={total_count}
			pageSize={10}
			currentPage={filters.page}
			className={styles.pagination}
			onPageChange={(val) => setFilters({
				...filters,
				page: val,
			})}
		/>
	);

	return (
		<div className={styles.container}>

			{renderPagination}

			<table>
				<thead>
					<tr className={styles.row}>
						<th>Shipment ID</th>
						<th>Service</th>
						<th>Trade Type</th>
						<th>Milestone</th>
						<th>Invoice Value</th>
						<th>Cargo Value</th>
						<th>Payment Term</th>
						<th>BL Status</th>
					</tr>
				</thead>

				<tbody>
					{(list || []).map((val) => (
						<tr className={styles.row} key={val.serial_id}>
							<td
								role="presentation"
								onClick={() => redirect({ service: val?.shipment_type, shipment: val })}
							>
								{val?.serial_id}

							</td>
							<td>
								{startCase(val?.shipment_type)}
								{' '}
							</td>
							<td>{startCase(val?.trade_type)}</td>
							<td>{startCase(val?.state)}</td>
							<td>
								{' '}
								{ formatAmount({
									amount   : val?.inr_invoice_value,
									currency : geo.country.currency.code,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}
								{' '}

							</td>
							<td>
								{formatAmount({
									amount   : val?.cargo_value,
									currency : val?.cargo_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}
							</td>
							<td>{startCase(val?.payment_term || '--')}</td>
							<td>
								{(val?.bl_details || []).map(renderBLDetails)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default OrgShipments;
