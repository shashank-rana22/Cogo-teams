import { useLensRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { dataParser } from '../helpers/dataParser';

const useCreateReplyAllDraft = () => {
	const { user_id: userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [, trigger] = useLensRequest({
		url    : 'create_draft_reply_all_html',
		method : 'POST',
	}, { manual: true });

	const createReplyAllDraft = async ({ payload, callbackFunc = () => {} }) => {
		const { signature = '', ...rest } = payload || {};
		try {
			const res = await trigger({
				data: {
					...rest,
					userId,
				},
			});

			const modifiedDraft = dataParser({ res, signature });
			callbackFunc({ content: modifiedDraft });
		} catch (err) {
			console.error('err', err);
		}
	};

	return {
		createReplyAllDraft,
	};
};

export default useCreateReplyAllDraft;
