import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import toastApiError from '../../../commons/toastApiError.ts';
import { getSelectedInvoices } from '../utils/getselectedInvoices';

const usePostAddToSelected = ({ getPayrunInvoices = () => {}, apiData = {} }) => {
	const { user_data: userData = {}, query: urlQuery = {} } = useSelector(({ profile, general }) => ({
		user_data: profile || {}, query: general.query,
	}));
	const geo = getGeoConstants();

	const { user = '', session_type: sessionType = '' } = userData || {};
	const { id: userId = '', name = '' } = user || {};

	const {
		entity = '',
		currency = geo.country.currency.code,
		payrun = '',
	} = urlQuery || {};
	const [{ loading }, addToSelectedTrigger] = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'post',
			authKey : 'post_purchase_payrun',
		},
		{ manual: true },
	);

	const submitSelectedInvoices = async () => {
		const { list = [] } = apiData || {};
		const invoices = getSelectedInvoices({ list });

		try {
			if (!isEmpty(invoices)) {
				await addToSelectedTrigger({
					data: {
						list            : [...invoices],
						id              : payrun,
						entityCode      : entity,
						currencyCode    : currency,
						performedBy     : userId,
						performedByType : sessionType,
						performedByName : name,
					},
				});
				Toast.success('Invoice added to Payrun Successfully');
				getPayrunInvoices();
			}
		} catch (e) {
			toastApiError(e);
		}
	};
	return { submitSelectedInvoices, loading };
};

export default usePostAddToSelected;
