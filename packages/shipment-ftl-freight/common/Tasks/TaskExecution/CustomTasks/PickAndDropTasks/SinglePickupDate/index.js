import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/surface-modules';
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

import getControls from '../configs/pickupControls';
import {
	dateCheckerShipment,
	datesChecker,
	ENTITY_CODES,
} from '../utils/date-helpers';

import styles from './styles.module.css';

const LAST_INDEX_VALUE = 1;

function SinglePickupDate(props, ref) {
	const {
		item = {},
		shipment_data = {},
		finalServices = [],
		index = 0,
	} = props || {};

	const [dateObj, setDateObj] = useState({});

	const fields = getControls(item, dateObj);
	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
	} = useForm();

	const formValues = watch();

	const {
		entity_id = '',
		is_backdate_applicable = false,
		eway_bill_details = [],
	} = item;

	const isDateAllowed = dateCheckerShipment(
		shipment_data?.created_at,
		GLOBAL_CONSTANTS.ftl_disable_backdate_date,
	);

	useEffect(() => {
		const DELAYED_PICKUP_REMARK_RULES = {};
		let loadingMaxDate;
		let loadingMinDate;
		let pickupMinDate;
		if (
			ENTITY_CODES.includes(entity_id)
			&& is_backdate_applicable
			&& isDateAllowed
		) {
			pickupMinDate = new Date(shipment_data?.created_at);

			if (eway_bill_details?.[GLOBAL_CONSTANTS.zeroth_index]?.eway_bill_generation_date) {
				const ewb_date = new Date(
					eway_bill_details?.[GLOBAL_CONSTANTS.zeroth_index]?.eway_bill_generation_date,
				);
				const changed_date = new Date(ewb_date?.setDate(ewb_date.getDate() - LAST_INDEX_VALUE));
				pickupMinDate = changed_date;
			}

			loadingMaxDate = item?.estimated_departure
				? new Date(item?.estimated_departure)
				: null;

			loadingMinDate = new Date(shipment_data?.created_at);

			pickupMinDate = formValues?.loading_date
				? new Date(formValues?.loading_date)
				: new Date(shipment_data?.created_at);
		}

		if (formValues?.delayed_pickup_reason === 'others') {
			DELAYED_PICKUP_REMARK_RULES.required = true;
			DELAYED_PICKUP_REMARK_RULES.message = 'This is required';
		} else {
			DELAYED_PICKUP_REMARK_RULES.required = false;
		}

		setDateObj((prev) => ({
			...prev,
			pickupMinDate,
			loadingMinDate,
			loadingMaxDate,
			DELAYED_PICKUP_REMARK_RULES,
		}));
	}, [entity_id, eway_bill_details, formValues?.delayed_pickup_reason,
		formValues?.loading_date, isDateAllowed, is_backdate_applicable, item, shipment_data]);

	const showElements = {
		delayed_pickup_reason: datesChecker(
			formValues?.pickup_date,
			item?.estimated_departure,
		),
		delayed_pickup_remark: datesChecker(
			formValues?.pickup_date,
			item?.estimated_departure,
		),
	};

	useImperativeHandle(ref, () => ({
		handleSubmit,
		formValues,
		fields,
		errors,
		singleService: item,
	}));

	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={fields}
				errors={errors}
				themeType="admin"
				showElements={showElements}
			/>
			{index !== finalServices.length - LAST_INDEX_VALUE ? <div className={styles.line} /> : null}
		</div>
	);
}

export default forwardRef(SinglePickupDate);
