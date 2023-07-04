import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetState = ({ setData }) => {
	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/purchase/bills/bill-state',
			method  : 'get',
			authKey : 'get_purchase_bills_bill_state',
		},
		{ manual: true },
	);

	const onSubmit = async (values) => {
		try {
			const payload = {
				billNumber : values.billnum,
				jobNumber  : values.sid,
			};
			const resp = await trigger({ params: payload });
			if (isEmpty(resp?.data)) {
				Toast.error('No Data Found');
			}
			setData(resp?.data || []);
		} catch (err) {
			setData([]);
			toastApiError(err);
		}
	};
	return ({
		loading,
		onSubmit,
	});
};

export default useGetState;
