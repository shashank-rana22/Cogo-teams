import { useState, useEffect } from 'react';
import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import isEmpty from '@cogo/utils/isEmpty';
import useGetLRData from './useLRData';
import addControl from '../controlLorryReceipt';

export const useFieldArrayData = ({ services }) => {
	const [show, setShow] = useState(false);
	const [id, setId] = useState('');

	const [lrData, setLrData] = useState({});
	const [finalDoc, setFinalDoc] = useState();
	const [disabledButtons, setDisabledButtons] = useState({ 0: true });
	const control = addControl();
	const { data, getlrData } = useGetLRData();
	const {
		fields,
		handleSubmit,
		watch,
		setValues,
		formState: { errors },
	} = useFormCogo(control);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			const index = name.split('.')[1];
			const subcontrols = name.split('.')[2];
			if (!isEmpty(index) && !isEmpty(subcontrols)) {
				const { documents } = value;
				setFinalDoc(documents);
				const object = documents[index];
				lrData[`${index}`] = { ...lrData[`${index}`] };
				lrData[`${index}`][`${subcontrols}`] = object[subcontrols];
				setLrData(lrData);
				if (!!documents[index].service_id && !!documents[index].lr_number) {
					setDisabledButtons((prev) => ({
						...prev,
						[index]: false,
					}));
				} else {
					setDisabledButtons((prev) => ({
						...prev,
						[index]: true,
					}));
				}
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const options = (services || []).filter((truck) => !!truck?.truck_number);
	const finalOptions = options.map((option) => ({
		label: option?.truck_number,
		value: `${option?.truck_number}:${option?.id}`,
	}));
	fields.documents.controls[0].options = finalOptions;
	return {
		show,
		id,
		setShow,
		setId,
		finalDoc,
		disabledButtons,
		data,
		lrData,
		getlrData,
		fields,
		handleSubmit,
		control,
		setValues,
		errors,
	};
};
