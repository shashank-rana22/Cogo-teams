import { useSelector } from "@cogoport/store";
import { useRequest } from "@cogoport/request";
import { toast } from '@cogoport/front/components/admin';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';

function useCreateRaiseQuery({
	controls = {},
	setShowModal = () => {},
	setIsOpen = () => {},
	shipmentId = '',
}) {
	const { scope, userId } = useSelector(({ general, profile }) => ({
		scope: general?.scope,
		userId: profile.id,
	}));

	const {
		fields,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm(controls);

	const { trigger, loading, data } = useRequest(
		'post',
		false,
		scope,
	)('/raise_query');

	const handleFormSubmit = async (values) => {
		const payload = {
			query_type: values?.query_type,
			remarks: values?.remarks,
			performed_by_id: userId,
			service: 'shipment',
			service_id: shipmentId,
		};

		try {
			const res = await trigger({
				data: payload,
			});
			if (!res.hasError) {
				setShowModal(true);
				setIsOpen(false);
				reset();
			}
		} catch (e) {
			toast.error(getApiErrorString(e?.data));
		}
	};

	return {
		loading,
		data: data || [],
		fields,
		handleSubmit,
		errors,
		controls,
		handleFormSubmit,
		reset,
	};
}

export default useCreateRaiseQuery;
