import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const usePaymentsSettlementCheck = ({ selectedData, date }) => {
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
	const { profile } = useSelector((state) => state || {});
	const postPaymentsSettlementCheck = async () => {
		try {
			await checkTrigger({
				data: {
					stackDetails   : selectedData,
					createdBy      : profile.user?.id,
					settlementDate : (date
						&& formatDate({
							date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
							formatType : 'dateTime',
							separator  : ' ',
						})) || undefined,
				},
			});
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		checkLoading,
		checkData,
		postPaymentsSettlementCheck,
	};
};
export default usePaymentsSettlementCheck;
