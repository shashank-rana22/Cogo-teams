import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const usePostListItemTaxes = () => {
	const [{ data, loading = false }, trigger] = useRequestBf(
		{
			url     : '/common/tax/list-item-taxes',
			method  : 'post',
			authKey : 'post_common_tax_list_item_taxes',
		},
		{ autoCancel: false },
	);

	const api = async () => {
		try {
			await trigger({
				data: {
					serviceName : 'overhead',
					tradeType   : 'LOCAL',
					countryCode : 'IN',
				},
			});
		} catch (err) {
			Toast.error(err);
		}
	};

	useEffect(() => {
		api();
	}, []);

	return {
		loading,
		lineItemsData: data,
	};
};

export default usePostListItemTaxes;
