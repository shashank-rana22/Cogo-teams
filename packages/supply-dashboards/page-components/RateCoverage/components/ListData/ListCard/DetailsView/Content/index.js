import { Pill, Placeholder, Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMCopy } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import { DEFAULT_VALUE, LOADER_COUNT } from '../../../../../configurations/helpers/constants';
import useListShipmentFlashBookingRates from '../../../../../hooks/useListShipmentFlashBookingRates';
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
	const [serviceModal, setServiceModal] = useState(false);

	const {
		data: flashBookingRates,
		shipmentFlashBookingRates = () => {},
	} = useListShipmentFlashBookingRates({ source_id: data?.source_id });

	const {
		pillMapping = [], contentValuesMapping = [], summary = {},
		status = '', preferred_shipping_lines = [],	preferred_freight_rate,
		preferred_freight_rate_currency,
	} = contentMapping({
		requestData,
		feedbackData,
		filter,
		shipment_data,
	});

	const handelNewServiceProvider = () => {
		setServiceModal(!serviceModal);
		shipmentFlashBookingRates();
	};

	const handleCopy = (val) => {
		if (!val) return;
		const {
			commodity_category,
			container_size,
			container_type,
			containers_count,
			inco_term,
			cargo_readiness_date,
			free_days_detention_destination,
			bl_type,
			commodity_description,
			schedule_departure,
			shipping_line,
			feedbacks,
			closing_remarks,
			serial_id,
			created_at,
			payment_term,
		} = val;

		const formatLine = (label, value) => (value ? `${label} ${startCase(value)}\n` : '');

		let textToCopy = '';
		textToCopy += formatLine('commodity: ', commodity_category);
		textToCopy += formatLine('containerSize: ', container_size);
		textToCopy += formatLine('containerType: ', container_type);
		textToCopy += formatLine('containersCount: ', containers_count);
		textToCopy += formatLine('cargoReadinessDate: ', cargo_readiness_date);
		textToCopy += formatLine('freeDaysDetentionDestination: ', free_days_detention_destination);
		textToCopy += formatLine('blType: ', bl_type);
		textToCopy += formatLine('commodityDescription: ', commodity_description);
		textToCopy += formatLine('scheduleDeparture: ', schedule_departure);
		textToCopy += formatLine('shippingLine: ', shipping_line);
		textToCopy += formatLine('feedbacks: ', feedbacks);
		textToCopy += formatLine('closing_remarks: ', closing_remarks);
		textToCopy += formatLine('serialId: ', serial_id);
		textToCopy += formatLine('createdAt: ', created_at);
		textToCopy += formatLine('incoTerm', inco_term);
		textToCopy += formatLine('paymentTerm', payment_term);

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
										{pillMapping?.map((val) => (
											<div key={val?.label}>
												{ val?.label
												&& <Pill color="blue">{val?.label}</Pill>}
											</div>
										))}
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
									{contentValuesMapping?.map((val) => (
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
													{startCase(preferred_shipping_lines?.
														[DEFAULT_VALUE]?.business_name)}
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
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
												} else {
													handleCopy(summary);
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
										style={{ color: 'blue', padding: '8px' }}
										onClick={handelNewServiceProvider}
									>
										ADD NEW
									</Button>
								</div>
							</div>
						)}
					</div>
				)}

			{serviceModal && (
				<NewServiceProviderModal
					serviceModal={serviceModal}
					setServiceModal={setServiceModal}
					flashBookingRates={flashBookingRates}
					filter={filter}
				/>
			)}
		</div>
	);
}

export default ServiceDetailsContent;
