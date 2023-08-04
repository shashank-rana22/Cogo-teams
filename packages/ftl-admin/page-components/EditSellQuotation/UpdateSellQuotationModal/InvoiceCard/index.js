import { cl, Pill, Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetChargeCodes from '../../../../hooks/useGetChargeCodes';
import useUpdateSellQuotation from '../../../../hooks/useUpdateSellQuotation';
import TruckDetails from '../TrucksDetails';

import styles from './styles.module.css';

const FIXED_VALUE_FOR_INVOICE_AMOUNT = 2;
const INCREAMENT_VALUE = 1;
const LAST_POSITION = -1;

const MANDATORY_CHARGES = ['BAS', 'GSTC', 'STC'];

function InvoiceCard({ data = {}, refetch = () => {} }) {
	const [updateRateQuantity, setUpdateRateQuantity] = useState({});
	const {
		billing_address = {}, invoice_number = '', invoice_total_discounted,
		invoice_total_currency = '', payment_mode = '', status = '', services = [],
	} = data;

	const [openCard, setOpenCard] = useState(false);

	const { udpateSellQuotationLoading, udpateSellQuotation } = useUpdateSellQuotation();
	const { list: chargesList } = useGetChargeCodes();

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
			const serviceWiseLineItems = Object.keys(updateRateQuantity)
				?.filter((item) => item?.split('_')?.[GLOBAL_CONSTANTS.zeroth_index] === serviceItem?.service_id);

			const eachTruckPayload = {
				service_id   : serviceItem?.service_id,
				service_type : serviceItem?.service_type,
				line_items   : [],
			};

			line_items.forEach((lineItem, index) => {
				const {
					alias = '',
					unit = '',
					currency = '',
					price_discounted = '',
					quantity = '',
				} = lineItem || {};

				const updatedLineItemsKey = serviceWiseLineItems.find(
					(itm) => itm?.split('_')?.at(LAST_POSITION) === `${index}`,
				);

				const {
					code = '',
					name = '',
					updated_rate = '',
					updated_quantity = '',
				} = updateRateQuantity[updatedLineItemsKey] || {};

				eachTruckPayload.line_items.push({
					code,
					name,
					alias,
					unit,
					currency,
					price_discounted : updated_rate || price_discounted,
					quantity         : updated_quantity || quantity,
				});
			});

			if (serviceItem?.service_type === 'ftl_freight_service') {
				const CHECK_OBJ = {};
				eachTruckPayload.line_items.forEach((item) => {
					if (item?.code in CHECK_OBJ) {
						CHECK_OBJ[item?.code] += INCREAMENT_VALUE;
					}
					CHECK_OBJ[item?.code] = INCREAMENT_VALUE;
				});

				let val = 0;
				MANDATORY_CHARGES.forEach((code) => {
					if (code in CHECK_OBJ) {
						val += INCREAMENT_VALUE;
					}
				});
				if (val > INCREAMENT_VALUE && !shouldStopFlow) {
					Toast.error('Main Invoice Should only have single BAS , STC or GSTC');
					shouldStopFlow = true;
				}

				const isMultiple = MANDATORY_CHARGES.some((code) => CHECK_OBJ[code] > INCREAMENT_VALUE);
				if (isMultiple && !shouldStopFlow) {
					Toast.error('Main Invoice Should only have single BAS , STC or GSTC');
					shouldStopFlow = true;
				}
			}
			payload.quotations.push(eachTruckPayload);
		});

		if (shouldStopFlow) { return; }
		udpateSellQuotation({
			quotations : payload,
			callback   : () => {
				setOpenCard(false);
				refetch();
			},
		});
	};

	useEffect(() => {
		if (isEmpty(services)) 	return;
		const state = services.reduce((acc, service) => {
			service?.line_items?.forEach((lineItem, index) => {
				const { price_discounted = 0, quantity = 0 } = lineItem || {};
				acc[`${service?.service_id}_${index}`] = {
					updated_rate     : price_discounted,
					updated_quantity : quantity,
					...(lineItem || {}),
				};
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
							chargesList={chargesList}
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
