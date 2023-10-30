import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError';

const useDeleteExcludePayrun = ({ apiData = {}, type = '' }) => {
	const { push } = useRouter();

	const { userData = {}, query: urlQuery = {} } = useSelector(({ profile, general }) => ({
		userData: profile || {}, query: general.query,
	}));

	const { payrun = '' } = urlQuery || {};

	const { user = '', session_type: sessionType = '' } = userData || {};

	const { id: userId = '', name = '' } = user || {};

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/suppliers',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_suppliers',
		},
		{ manual: true },
	);

	const onExclude = async () => {
		const { list: dataList = [] } = apiData || {};
		const orgids = (dataList || [])?.filter((item) => (item?.checked))?.map((item) => (item?.organizationId));
		try {
			const payload = {
				payrunId        : payrun,
				organizationIds : orgids,
				performedBy     : userId,
				performedByType : sessionType,
				performedByName : name,
			};
			await trigger({ data: payload });

			if (payrun && type === 'audit') {
				push(
					'/business-finance/account-payables/audit/[payrun_id]',
					`/business-finance/account-payables/audit/${payrun}`,
				);
			} else {
				push(
					'/business-finance/account-payables/[active_tab]',
					'/business-finance/account-payables/payruns',
				);
			}

			Toast.success('Deleted Sucessfully');
			Toast.success('Please wait while Payrun Saves...');
		} catch (err) {
			toastApiError(err);
		}
	};

	return ({
		loading,
		onExclude,
	});
};

export default useDeleteExcludePayrun;
