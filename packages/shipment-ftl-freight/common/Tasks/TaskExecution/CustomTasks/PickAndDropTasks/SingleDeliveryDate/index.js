import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/surface-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useImperativeHandle, forwardRef } from 'react';

import useListFieldServiceOpsDetails from '../../../../../../hooks/useListFieldServiceOpsDetails';
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

	const fields = getControls(item);
	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
		setValue,
	} = useForm();

	const { list = [] } = useListFieldServiceOpsDetails({
		shipment_id: shipment_data?.id,
	});

	const formValues = watch();

	const { entity_id = '', is_backdate_applicable = false, pickup_date = '' } = item || {};

	const isDateAllowed = dateCheckerShipment(
		shipment_data?.created_at,
		GLOBAL_CONSTANTS.others.ftl_disable_backdate_date,
	);

	fields.forEach((singleControl) => {
		const tempControl = singleControl;
		if (
			ENTITY_CODES.includes(entity_id)
			&& is_backdate_applicable
			&& isDateAllowed
		) {
			if (tempControl.name === 'delivery_date') {
				tempControl.maxDate = new Date();
				tempControl.minDate = new Date(shipment_data?.created_at);
			}
		}
		if (tempControl.name === 'delayed_delivery_remark') {
			if (formValues?.delayed_delivery_reason === 'others') {
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
		if (tempControl.name === 'unloading_date') {
			tempControl.minDate = new Date(pickup_date);
		}
	});

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

	useEffect(() => {
		if (isEmpty(list)) {
			return;
		}
		const truckExist = (list || [])?.find(
			(listItem) => listItem?.truck_number?.toLowerCase() === item?.truck_number?.toLowerCase(),
		) || {};

		let endKmImages = [];
		if (!isEmpty(truckExist)) {
			endKmImages = truckExist?.end_kilometer_images || [];
		}
		setValue('image', endKmImages);
	}, [list, setValue, item?.truck_number]);

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
