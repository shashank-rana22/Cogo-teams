/* eslint-disable no-unused-vars */
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';

const useCreateDeviceDetail = (refetch) => {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id:user_id } = user;

	const [{ loading }, trigger] = useHarbourRequest({
		url    : 'create_employee_device_detail',
		method : 'POST',
		params : {},

	}, { manual: true });

	const removeEmptyStringKeys = (obj) => {
		const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== '');
		return Object.fromEntries(filteredEntries);
	};

	const createDeviceDetail = async (values) => {
		const objValues = removeEmptyStringKeys(values);

		const { invoice_date, vendor_name, other_vendor_name, invoice_url, ...rest } = objValues;

		try {
			await trigger({
				data: {
					...rest,
					invoice_date      : format(invoice_date, 'yyyy-MM-dd 00:00:00'),
					vendor_name       : vendor_name === 'other' ? other_vendor_name : vendor_name,
					invoice_url       : invoice_url.finalUrl,
					performed_by_id   : user_id,
					performed_by_type : 'user',
					user_id,
				},
			});
			refetch();
		} catch (error) {
			console.log('error', error);
		}
	};

	return { createDeviceDetail, loading };
};

export default useCreateDeviceDetail;
