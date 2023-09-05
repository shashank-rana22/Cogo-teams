import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateUpdateTnc = (props) => {
	const { action, refetch, editFormValue, setEditTncModalId, organizationId } =		props;

	const {
		general: { scope },
	} = useSelector((state) => state);

	const isUpdatable = action === 'update';

	const apiName = isUpdatable
		? 'update_terms_and_condition'
		: 'create_terms_and_condition';
	const [{ data, loading }, trigger] = useRequest({ method: 'post', scope, url: `/${apiName}` });

	const onSubmit = async (values = {}) => {
		try {
			console.log('values', values);
			const {
				service,
				shipping_line_id,
				airline_id,
				trade_type,
				country_id,
				paying_party_country_ids,
			} = values;

			const formValues = {
				service                  : service || undefined,
				trade_type               : trade_type || undefined,
				airline_id               : airline_id || undefined,
				shipping_line_id         : shipping_line_id || undefined,
				organization_id          : organizationId,
				country_id               : country_id || undefined,
				paying_party_country_ids : paying_party_country_ids || undefined,
			};

			const { description = [] } = values;

			const descriptionNew = description.map((item) => item.terms_and_condition);

			const payload = {
				...(isUpdatable ? { id: editFormValue?.id } : { ...formValues }),
				description: descriptionNew,
			};

			await trigger({
				data: payload,
			});

			toast.success('Terms And Conditions Updated Successfully');

			setEditTncModalId(null);
			refetch();
		} catch (error) {
			console.log(error);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useCreateUpdateTnc;
