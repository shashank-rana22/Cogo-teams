/* eslint-disable max-len */
import { usePublicRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetEmojiList = () => {
	const [onClicked, setOnClicked] = useState(false);

	const [{ data: emojisList }, trigger] = usePublicRequest({
		url    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/emoji-list.json',
		method : 'get',
	}, { manual: true });

	const emojiListFetch = async () => {
		try {
			await trigger();
		} catch (error) {
			// console.log(error);
		}
	};

	return {
		emojisList,
		setOnClicked,
		onClicked,
		emojiListFetch,
	};
};

export default useGetEmojiList;
