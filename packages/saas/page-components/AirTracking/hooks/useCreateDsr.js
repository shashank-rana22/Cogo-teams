import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateDsr = () => {
	const { id = '', organization = {} } = useSelector((state) => ({
		id           : state.profile?.id,
		organization : state.profile?.organization,
	}));
	const { query } = useRouter();

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : 'create_saas_dsr',
	}, { manual: true });

	const createDsr = async ({ contactId }) => {
		try {
			const resp = await trigger({
				data: {
					created_by             : id,
					organization_id        : organization.id,
					organization_branch_id : query?.branch_id,
					trade_contact_id       : contactId,

				},
			});
			return resp.data?.id;
		} catch (err) {
			console.error(err);
			return null;
		}
	};

	return {
		loading, createDsr,
	};
};
export default useCreateDsr;
