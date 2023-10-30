import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useHashFunction() {
	const [, trigger] = useRequest({
		url    : '/create_cogoone_group_hash',
		method : 'post',
	}, { manual: true });

	const hashFunction = useCallback(async ({ groupMemberIds }) => {
		const res = await trigger({ data: { users: groupMemberIds } });
		return res?.data?.group_hash;
	}, [trigger]);

	return { hashFunction };
}

export default useHashFunction;
