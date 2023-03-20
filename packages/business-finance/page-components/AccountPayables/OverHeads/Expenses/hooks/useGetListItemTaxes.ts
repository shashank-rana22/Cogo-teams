import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetListItemTaxes = () => {
	const [{ data, loading = false }, trigger] = useRequestBf(
		{
			url     : '/common/tax/list-item-taxes',
			// url     : 'https://api.stage.cogoport.io/common/tax/list-item-taxes',
			method  : 'post',
			authKey : 'post_common_tax_list_item_taxes',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger(
					{
						data: {
							serviceName : 'overhead',
							tradeType   : 'LOCAL',
							countryCode : 'IN',
						},
					},
				);
			} catch (err) {
				Toast.error('Something went wrong');
			}
		};
		api();
	}, [trigger]);

	return {
		loading,
		lineItemsList: data?.list,
	};
};

export default useGetListItemTaxes;
