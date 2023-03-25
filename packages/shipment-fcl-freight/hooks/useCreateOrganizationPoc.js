import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useCreateOrganizationPoc = ({
	shipment_id = '', organization_id = '', refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [loading, setLoading] = useState(false);

	const [{ loading:apiLoading }, trigger] = useRequest({
		url    : '/create_organization_poc',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		setLoading(true);
		try {
			const res = await trigger({ params: { shipment_id, organization_id, ...val } });
			if (!res.hasError) {
				Toast.success(successMessage);
				refetch();
				setLoading(false);
			}
		} catch (err) {
			setLoading(false);
			Toast.error(err);
		}
	};

	return {
		apiTrigger,
		loading: apiLoading || loading,
	};
};

export default useCreateOrganizationPoc;
