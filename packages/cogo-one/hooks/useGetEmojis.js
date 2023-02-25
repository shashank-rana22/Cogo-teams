/* eslint-disable max-len */
import { usePublicRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetEmojiList = () => {
	const [onClicked, setOnClicked] = useState(false);

	const [{ data: emojisList }, trigger] = usePublicRequest({
		url    : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b3949cf1f8cd3366d0272bd60c87c930/emoji-list.json',
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
