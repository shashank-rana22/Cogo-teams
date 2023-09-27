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
		const { signature = '', ...rest } = payload || {};
		let res = {};
		try {
			res = await trigger({
				data: {
					...rest,
					userId,
				},
			});
		} catch (err) {
			console.error('err', err);
		} finally {
			const modifiedDraft = dataParser({ res, signature });
			callbackFunc({ content: modifiedDraft });
		}
	};

	return {
		createReplyDraft,
	};
};

export default useCreateReplyDraft;
