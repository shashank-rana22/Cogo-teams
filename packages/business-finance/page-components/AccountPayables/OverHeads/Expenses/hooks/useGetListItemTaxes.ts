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
		{ manual: true },
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
				console.log('error-', err);
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
