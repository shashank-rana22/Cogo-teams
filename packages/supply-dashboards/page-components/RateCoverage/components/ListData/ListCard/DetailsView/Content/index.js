/* eslint-disable max-lines-per-function */
import { Pill, Placeholder, Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMCopy } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { DEFAULT_VALUE, INCO_TERM_MAPPING, LOADER_COUNT } from '../../../../../configurations/helpers/constants';
import copyToClipboard from '../../../../../utilis/copyToClipboard';
import NewServiceProviderModal from '../ServiceProviderModal';
import styles from '../styles.module.css';

import contentMapping from './content-mappings';

function ServiceDetailsContent({
	shipment_data = {}, requestData = {},
	feedbackData = {}, shipment_loading = false,
	request_loading = false,
	feedback_loading = false,
	filter = {},
	data = {},
	source = {},
}) {
	const {
		origin_port = '',
		origin_airport = '',
		port = '',
		origin_location = '',
		location = '',
		airport = '',
		destination_port = '',
		destination_airport = '',
		destination_location = '',
	} = data;
	const [serviceModal, setServiceModal] = useState(false);
	const originName = (origin_port || origin_airport || port || origin_location || location || airport)?.name;
	const destinationName = (destination_port || destination_airport || port || destination_location)?.name;

	const {
		pillMapping = [], contentValuesMapping = [], summary = {},
		status = '', preferred_shipping_lines = [],	preferred_freight_rate,
		preferred_freight_rate_currency,
		preferred_airlines, booking_params, transitTime, commodity_description, bl_type,
		cargo_readiness_date, free_days_detention_destination, schedule_departure, cargo_weight_per_container,
		inco_term:inco_term_trade_type, trade_type, bookingParams, dislike_rates_inco,
	} = contentMapping({
		requestData,
		feedbackData,
		filter,
		shipment_data,
	});
	const tradeType = INCO_TERM_MAPPING[inco_term_trade_type] || startCase(trade_type);

	const { rate_card } = booking_params || {};

	const shippinlineName = preferred_shipping_lines?.[DEFAULT_VALUE]?.business_name;
	const airLineName = preferred_airlines?.[DEFAULT_VALUE]?.business_name;

	const handelNewServiceProvider = () => {
		setServiceModal(!serviceModal);
	};

	const handleCopy = (val) => {
		if (!val) return;
		const {
			commodity_category,
			container_size,
			container_type,
			containers_count,
			inco_term,
			shipping_line,
			feedbacks,
			closing_remarks,
			serial_id,
			payment_term,
			price_type,
			packages_count,
			commodity,
			operation_type,
			commodity_type,
			volume,
		} = val;

		const formatLine = (label, value) => (value ? `${label} ${startCase(value)}\n` : '');

		let textToCopy = '';
		textToCopy += formatLine('ORIGIN:', originName);
		textToCopy += formatLine('DESTINATION:', destinationName);
		textToCopy += formatLine('COMMODITY:', commodity_category || commodity);
		textToCopy += formatLine('CONTAINER SIZE:', container_size);
		textToCopy += formatLine('CONTAINER TYPE:', container_type);
		textToCopy += formatLine('COINTAINER COUNT:', containers_count);
		textToCopy += formatLine('COMMODITY TYPE:', commodity_type);
		textToCopy += formatLine('CARGO READY: ', cargo_readiness_date);
		textToCopy += formatLine('FREE DAYS DESTINATION DAYS:', free_days_detention_destination);
		textToCopy += formatLine('BL TYPE:', bl_type);
		textToCopy += formatLine('COMMODITY DESCRIPTION:', commodity_description);
		textToCopy += formatLine('SCHEDULE DEPARTURE:', schedule_departure);
		textToCopy += formatLine('SHIPPING LINE:', shipping_line);
		textToCopy += formatLine('FEEDBACKS:', feedbacks);
		textToCopy += formatLine('CLOSING REMARKS:', closing_remarks);
		textToCopy += formatLine('SERIAL ID:', serial_id);
		textToCopy += formatLine('INCO:', inco_term);
		textToCopy += formatLine('PAYMENT TERM:', payment_term);
		textToCopy += formatLine('PRICE TYPE:', price_type);
		textToCopy += formatLine('PACKGES COUNT:', packages_count);
		textToCopy += formatLine('PREFFERED SHIPPING LINE:', shippinlineName);
		textToCopy += formatLine('PREFFERED AIRLINE NAME:', airLineName);
		textToCopy += formatLine('TRANSIT TIME:', transitTime);
		textToCopy += formatLine('CARGO WEIGHT:', cargo_weight_per_container);
		textToCopy += formatLine('TRADE TYPE:', tradeType);
		textToCopy += formatLine('OPERATION TYPE:', operation_type);
		textToCopy += formatLine('VOLUME:', volume);
		textToCopy += formatLine('INCO:', dislike_rates_inco);
		textToCopy += formatLine('Packages:', !isEmpty(bookingParams) ? (bookingParams || []).map((item) => {
			const { length = 0, width = 0, height = 0 } = item || {};
			const dimension = length
				? `${length}cm X ${width}cm X ${height}cm,`
				: '';
			return item
				? `${item.packages_count} Pkg
				${dimension ? `(${dimension}) ` : ''}
				${startCase(item.packing_type || '')},`
				: '';
		}) : '');
		textToCopy += formatLine(
			'Dislike Rates:',
			rate_card?.line_items[0]?.buy_price,
			rate_card?.line_items[0]?.currency,
		);
		if (textToCopy) {
			navigator.clipboard.writeText(textToCopy);
			copyToClipboard(textToCopy, 'Data');
		}
	};

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
					<div className={styles.content_container}>
						{(!feedback_loading || !request_loading || !shipment_loading)
						&& (
							<div>
								<div className={styles.pill_head}>
									<div className={styles.pill}>
										{pillMapping?.map((val) => {
											if (!val?.label) {
												return null;
											}

											return (
												<div key={val?.label}>
													<Pill color="blue">{val?.label}</Pill>
												</div>
											);
										})}
									</div>
									{preferred_freight_rate
									&& (
										<div className={styles.price}>
											Preferred Price
											<div className={styles.price_value}>
												{formatAmount({
													amount   : preferred_freight_rate,
													currency : preferred_freight_rate_currency,
													options  : {
														style                 : 'currency',
														currencyDisplay       : 'symbol',
														maximumFractionDigits : 0,
													},
												})}
											</div>
										</div>
									)}
								</div>

								<div className={styles.pill}>
									{contentValuesMapping?.map((val) => {
										if (!val?.value) {
											return null;
										}

										return (
											<div key={val?.label}>
												<div className={styles.content}>
													<div className={styles.label}>
														{`${val.label} : `}
													</div>
													<Pill
														key={val?.value}
														size="md"
														color=""
													>
														{val?.value}
													</Pill>
												</div>
											</div>
										);
									})}
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

									{(airLineName || shippinlineName)
										&& (
											<div className={styles.content}>
												<div className={styles.label}>
													{shippinlineName ? 'Shippling Line : ' : 'Air Line : ' }
												</div>
												&nbsp;
												<div className={styles.name}>
													{startCase(shippinlineName || airLineName)}
												</div>
											</div>
										)}
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									{source === 'rate_feedback' && rate_card?.line_items[0]?.buy_price
										&& (
											<div className={styles.content} style={{ width: '50%' }}>
												<div className={styles.label}>
													Disliked Rate:
													<div className={styles.price_value}>
														{formatAmount({
															amount   : rate_card?.line_items[0]?.buy_price,
															currency : rate_card?.line_items[0]?.currency,
															options  : {
																style                 : 'currency',
																currencyDisplay       : 'symbol',
																maximumFractionDigits : 0,
															},
														})}
													</div>
													{' '}
													{' '}
													Per Kg
												</div>
											</div>
										)}
									<div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
										<div className={styles.copy_button}>
											<Button
												size="md"
												themeType="secondary"
												onClick={() => {
													if (source === 'live_booking') {
														handleCopy(summary);
													} if (source === 'rate_feedback') {
														handleCopy(feedbackData);
													} if (source === 'rate_request') {
														handleCopy(requestData);
													}
												}}
											>
												<IcMCopy height="40px" width="15px" />
												Copy
											</Button>
										</div>
										<div className={styles.head}>Service Provider Not Listed?</div>
										<Button
											size="md"
											themeType="linkUi"
											style={{ color: '#5936f0', padding: '8px' }}
											onClick={() => handelNewServiceProvider()}
										>
											ADD NEW
										</Button>
									</div>
								</div>
							</div>

						)}
					</div>
				)}

			{serviceModal && (
				<NewServiceProviderModal
					serviceModal={serviceModal}
					setServiceModal={setServiceModal}
					filter={filter}
					data={data}
					shipment_data={shipment_data}
				/>
			)}
		</div>
	);
}

export default ServiceDetailsContent;
