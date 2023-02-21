import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import useGetFaqTag from './useGetFaqTag';

function useCreateFaqTag() {
	const { fetchFaqTag = () => {} } = useGetFaqTag();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_faq_tag',
		method : 'POST',
	}, { manual: true });

	const createFaqTag = async (values) => {
		const { name, description } = values || {};

		try {
			const res = await trigger({

				data: {
					name,
					display_name: 'RFQ',
					description,
				},
			});
			if (res?.data) {
				fetchFaqTag(res?.data.id);
				Toast.success('Tag created sucessfully');
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	const onClickSaveButton = (values) => {
		createFaqTag(values);
	};

	return { createFaqTag, createFaqTagLoading: loading, onClickSaveButton };
}
export default useCreateFaqTag;
