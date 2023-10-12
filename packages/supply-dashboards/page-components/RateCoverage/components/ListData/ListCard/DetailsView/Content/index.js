import { Pill, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCopy } from '@cogoport/icons-react';
import { differenceInDays, startCase } from '@cogoport/utils';
import React from 'react';

import { DEFAULT_VALUE, LOADER_COUNT } from '../../../../../configurations/helpers/constants';
import copyToClipboard from '../../../../../utilis/copyToClipboard';

import styles from './styles.module.css';

function ServiceDetailsContent({
	shipment_data = {}, requestData = {},
	feedbackData = {}, shipment_loading = false,
	request_loading = false,
	feedback_loading = false,
	filter = {},
}) {
	const { primary_service_detail, summary } = shipment_data || {};
	const {
		commodity = '', container_size = '', container_type = '', containers_count = '', inco_term = '',
		cargo_readiness_date = '',
		free_days_detention_destination = '',
		bl_type = '',
		commodity_description = '',
		schedule_departure = '',
		shipping_line = {},
		preferred_shipping_lines,
		serial_id,
		feedbacks = [],
		closing_remarks = [],
		status = '',
		trade_type = '',
		selected_schedule_arrival,
		selected_schedule_departure,
	} = primary_service_detail || feedbackData || requestData || {};

	const handleCopy = (text) => {
		const value = [text].join('\n');
		copyToClipboard(value, 'Data');
	};

	const transitTime =	filter?.service === 'ftl_freight'
		? shipment_data?.transit_time : differenceInDays(
			new Date(selected_schedule_arrival || new Date()),
			new Date(selected_schedule_departure || new Date()),
		);

	const pillMapping = [
		{ label: commodity && startCase(commodity) },
		{ label: container_size && `${container_size}ft` },
		{ label: container_type && startCase(container_type) },
		{ label: containers_count && `${containers_count} Containers` },
		{ label: inco_term && startCase(inco_term) },
		{ label: serial_id && `Serial Id : ${serial_id}` },
		{ label: trade_type && startCase(trade_type) },
	];

	const contentMapping = [
		{
			label : 'Cargo Ready',
			value : cargo_readiness_date,
		},
		{ label: 'BL Type', value: startCase(bl_type) },
		{ label: 'Destination Detention Free Days', value: free_days_detention_destination },
		{
			label : 'Expected Departure',
			value : schedule_departure && `${formatDate({
				date       : schedule_departure,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
				formatType : 'date',
			})}`,
		},
		{ label: 'Commodity Description', value: commodity_description },
		{
			label : 'Transit Time',
			value : `${transitTime} ${filter?.service === 'ftl_freight' ? 'Hrs' : 'Days'}`,
		},
		{ label: 'Preferred Shipping', value: shipping_line?.short_name },
		feedbacks?.length > 0 && (
			{
				label : 'feedbacks',
				value : feedbacks && (feedbacks || []).map((val) => startCase(val)).join(', '),
			}
		),

		closing_remarks?.length > 0 && (
			{
				label: 'Closing Remarks',
				value:
	<div className={styles.pointer}>
		{startCase(closing_remarks)}
		<IcMCopy style={{ marginLeft: '4px' }} onClick={() => handleCopy(closing_remarks)} />
	</div>,
			}
		),
	];

	return (
		<div>

			{(shipment_loading || request_loading
					|| feedback_loading) ? [...new Array(LOADER_COUNT).keys()].map((index) => (
						<Placeholder
							height="4vh"
							key={index}
							style={{ marginTop: '10px' }}
						/>
				))
				: (

					<div className={styles.container}>
						{(!feedback_loading || !request_loading || !shipment_loading)
			&& (
				<div>
					<div className={styles.pill}>
						{pillMapping?.map((val) => (
							<div key={val?.label}>
								{ val?.label
								&& <Pill color="blue">{val?.label}</Pill>}
							</div>
						))}
					</div>

					<div className={styles.pill}>
						{contentMapping?.map((val) => (
							<div key={val?.label}>
								{val?.value && (
									<div className={styles.content}>
										<div className={styles.label}>
											{val.label}
											{' '}
											:
											{' '}
										</div>
										<Pill
											key={val?.value}
											size="md"
											color=""
										>
											{val?.value}
										</Pill>
									</div>
								)}
							</div>
						))}
					</div>

					{summary?.services?.length > DEFAULT_VALUE && (
						<div className={styles.content}>
							<div className={styles.label}>Additional Service : </div>
							{(summary?.services || []).map((services_value) => (
								<Pill
									key={services_value}
									size="md"
									color="#F8F2E7"
								>
									{startCase(services_value)?.replace('Service', '')}
								</Pill>
							))}
						</div>
					)}

					<div className={styles.pill}>
						{summary?.importer_exporter?.business_name
						&& (
							<div className={styles.content}>
								<div className={styles.label}> Customer : </div>
								<div className={styles.name}>
									{' '}
									{startCase(summary?.importer_exporter?.business_name)}
								</div>
							</div>
						)}

						{preferred_shipping_lines?.[DEFAULT_VALUE]?.business_name
						&& (
							<div className={styles.content}>
								<div className={styles.label}>
									{' '}
									Shippling Line :
								</div>
								<div className={styles.name}>
									{' '}
									{startCase(preferred_shipping_lines?.[DEFAULT_VALUE]?.business_name)}
								</div>
							</div>
						)}

						{status
						&& (
							<div className={styles.content}>
								<div className={styles.label}>
									Status :
									<Pill size="sm" color={status === 'inactive' ? 'red' : 'green'}>
										{startCase(status)}
									</Pill>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
					</div>
				)}
		</div>
	);
}

export default ServiceDetailsContent;
