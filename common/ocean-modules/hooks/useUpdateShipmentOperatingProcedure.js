import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdateShipmentOperatingProcedure = ({
	sopData,
	reload,
	setReload = () => {},
	updatePermission,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_operating_procedure',
		method : 'POST',
		params : {
			procedure_id : sopData?.id,
			data         : { is_pinned: !sopData?.is_pinned },
		},
	}, { manual: true });

	const successMessage = `SuccessFully ${sopData?.is_pinned ? 'Unpinned' : 'Pinned'}`;

	const upatePinnedStatus = async () => {
		if (!updatePermission) {
			return;
		}
		try {
			await trigger();

			Toast.success(successMessage);
			setReload(!reload);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		upatePinnedStatus,
	};
};

export default useUpdateShipmentOperatingProcedure;
