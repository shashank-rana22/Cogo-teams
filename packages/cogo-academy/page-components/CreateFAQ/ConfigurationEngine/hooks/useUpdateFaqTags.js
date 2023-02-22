import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import useGetFaqTag from './useGetFaqTag';

function useUpdateFaqTags({ id }) {
	const { fetchFaqTag = () => {} } = useGetFaqTag();

	const [{ loading }, trigger] = useRequest({
		url    : '/update_faq_tag',
		method : 'POST',
	}, { manual: true });

	const updateFaqTag = async (values) => {
		const { name, description } = values || {};
		try {
			const res = await trigger({
				data: {
					name,
					display_name: startCase(name),
					description,
					id,
				},
			});

			if (res?.data) {
				fetchFaqTag(res?.data.id);
				Toast.success('Tag Updated sucessfully');
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return { updateFaqTag, updateFaqTagLoading: loading };
}
export default useUpdateFaqTags;
