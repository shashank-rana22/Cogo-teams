import { useRequestBf } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

const useGetGlCode = () => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/payments/parent-jv/gl-code-master',
			method  : 'get',
			authKey : 'get_payments_parent_jv_gl_code_master',
		},
		{ manual: true },
	);

	const getGlCode = useCallback(({ index, entityCode, accMode, setValue }) => {
		(async () => {
			try {
				if (!isEmpty(accMode) && !isEmpty(entityCode)) {
					const glResponse = await trigger({
						params: {
							accMode,
							entityCode,
						},
					});
					const glCode = glResponse?.data?.[0] || {};
					setValue(`line_items.${index}.glCode`, glCode?.accountCode || null);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [trigger]);

	return {
		data,
		loading,
		getGlCode,
	};
};

export default useGetGlCode;
