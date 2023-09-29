import { Pill, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { differenceInDays } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const LOADER_COUNT = 3;
function ServiceDetails({
	shipmemnt_data = {}, data = {}, requestData = {},
	feedbackData = {}, shipment_loading = false,
}) {
	const { primary_service_detail, summary } = shipmemnt_data || {};
	const {
		commodity, container_size, container_type, containers_count, inco_term,
		cargo_readiness_date,
		free_days_detention_destination,
		bl_type,
		commodity_description,
		selected_schedule_departure,
		shipping_line,
	} = primary_service_detail || feedbackData || requestData || {};

	const transitTime =	shipmemnt_data?.serviceType === 'ftl_freight'
		? shipmemnt_data?.transit_time || '0'
		: differenceInDays(
			new Date(shipmemnt_data?.selected_schedule_arrival || new Date()),
			new Date(shipmemnt_data?.selected_schedule_departure || new Date()),
		);

	const pillMapping = [
		{ label: commodity },
		{ label: container_size },
		{ label: container_type },
		{ label: containers_count },
		{ label: inco_term },
	];

	const contentMapping = [
		{ label: 'Cargo Ready', value: cargo_readiness_date },
		{ label: 'Destination Detention Free Days', value: free_days_detention_destination },
		{ label: 'BL Type', value: bl_type },
		{ label: 'Commodity Description', value: commodity_description },
		{
			label : 'Expected Departure',
			value : `${formatDate({
				date       : selected_schedule_departure,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
				formatType : 'date',
			})}`,
		},
		{
			label : 'Transit Time',
			value : `${transitTime} ${shipmemnt_data?.serviceType === 'ftl_freight' ? 'Hrs' : 'Days'}`,
		},
		{ label: 'Preferred Shipping', value: shipping_line?.short_name },
	];

	return (
		<div className={styles.container}>

			{shipment_loading && [...new Array(LOADER_COUNT).keys()].map((ind) => (
				<Placeholder
					height="4vh"
					key={ind}
					style={{ marginTop: '10px' }}
				/>
			))}

			{!shipment_loading
			&& (
				<div>
					<div className={styles.pill}>
						{pillMapping?.map((val) => (
							<Pill color="blue" key={val?.label}>{val?.label}</Pill>
						))}
					</div>

					<div className={styles.line} />

					<div className={styles.pill}>
						{contentMapping?.map((val) => (
							<div className={styles.content} key={val?.label}>
								<div className={styles.label}>
									{val.label}
									{' '}
									:
									{' '}
								</div>
								<div className={styles.value}>{val?.value}</div>
							</div>
						))}
					</div>

					<div className={styles.line} />

					<div className={styles.pill}>
						<div className={styles.content}>
							<div className={styles.label}> Supplier :</div>
							<div className={styles.value}>{data?.service_provider?.short_name}</div>
						</div>

						<div className={styles.content}>
							<div className={styles.label}> Customer : </div>
							<div className={styles.value}>{summary?.importer_exporter?.business_name}</div>
						</div>

						<div className={styles.content}>
							<div className={styles.label}> Shippling Line :</div>
						</div>

						<div className={styles.content}>
							<div className={styles.label}> Status : </div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ServiceDetails;
