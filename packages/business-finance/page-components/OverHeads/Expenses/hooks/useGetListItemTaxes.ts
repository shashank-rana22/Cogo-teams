import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetListItemTaxes = ({ formData }) => {
	const countryCode = formData?.entityObject?.country?.country_code;

	const [{ data, loading = false }, trigger] = useRequestBf(
		{
			url     : '/common/tax/list-item-taxes',
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
							serviceName: 'overhead',
							countryCode,
						},
					},
				);
			} catch (err) {
				console.log('error-', err);
			}
		};
		api();
	}, [trigger, countryCode]);

	return {
		loading,
		lineItemsList: data?.list,
	};
};

export default useGetListItemTaxes;
