import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getDefaultValues from '../../../utils/get-default-values';
import getControl from '../controls';

import useValidateEwayBillNumber from './useValidateEwayBillNumber';

const FTL_DISABLE_DATE = GLOBAL_CONSTANTS.ftl_disable_backdate_date;
const DISABLE_DATE_TIME = new Date(FTL_DISABLE_DATE).getTime();
const ENTITY_CODE = [];
const FIRST_INDEX = 1;
const SECOND_INDEX = 2;
const EWAY_BILL_LENGTH = 12;

Object.values(GLOBAL_CONSTANTS.cogoport_entities).map((value) => (
	value.feature_supported.includes('ftl_task_date_validation')
		&& ENTITY_CODE.push(value.id)
));

export const useFieldArrayData = ({ services, shipment_data }) => {
	const [ewayBillData, setewayBillData] = useState({});
	const [finalDoc, setFinalDoc] = useState();

	const fields = getControl({ services });
	const defaultValues = getDefaultValues(fields);

	const { updateEwayBillNumber } = useValidateEwayBillNumber();

	const checkDateTime = ({ limitDateTime, shipment_data_obj }) => {
		const shipmentCreatedAtDateTime = new Date(
			shipment_data_obj?.created_at,
		).getTime();
		if (shipmentCreatedAtDateTime >= DISABLE_DATE_TIME) {
			return limitDateTime;
		}
		return null;
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
		setValue,
	} = useForm({ defaultValues });
	const formValues = watch();

	useEffect(() => {
		const subscription = watch(async (value, { name }) => {
			const index = name.split('.')[FIRST_INDEX];
			const subcontrols = name.split('.')[SECOND_INDEX];

			if (!isEmpty(index) && !isEmpty(subcontrols)) {
				const { documents } = value;
				setFinalDoc(documents);
				const object = documents[index];
				ewayBillData[`${index}`] = { ...ewayBillData[`${index}`] };
				ewayBillData[`${index}`][`${subcontrols}`] = object[subcontrols];
				setewayBillData(ewayBillData);
			}
			if (
				subcontrols === 'eway_bill_number'
				&& ewayBillData[index]?.eway_bill_number?.length === EWAY_BILL_LENGTH
			) {
				const ewbNumber = ewayBillData[index]?.eway_bill_number;
				const res = await updateEwayBillNumber(ewbNumber);

				setValue(`documents.${index}.url`, res?.data?.pdf_url);
				setValue(`documents.${index}.ewb_validity`, res?.data?.data?.data?.ewb?.validUpto);
				setValue(`documents.${index}.eway_bill_generation_date`, res?.data?.data?.data?.ewb?.ewayBillDate);
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, ewayBillData, setValue, updateEwayBillNumber]);

	if (
		ENTITY_CODE.includes(services?.[GLOBAL_CONSTANTS.zeroth_index]?.entity_id)
		&& services?.[GLOBAL_CONSTANTS.zeroth_index]?.is_backdate_applicable
	) {
		fields?.documents?.controls.forEach((obj) => {
			if (obj.name === 'eway_bill_generation_date') {
				const currObj = obj;

				const dataObj =	services?.find(
					(item) => item.id === formValues.documents?.[GLOBAL_CONSTANTS.zeroth_index]?.truck_number,
				) || {};

				if (dataObj?.pickup_date) {
					const pickup_date = new Date(dataObj?.pickup_date);

					const changed_date = new Date(
						pickup_date?.setDate(pickup_date.getDate() + FIRST_INDEX),
					);

					currObj.maxDate = checkDateTime({ changed_date, shipment_data });
				}
			}
		});
	}

	return {
		finalDoc,
		ewayBillData,
		fields,
		handleSubmit,
		control,
		errors,
	};
};
