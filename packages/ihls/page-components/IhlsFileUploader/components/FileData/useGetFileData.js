import { useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import FILE_STATS_MAPPING from '../../constants/getFileStatsMapping';

function useGetFileData({ file_id }) {
	const { profile = {} } = useSelector((state) => (state));
	const [{ data = {}, loading = false }] = useAthenaRequest({
		url    : '/athena/get_file_analytics',
		method : 'get',
		params : {
			file_id,
			user_id: profile.user.id,
		},
	}, { manual: false });

	const FILE_DATA = [];

	Object.keys(data).forEach((key) => {
		FILE_DATA.push({ title: FILE_STATS_MAPPING[key], count: data[key] });
	});

	return {
		data: FILE_DATA,
		loading,
	};
}

export default useGetFileData;
