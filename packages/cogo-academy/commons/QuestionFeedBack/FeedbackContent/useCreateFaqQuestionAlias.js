import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateFaqQuestionAlias = ({ suggested_question_abstract, setAddAlias }) => {
	const general = useSelector((state) => state.general || {});

	const { id = '' } = general?.query || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/create_faq_question_alias',
		method : 'POST',
	}, { manual: true });

	const onClickAddAlias = async () => {
		const payload = { parent_question_id: id, alias: suggested_question_abstract };

		try {
			await trigger({
				data: payload,
			});
			Toast.sucess('Aliases added sucessfully');
			setAddAlias(true);
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	};

	return { onClickAddAlias, loading };
};

export default useCreateFaqQuestionAlias;
