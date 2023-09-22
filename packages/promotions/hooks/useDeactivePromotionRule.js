import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useDeactivePromotionRule = ({ data = {}, refetchList = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_promotion_rule',
			method : 'POST',
		},
		{ manual: true },
	);

	const onClickDeactivate = async () => {
		const { id = ' ' } = data;
		const payload = {
			id,
			status: 'inactive',
		};
		try {
			await trigger({
				data: payload,
			});
			refetchList();
		} catch (err) {
			toastApiError(err);
		}
	};

	return { loading, onClickDeactivate };
};

export default useDeactivePromotionRule;
