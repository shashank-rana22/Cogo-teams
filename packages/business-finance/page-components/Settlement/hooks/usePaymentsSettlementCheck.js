import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import { getFormatDates } from '../utils/getFormatDate';

const usePaymentsSettlementCheck = ({ selectedData = [], date = '', t = () => {} }) => {
	const { profile } = useSelector((state) => state || {});
	const [success, setSuccess] = useState(true);
	const [
		{
			loading:checkLoading,
			data:checkData,
		},
		checkTrigger,
	] = useRequestBf(
		{
			url     : 'payments/settlement/check',
			method  : 'post',
			authKey : 'post_payments_settlement_check',
		},
		{ manual: true },
	);

	const postPaymentsSettlementCheck = async () => {
		try {
			await checkTrigger({
				data: {
					stackDetails   : selectedData,
					createdBy      : profile?.user?.id,
					settlementDate : (date
						&& getFormatDates(date)) || undefined,
				},
			});
			Toast.success(t('settlement:dry_run_successful_message'));
		} catch (error) {
			setSuccess(false);
			Toast.error(error?.response?.data?.message || t('settlement:something_went_wrong_message'));
		}
	};

	return {
		checkLoading,
		checkData,
		postPaymentsSettlementCheck,
		success,
		setSuccess,
	};
};
export default usePaymentsSettlementCheck;
