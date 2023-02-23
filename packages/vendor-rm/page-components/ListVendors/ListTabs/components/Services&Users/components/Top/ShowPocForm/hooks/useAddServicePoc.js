import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import subCategoryOptions from '../../../../../../../../OnBoardVendor/VendorServices/utils/sub-category-options';
import controls from '../utils/controls';

const useAddServicePoc = ({ setShowForm = () => {}, getVendorData }) => {
	const [updatedControls, setUpdatedControls] = useState([]);
	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		watch,
	} = useForm();

	const {
		general : { query = {} },
	} = useSelector((state) => state);

	const { partner_id = '' } = query;

	const category = watch('category');

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
		setSubCategory({ category, controls });
	}, [category]);

	const onSubmit = async () => {
		const data = getValues();

		try {
			const payload = {
				...data,
				mobile_country_code   : data?.mobile_number?.country_code,
				mobile_number         : data?.mobile_number?.number,
				whatsapp_country_code : data?.whatsapp_number?.country_code,
				whatsapp_number       : data?.whatsapp_number?.number,
				vendor_poc_proof      : data?.contact_proof_url?.finalUrl,
				vendor_id             : getVendorData?.vendor_details?.id,
				cogo_entity_id        : partner_id,
			};

			await trigger({
				data: payload,
			});

			Toast.success('service poc mapping added successfully');
			setShowForm('');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to create service poc, please try again...');
		}
	};

	return {
		updatedControls,
		errors,
		control,
		handleSubmit,
		onSubmit,
	};
};

export default useAddServicePoc;
