import { IcMRefresh } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function RefreshRate({ refetch = () => {} }) {
	const { general: { query = {} } } = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/update_spot_search',
	}, { manual: true });

	const refresh = async () => {
		const params = {
			only_rates_update_required : true,
			id                         : query.spot_search_id,
		};
		await trigger({ data: params });
		refetch();
	};

	return (
		<IcMRefresh
			cursor="pointer"
			disabled={loading}
			onClick={refresh}
			width={16}
			height={16}
		/>
	);
}

export default RefreshRate;
