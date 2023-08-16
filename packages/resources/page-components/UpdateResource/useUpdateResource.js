import { Toast } from '@cogoport/components';
import { useAuthRequest } from '@cogoport/request';

const useUpdateResource = ({
	reset = () => {}, resource = {}, setUpdateResource, resourceScopes,
	setRefetch,
}) => {
	const [{ loading = false }, trigger] = useAuthRequest({
		method : 'POST',
		url    : 'update_resource',
	}, { manual: true });

	const onSubmit = async (values) => {
		try {
			const changedScopes = values.scopes;
			const scopesToSend = [...resourceScopes];

			(scopesToSend || []).forEach((scp, index) => {
				if (!(changedScopes || []).some((scope) => scope.view_type === scp.view_type)) {
					scopesToSend[index] = {
						view_type        : scp.view_type,
						through_criteria : scp.through_criteria || [],
						status           : false,
					};
				}
			});

			(changedScopes || []).forEach((scp) => {
				if (!(scopesToSend || []).some((scope) => scope.view_type === scp.view_type)) {
					scopesToSend.push({
						view_type        : scp.view_type,
						through_criteria : scp.through_criteria || [],
						status           : true,
					});
				} else {
					(scopesToSend || []).forEach((scope, index) => {
						if (scope.view_type === scp.view_type) {
							scopesToSend[index] = {
								view_type        : scp.view_type,
								through_criteria : scp.through_criteria,
								status           : true,
							};
						}
					});
				}
			});

			await trigger({
				data: {
					...values,
					status : values.status === 'active',
					id     : resource.id,
					scopes : scopesToSend,
				},
			});

			Toast.success('Added Successfully!');
			reset();
			setUpdateResource({});
			setRefetch(true);
		} catch (err) {
			Toast.error(err.response?.data.error || 'Unable to update, please try again');
		}
	};

	const onReset = () => {
		reset();
	};

	return { onSubmit, onReset, loading };
};

export default useUpdateResource;
