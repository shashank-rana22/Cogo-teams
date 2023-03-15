import { stakeholderCheck } from '@cogoport/bookings/commons/helpers/stakeholderCheck';
import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import showErrorsInToast from '@cogoport/utils/showErrorsInToast';

const stateMapping = {
	is_kam        : 'cancelled',
	is_so1        : 'cancelled_by_supplier',
	is_so2        : 'cancelled_by_supplier',
	is_superadmin : 'cancelled',
};

const updateAdditionalService = ({
	id,
	remarkValues,
	refetch,
	setShowCancel = () => {},
}) => {
	const scope = useSelector(({ general }) => general.scope);

	const stakeholder = stakeholderCheck();

	const role = Object.keys(stakeholder || {})?.find(
		(item) => stakeholder[item] === true,
	);

	const { trigger, loading } = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_additional_service');

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

export default updateAdditionalService;
