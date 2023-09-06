import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/surface-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

import useListFieldServiceOpsDetails from '../../../../../../hooks/useListFieldServiceOpsDetails';
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

	const fields = getControls(item);
	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
		setValue,
	} = useForm();

	const formValues = watch();

	const { list = [] } = useListFieldServiceOpsDetails({
		shipment_id: shipment_data?.id,
	});

	const {
		entity_id = '',
		is_backdate_applicable = '',
		eway_bill_details = [],
	} = item;

	const isDateAllowed = dateCheckerShipment(
		shipment_data?.created_at,
		GLOBAL_CONSTANTS.others.ftl_disable_backdate_date,
	);

	fields.forEach((singleControl) => {
		const tempControl = singleControl;
		if (ENTITY_CODES.includes(entity_id) && is_backdate_applicable && isDateAllowed) {
			if (tempControl.name === 'pickup_date') {
				tempControl.minDate = new Date(shipment_data?.created_at);
				if (eway_bill_details?.[GLOBAL_CONSTANTS.zeroth_index]?.eway_bill_generation_date) {
					const ewb_date = new Date(
						eway_bill_details?.[GLOBAL_CONSTANTS.zeroth_index]?.eway_bill_generation_date,
					);
					const changed_date = new Date(ewb_date?.setDate(ewb_date.getDate() - LAST_INDEX_VALUE));
					tempControl.minDate = changed_date;
				}
				tempControl.minDate = formValues?.loading_date
					? new Date(formValues?.loading_date)
					: new Date(shipment_data?.created_at);
			} else if (tempControl.name === 'loading_date') {
				tempControl.minDate = new Date(shipment_data?.created_at);
				tempControl.maxDate = item?.estimated_departure
					? new Date(item?.estimated_departure)
					: null;
			}
		}
		if (tempControl.name === 'delayed_pickup_remark') {
			if (formValues?.delayed_pickup_reason === 'others') {
				tempControl.rules = {
					required : true,
					message  : 'This is required',
				};
			} else {
				tempControl.rules = {
					required: false,
				};
			}
		}
	});

	useEffect(() => {
		if (isEmpty(list)) {
			return;
		}
		const truckExist = list.find(
			(listItem) => listItem?.truck_number?.toLowerCase() === item?.truck_number?.toLowerCase(),
		) || {};

		let startKmImages = [];
		if (!isEmpty(truckExist)) {
			startKmImages = truckExist?.start_kilometer_images || [];
		}
		setValue('image', startKmImages);
	}, [list, setValue, item?.truck_number]);

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
