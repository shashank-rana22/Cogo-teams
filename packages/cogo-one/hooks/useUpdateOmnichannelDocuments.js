import { useRequest } from '@cogoport/request';

function useUpdateOmnichannelDocuments({ documentCount }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_omnichannel_documents',
		method : 'post',
	}, { manual: true });

	const documentCountUpdates = async ({ listIds = [] }) => {
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
	};
}

export default useUpdateOmnichannelDocuments;
