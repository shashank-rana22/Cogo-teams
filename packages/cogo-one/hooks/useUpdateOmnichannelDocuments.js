import { useRequest } from '@cogoport/request';

function useUpdateOmnichannelDocuments() {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_omnichannel_documents',
		method : 'post',
	}, { manual: true });

	const documentCountUpdates = async ({ documentCount, listIds = [] }) => {
		try {
			await trigger({
				params: {
					ids     : listIds,
					is_seen : true,
				},
			});
			documentCount();
		} catch (error) {
			// console.log(error);
		}
	};

	return {
		documentCountUpdates,
		loading,
	};
}

export default useUpdateOmnichannelDocuments;
