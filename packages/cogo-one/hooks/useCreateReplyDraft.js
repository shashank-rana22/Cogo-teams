import { useLensRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { dataParser } from '../helpers/dataParser';

const useCreateReplyDraft = () => {
	const { user_id: userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));
	const [, trigger] = useLensRequest({
		url    : 'create_draft_reply_html',
		method : 'POST',
	}, { manual: true });

	const createReplyDraft = async ({ payload, callbackFunc = () => {} }) => {
		try {
			const res = await trigger({
				data: {
					...payload,
					userId,
				},
			});
			const modifiedDraft = dataParser({ res });
			callbackFunc({ content: modifiedDraft });
		} catch (err) {
			console.error('err', err);
		}
	};

	return {
		createReplyDraft,
	};
};

export default useCreateReplyDraft;
