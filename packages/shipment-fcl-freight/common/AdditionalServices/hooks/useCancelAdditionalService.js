import { stakeholderCheck } from '@cogoport/bookings/commons/helpers/stakeholderCheck';
import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import showErrorsInToast from '@cogoport/utils/showErrorsInToast';

const stateMapping = {
	is_kam        : 'cancelled',
	is_so1        : 'cancelled_by_supplier',
	is_so2        : 'cancelled_by_supplier',
	is_superadmin : 'cancelled',
};

const useCancelAdditionalService = ({
	id,
	remarkValues,
	refetch,
	setShowCancel = () => {},
}) => {
	const stakeholder = stakeholderCheck();

	const role = Object.keys(stakeholder || {})?.find(
		(item) => stakeholder[item] === true,
	);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_additional_service',
		method : 'POST',
	});

	const updateServiceList = async () => {
		try {
			const res = await trigger({
				data: {
					id,
					remarks : [remarkValues],
					state   : stateMapping[role] || 'cancelled',
				},
			});

			if (!res.error) {
				toast.success('Service Removed.');
				refetch();
				setShowCancel(false);
			} else if (res.error) {
				showErrorsInToast(res?.messages);
			}
		} catch (err) {
			toast.error(err?.data);
		}
	};

	return {
		updateServiceList,
		loading,
	};
};

export default useCancelAdditionalService;
