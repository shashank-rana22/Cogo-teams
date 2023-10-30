import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError';

const useGetPayrunId = ({
	activeEntity = '', currency = '', setShowPayrunModal = () => {},
	serviceType = '', serviceAgent = '', categoryValue = '',
}) => {
	const { push } = useRouter();
	const {
		user_data: userData = {},
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user = '', session_type: sessionType = '' } = userData || {};
	const { id: userId = '', name = '' } = user || {};
	const [
		{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'post',
			authKey : 'post_purchase_payrun',
		},
		{ manual: true },
	);

	const getPayrunId = async () => {
		let type = '';
		let organizationId = '';
		let service_type = '';

		switch (categoryValue) {
			case 'normal_payrun':
				type = 'NORMAL';
				organizationId = undefined;
				service_type = undefined;
				break;
			case 'overseas_agent':
				type = 'OVERSEAS';
				organizationId = serviceAgent;
				service_type = serviceType.toUpperCase() || null;
				break;
			case 'overheads':
				type = 'OVERHEADS';
				organizationId = undefined;
				service_type = undefined;
				break;
			default:
				break;
		}

		try {
			const resp = await trigger({
				data: {
					type,
					currency,
					list            : [],
					entityCode      : activeEntity,
					performedBy     : userId,
					performedByName : name,
					performedByType : sessionType,
					organization_id : organizationId,
					service_type,
				},
			});

			if (resp?.data && categoryValue === 'normal_payrun') {
				push(
					`/business-finance/account-payables/invoices/create-pay-run?payrun=${resp?.data.id}
							&currency=${currency}&entity=${activeEntity}&payrun_type=${type}`,
				);
			} else if (categoryValue === 'overseas_agent') {
				push(
					`/business-finance/account-payables/invoices/over-seas-agent?organizationId=${serviceAgent}
						&services=${serviceType}&payrun_type=${type}&payrun=${resp?.data.id}
						&currency=${currency}&entity=${activeEntity}`,
				);
			} else if (categoryValue === 'overheads') {
				push(
					`/business-finance/account-payables/invoices/create-pay-run?payrun=${resp?.data.id}
							&currency=${currency}&entity=${activeEntity}&payrun_type=${type}`,
				);
			}

			setShowPayrunModal(false);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		data,
		loading,
		getPayrunId,
	};
};
export default useGetPayrunId;
