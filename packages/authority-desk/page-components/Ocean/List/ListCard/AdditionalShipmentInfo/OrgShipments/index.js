import { Loader, Pagination, Toggle } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../../../commons/EmptyState';
import useListShipments from '../../../../../../hooks/useListShipments';
import useRedirectToShipmentDetailPage from '../../../../../../hooks/useRedirectToShipmentDetailPage';

import styles from './styles.module.css';

const DOC_STATUS_MAPPING = {
	pending  : 'Final BL not uploaded',
	uploaded : 'Final BL collected',
};

const STATUS_MAPPING = ['uploaded', 'pending'];

function RenderBLDetails({ blDetails = {} }) {
	return (
		<div>
			{STATUS_MAPPING.includes(blDetails?.status)
				? DOC_STATUS_MAPPING[blDetails?.status]
				: startCase(blDetails?.status)}
		</div>
	);
}

function OrgShipments({ item = {} }) {
	const geo = getGeoConstants();

	const [filters, setFilters] = useState({ page: 1 });

	const [isJobClosed, setIsJobClosed] = useState(false);

	const { data = {}, loading = false } = useListShipments({ item, filters, isJobClosed });

	const { list = [], total_count = 0 } = data;

	const { redirect } = useRedirectToShipmentDetailPage();

	function RenderPagination() {
		return (
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
	}

	return (
		<div className={styles.container}>

			<div className={styles.filter_container}>
				<Toggle
					size="sm"
					offLabel="Job Closed"
					onLabel="Job Open"
					onChange={() => setIsJobClosed(!isJobClosed)}
				/>

				<RenderPagination />
			</div>

			{loading ? (
				<div className={styles.loader}>
					Loading Shipments Data....
					<Loader themeType="primary" className={styles.loader_icon} />

				</div>
			) : null}

			{!loading && isEmpty(list) ? (
				<EmptyState />
			) : null}

			{!isEmpty(list) && !loading ? (

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
							<tr className={styles.row} key={val?.serial_id}>
								<td>
									<div
										role="presentation"
										onClick={() => redirect({ service: val?.shipment_type, shipment: val })}
									>
										{val?.serial_id}
									</div>

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
									{(val?.bl_details || []).map((blDetails) => (
										<RenderBLDetails
											key={blDetails?.id}
											blDetails={blDetails}
										/>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</div>
	);
}

export default OrgShipments;
