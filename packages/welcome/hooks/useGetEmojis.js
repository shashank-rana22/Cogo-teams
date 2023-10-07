import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { usePublicRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetEmojiList = () => {
	const [onClicked, setOnClicked] = useState(false);

	const [{ data: emojisList }] = usePublicRequest({
		url    : GLOBAL_CONSTANTS.urls.list_emojis,
		method : 'get',
	}, { manual: false });

	return {
		emojisList,
		setOnClicked,
		onClicked,
	};
};

export default useGetEmojiList;
