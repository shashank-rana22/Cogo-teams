import { cl, Pill, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useUpdateSellQuotation from '../../../../hooks/useUpdateSellQuotation';
import TruckDetails from '../TrucksDetails';

import styles from './styles.module.css';

const FIXED_VALUE_FOR_INVOICE_AMOUNT = 2;
const LINE_ITEM_CODE_INDEX = 1;
const LINE_ITEM_RATE_QUANTITY_INDEX = 2;

function InvoiceCard({ data = {} }) {
	const [updateRateQuantity, setUpdateRateQuantity] = useState({});
	const {
		billing_address = {}, invoice_number = '', invoice_total_discounted,
		invoice_total_currency = '', payment_mode = '', status = '', services = [],
	} = data;

	const [openCard, setOpenCard] = useState(false);

	const { udpateSellQuotationLoading, udpateSellQuotation } = useUpdateSellQuotation();

	const handleCancel = () => {
		setUpdateRateQuantity({});
		setOpenCard(false);
	};

	const handleSubmit = () => {
		const payload = {
			quotations: [],
		};
		let shouldStopFlow = false;
		services?.forEach((serviceItem = {}) => {
			const { line_items = [] } = serviceItem;
			const SERVICE_WISE_LINE_ITEMS = Object.keys(updateRateQuantity)
				?.filter((item) => item?.split('_')?.[GLOBAL_CONSTANTS.zeroth_index] === serviceItem?.service_id);
			const eachTruckPayload = {
				service_id   : serviceItem?.service_id,
				service_type : serviceItem?.service_type,
				line_items   : [],
			};

			line_items?.forEach((lineItem = {}) => {
				const {
					code = '', alias = '', name = '', unit = '',
					currency = '', price_discounted = '', quantity = '',
				} = lineItem;
				const UPDATED_LINE_ITEMS = SERVICE_WISE_LINE_ITEMS
					?.filter((item) => item?.split('_')?.[LINE_ITEM_CODE_INDEX] === code);

				const UPDATED_RATE = 	updateRateQuantity[UPDATED_LINE_ITEMS
					?.filter((itm) => itm?.split('_')?.[LINE_ITEM_RATE_QUANTITY_INDEX] === 'rate')
					?.[GLOBAL_CONSTANTS.zeroth_index]];
				if (+UPDATED_RATE < +price_discounted) {
					Toast.error('Rate cannot be less than current rate');
					shouldStopFlow = true;
				}
				const UPDATED_QUANTITY = 	updateRateQuantity[UPDATED_LINE_ITEMS
					?.filter((itm) => itm?.split('_')?.[LINE_ITEM_RATE_QUANTITY_INDEX] === 'quantity')
					?.[GLOBAL_CONSTANTS.zeroth_index]];
				if (+UPDATED_QUANTITY < +quantity) {
					Toast.error('Quantity cannot be less than current quantity');
					shouldStopFlow = true;
				}
				eachTruckPayload.line_items.push({
					code,
					alias,
					name,
					unit,
					currency,
					price_discounted : UPDATED_RATE || price_discounted,
					quantity         : UPDATED_QUANTITY || quantity,
				});
			});

			payload.quotations.push(eachTruckPayload);
		});
		const callback = () => setOpenCard(false);
		if (shouldStopFlow) { return; }
		udpateSellQuotation({
			quotations: payload,
			callback,
		});
	};

	useEffect(() => {
		if (isEmpty(services)) 	return;
		const state = services.reduce((acc, service) => {
			service?.line_items?.forEach(({
				code = '', price_discounted, quantity,
			}) => {
				acc[`${service?.service_id}_${code}_rate`] = price_discounted || '';
				acc[`${service?.service_id}_${code}_quantity`] = quantity || '';
			});
			return acc;
		}, {});

		setUpdateRateQuantity(state);
	}, [services]);

	return (
		<div className={styles.card_details}>
			<div className={styles.invoice_card_container}>
				<div className={styles.details_container}>
					<div>
						<div className={styles.serial_id}>{billing_address?.business_name}</div>
						<div className={styles.importer_exporter}>
							<span style={{ color: '#c26d1a' }}>GST Number :</span>
							{billing_address?.tax_number}
						</div>
					</div>
				</div>

				<div className={styles.divider} />
				<div className={styles.invoice_number}>
					<span className={styles.serial_id}>{invoice_number}</span>
					<div>
						<span style={{ color: '#c26d1a' }}>Invoice Value : </span>
						{' '}
						{invoice_total_currency}
						{' '}
						{invoice_total_discounted.toFixed(FIXED_VALUE_FOR_INVOICE_AMOUNT)}
					</div>
				</div>
				<div className={styles.invoice_payment}>
					<Pill className={cl`${styles.source} customize_source`}>{payment_mode}</Pill>
					<Pill className={cl`${styles.payment_status} customize_source`}>{status}</Pill>
				</div>
				<div className={styles.divider} />
				<div className={styles.view_card_detais}>
					{!openCard ? (
						<IcMArrowRotateDown
							className={styles.arrow_rotation}
							onClick={() => setOpenCard(true)}
						/>
					)
						: <IcMArrowRotateUp className={styles.arrow_rotation} onClick={() => setOpenCard(false)} /> }

				</div>
			</div>

			{openCard ? (
				<>
					{services?.map((item) => (
						<TruckDetails
							truckDetailsdata={item}
							key={item?.service_id}
							updateRateQuantity={updateRateQuantity}
							setUpdateRateQuantity={setUpdateRateQuantity}
						/>

					))}
					<div className={styles.button_wrapper}>
						<div className={styles.cancel}>
							<Button
								style={{ marginRight: '10px' }}
								onClick={() => handleCancel()}
								themeType="secondary"
							>
								Cancel
							</Button>
						</div>
						<div>
							<Button
								type="submit"
								themeType="accent"
								disabled={udpateSellQuotationLoading}
								onClick={() => handleSubmit()}
							>
								Save
							</Button>
						</div>
					</div>
				</>
			)
				: null}

		</div>
	);
}

export default InvoiceCard;
