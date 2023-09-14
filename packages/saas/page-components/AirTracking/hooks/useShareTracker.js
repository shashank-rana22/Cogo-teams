import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useShareTracker = ({ id }) => {
	const { query } = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_saas_container_subscription_share',
		method : 'post',
	}, { manual: true });

	const [{ data, loading: getListLoading }, fetch] = useRequest({
		url    : '/get_saas_container_subscription_shared_details',
		method : 'get',
		params : {
			saas_container_subscription_id: id,
		},
	}, { manual: false });

	const getShareListData = () => {
		try {
			fetch({
				params: {
					saas_container_subscription_id: id,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	const shareTrackerHandler = async ({ info }) => {
		try {
			await trigger({
				data: {
					saas_container_subscription_id   : id,
					email                            : info.email,
					name                             : info.name,
					shared_by_organization_branch_id : query?.branch_id,
				},
			});
			getShareListData();
		} catch (err) {
			console.error(err);
		}
	};

	return {
		shareTrackerHandler, createLoading: loading, data, getListLoading,

	};
};

export default useShareTracker;
