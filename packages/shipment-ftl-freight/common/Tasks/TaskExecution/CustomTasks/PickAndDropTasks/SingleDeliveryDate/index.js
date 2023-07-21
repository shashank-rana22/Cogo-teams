import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/surface-modules';
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

import getControls from '../configs/deliveryControls';
import {
	datesChecker,
	ENTITY_CODES,
	dateCheckerShipment,
} from '../utils/date-helpers';

import styles from './styles.module.css';

const LAST_INDEX_VALUE = 1;

function SingleDeliveryDate(props, ref) {
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

	const { entity_id = '', is_backdate_applicable = false } = item;

	const isDateAllowed = dateCheckerShipment(
		shipment_data?.created_at,
		GLOBAL_CONSTANTS.ftl_disable_backdate_date,
	);

	useEffect(() => {
		let deliveryMaxDate;
		let	deliveryMinDate;
		const DELAYED_DELIVERY_REMARK_RULES = {};
		if (
			ENTITY_CODES.includes(entity_id)
			&& is_backdate_applicable
			&& isDateAllowed
		) {
			deliveryMaxDate = new Date();

			deliveryMinDate = new Date(shipment_data?.created_at);
		}

		if (formValues?.delayed_delivery_reason === 'others') {
			DELAYED_DELIVERY_REMARK_RULES.required = true;
			DELAYED_DELIVERY_REMARK_RULES.message = 'This is required';
		} else {
			DELAYED_DELIVERY_REMARK_RULES.required = false;
		}

		setDateObj({
			deliveryMinDate,
			deliveryMaxDate,
			DELAYED_DELIVERY_REMARK_RULES,
		});
	}, [entity_id, formValues?.delayed_delivery_reason, isDateAllowed, is_backdate_applicable, shipment_data]);

	const showElements = {
		delayed_delivery_reason: datesChecker(
			formValues?.delivery_date,
			item?.estimated_arrival,
		),
		delayed_delivery_remark: datesChecker(
			formValues?.delivery_date,
			item?.estimated_arrival,
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

export default forwardRef(SingleDeliveryDate);
