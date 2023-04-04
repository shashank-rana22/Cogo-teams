import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import subCategoryOptions from '../../../../../../../../utils/sub-category-options';
import controls from '../utils/controls';

const useAddServicePoc = ({
	setShowForm = () => {},
	getVendorData,
	refetchServicesPocs = () => {},
}) => {
	const [updatedControls, setUpdatedControls] = useState([]);
	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		watch,
	} = useForm();

	const isMainPOCPresent = getVendorData?.pocs?.length !== 0;

	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { partner_id = '', vendor_id } = query;

	const watchCategory = watch('category');

	const [{ loading }, trigger] = useRequest({
		url    : 'create_vendor_service_poc',
		method : 'post',
	}, { manual: true });

	const setSubCategory = ({ category: Category, controls: Controls }) => {
		const newControls = Controls.map((item) => {
			if (item.name !== 'sub_category') {
				return item;
			}
			const obj = {
				...item,
				options: subCategoryOptions[Category],
			};
			return obj;
		});

		setUpdatedControls(newControls);

		return newControls;
	};

	useEffect(() => {
		setSubCategory({ category: watchCategory, controls });
	}, [watchCategory]);

	const onSubmit = async () => {
		const data = getValues();

		const {
			mobile_number,
			cogoport_office_id,
		} = data || {};

		try {
			const payload = {
				...data,
				mobile_country_code : mobile_number?.country_code,
				mobile_number       : mobile_number?.number,
				vendor_id,
				cogo_entity_id      : partner_id,
				is_primary          : !isMainPOCPresent,
				cogoport_office_id,
			};

			await trigger({
				data: payload,
			});

			refetchServicesPocs();

			Toast.success('Service Poc added Successfully');

			setShowForm('');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to create service poc, please try again...');
		}
	};

	return {
		loading,
		updatedControls,
		errors,
		control,
		handleSubmit,
		onSubmit,
	};
};

export default useAddServicePoc;
