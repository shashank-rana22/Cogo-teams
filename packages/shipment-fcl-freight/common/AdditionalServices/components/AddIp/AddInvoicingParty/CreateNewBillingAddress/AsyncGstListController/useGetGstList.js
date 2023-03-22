import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetGstList({ registration_number }) {
	const [{ data }, trigger] = useRequest({
		url    : '/get_cogoscore_tax_numbers',
		method : 'GET',
	});

	useEffect(() => {
		(async () => {
			try {
				await trigger({
					params: {
						registration_number,
					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger, registration_number]);

	return {
		data,
	};
}

export default useGetGstList;
