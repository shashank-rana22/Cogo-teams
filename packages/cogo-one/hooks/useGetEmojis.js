/* eslint-disable max-len */
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetEmojiList = () => {
	const [onClicked, setOnClicked] = useState(false);
	const [{ data: emojisList }, trigger] = useRequest({
		url    : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b3949cf1f8cd3366d0272bd60c87c930/emoji-list.json',
		method : 'get',
	}, { manual: true });

	const emojiListFetch = async () => {
		await trigger();
	};

	useEffect(() => {
		emojiListFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		emojisList,
		setOnClicked,
		onClicked,
	};
};

export default useGetEmojiList;
