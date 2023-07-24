import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

import formatContainerValues from '../helpers/format-container-deatils';

const useUpdateShipmentContainerDetails = ({ setShow = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_container_details',
		method : 'POST',
	});

	const onSubmit = async (val) => {
		const payload = formatContainerValues({ val });

		try {
			await trigger({ data: payload });
			Toast.success('Updated Successfully!');
			setShow(false);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		onSubmit,
	};
};

export default useUpdateShipmentContainerDetails;
