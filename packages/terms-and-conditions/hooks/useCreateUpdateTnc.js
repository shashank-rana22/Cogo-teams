import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../utlis/toastApiError';

const useCreateUpdateTnc = (props) => {
	const { action, refetch, editFormValue, setEditTncModalId, organizationId } = props;

	const {
		general: { scope },
	} = useSelector((state) => state);

	const isUpdatable = action === 'update';

	const apiName = isUpdatable
		? 'update_terms_and_condition'
		: 'create_terms_and_condition';
	const [{ loading }, trigger] = useRequest({ method: 'post', scope, url: `/${apiName}` });

	const onSubmit = async (values = {}) => {
		try {
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

			Toast.success(`Terms And Conditions ${editFormValue.id ? 'Updated' : 'Created'} Successfully`);
			setEditTncModalId(null);
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useCreateUpdateTnc;
