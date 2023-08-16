/* eslint-disable no-unused-vars */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { format } from '@cogoport/utils';

const FORMAT_TIME = `${GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']} 00:00:00`;

const useCreateDeviceDetail = () => {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id:user_id } = user;

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/create_employee_device_detail',
		method : 'POST',
		params : {},
	}, { manual: true });

	const removeEmptyStringKeys = (obj) => {
		const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== '');
		return Object.fromEntries(filteredEntries);
	};

	const createDeviceDetail = async (values) => {
		const objValues = removeEmptyStringKeys(values);

		const {
			invoice_date,
			vendor_name,
			other_vendor_name,
			invoice_url,
			device_type,
			serial_id,
			invoice_amount,
		} = objValues;

		try {
			const payload = {
				invoice_url    : invoice_url.finalUrl,
				user_id,
				device_details : [
					{
						device_type,
						serial_id,
						invoice_date   : format(invoice_date, FORMAT_TIME),
						invoice_amount : Number(invoice_amount),
						vendor_name    : vendor_name === 'other' ? other_vendor_name : vendor_name,
					},
				],
			};

			await trigger({
				data: payload,
			});
		} catch (error) {
			console.log('error', error);
		}
	};

	return { createDeviceDetail, loading };
};

export default useCreateDeviceDetail;
