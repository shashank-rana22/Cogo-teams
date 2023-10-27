import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCopy } from '@cogoport/icons-react';
import { differenceInDays, isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import { DEFAULT_VALUE, INCO_TERM_MAPPING, VALUE_ONE } from '../../../../../configurations/helpers/constants';
import copyToClipboard from '../../../../../utilis/copyToClipboard';
import styles from '../styles.module.css';

import BookingParamsMapping from './bookingParamsMapping';

function contentMapping({ requestData = {}, feedbackData = {}, filter = {}, shipment_data = {} }) {
	const { primary_service_detail, summary } = shipment_data || {};
	const {
		commodity = '', container_size = '', container_type = '', containers_count = '', inco_term = '',
		cargo_readiness_date = '', free_days_detention_destination = '', bl_type = '', commodity_description = '',
		schedule_departure = '', shipping_line = {}, preferred_shipping_lines, feedbacks = [], closing_remarks = [],
		status = '', serial_id, selected_schedule_arrival, selected_schedule_departure,
		preferred_freight_rate, preferred_freight_rate_currency, commodity_type = '', price_type = '',
		payment_term, booking_params = {}, preferred_airlines = [], operation_type = '', packages, volume,
		chargeable_weight, trade_type,
	} = primary_service_detail || feedbackData || requestData || {};

	const { cargo_weight_per_container, inco_term: dislike_rates_inco } = booking_params || {};

	const transitTime =	filter?.service === 'ftl_freight'
		? shipment_data?.transit_time : differenceInDays(
			new Date(selected_schedule_arrival || new Date()),
			new Date(selected_schedule_departure || new Date()),
		);

	const bookingLength = (booking_params?.packages || packages)?.length;
	const bookingParams = booking_params?.packages || packages;

	const handleCopy = (text) => {
		const value = [text].join('\n');
		copyToClipboard(value, 'Data');
	};

	const pillMapping = [
		{ label: summary?.serial_id && `Id: ${summary?.serial_id}` },
		{ label: serial_id && `Id: ${serial_id}` },
		{ label: commodity && startCase(commodity) },
		{ label: container_size && `${container_size}ft` },
		{ label: container_type && startCase(container_type) },
		{ label: containers_count && `${containers_count} Containers` },
		{ label: (inco_term || dislike_rates_inco) && startCase(inco_term || dislike_rates_inco) },
		{ label: (inco_term && startCase(INCO_TERM_MAPPING[inco_term])) || startCase(trade_type) },
		{ label: payment_term && startCase(payment_term) },
		{ label: operation_type && startCase(operation_type) },
		{ label: commodity_type && startCase(commodity_type) },
		{ label: price_type && startCase(`Price Type : ${price_type}`) },
		{ label: cargo_weight_per_container && `${cargo_weight_per_container} MT` },
		{ label: !isEmpty(volume) && `${volume} cbm` },
		{ label: chargeable_weight && `Chargeable Weight: ${chargeable_weight || '-'}` },

		!isEmpty(bookingLength) && {
			label: bookingLength > 1
				? (
					<Tooltip
						interactive
						content={<BookingParamsMapping bookingParams={bookingParams} />}
					>
						<div className={styles.wrap}>
							{' '}
							<BookingParamsMapping bookingParams={bookingParams?.slice(0, 1) || []} />
							, +
							{bookingLength - VALUE_ONE}
							more
						</div>
					</Tooltip>

				)
				:	<BookingParamsMapping bookingParams={bookingParams} />,
		},
	];
	const feedbacksData = feedbacks.map((item) => item);

	const contentValuesMapping = [
		{
			label : 'Cargo Ready',
			value : cargo_readiness_date && `${formatDate({
				date       : cargo_readiness_date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
				formatType : 'date',
			})}`,
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
		commodity_description
		&& {
			label: 'Commodity Description',
			value:
	<div>
		{commodity_description?.length > 5
			? (
				<Tooltip content={commodity_description}>
					{`${commodity_description?.slice(0, 5)}...`}
				</Tooltip>
			) : commodity_description}
	</div>,
		},
		{
			label : 'Transit Time',
			value : `${transitTime} ${filter?.service === 'ftl_freight' ? 'Hrs' : 'Days'}`,
		},
		{ label: 'Preferred Shipping', value: shipping_line?.short_name },
		feedbacks?.length > DEFAULT_VALUE && (
			{
				label : 'feedbacks',
				value : feedbacks
				&& 					(
					<div>
						{feedbacks?.length > 1
							? (
								<Tooltip content={startCase(feedbacksData)}>
									{startCase(feedbacks?.[GLOBAL_CONSTANTS.zeroth_index])}
									, +
									{feedbacks.length - 1}
									{' '}
									more
								</Tooltip>
							) : startCase(feedbacks?.[GLOBAL_CONSTANTS.zeroth_index])}
					</div>
				),
			}
		),

		closing_remarks?.length > DEFAULT_VALUE && (
			{
				label: 'Closing Remarks',
				value:
	<div className={styles.pointer}>
		{closing_remarks?.length > 1
			? (
				<Tooltip content={startCase(closing_remarks)}>
					{startCase(closing_remarks?.[GLOBAL_CONSTANTS.zeroth_index])}
					, +
					{closing_remarks.length - 1}
					more
				</Tooltip>
			) : startCase(closing_remarks)}
		<IcMCopy style={{ marginLeft: '4px' }} onClick={() => handleCopy(closing_remarks)} />
	</div>,
			}
		),
	];
	return {
		pillMapping,
		contentValuesMapping,
		summary,
		status,
		preferred_shipping_lines,
		preferred_freight_rate,
		preferred_freight_rate_currency,
		preferred_airlines,
		booking_params,
		transitTime,
		commodity_description,
		bl_type,
		cargo_readiness_date,
		free_days_detention_destination,
		schedule_departure,
		cargo_weight_per_container,
		inco_term,
		trade_type,
		bookingParams,
		dislike_rates_inco,
	};
}

export default contentMapping;
