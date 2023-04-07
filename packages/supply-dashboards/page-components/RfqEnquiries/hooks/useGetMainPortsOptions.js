import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetMainPortsOptions = ({ location_id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_locations_mapping',
		method : 'get',
	}, { manual: true });

	const getOptions = async (params) => {
		try {
			await trigger({ params });
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		if (location_id) {
			getOptions({ location_id, type: 'main_ports' });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location_id]);

	const options = (data?.list || []).map(({ id, display_name }) => ({ value: id, label: display_name }));

	return { loading, options };
};

export default useGetMainPortsOptions;
