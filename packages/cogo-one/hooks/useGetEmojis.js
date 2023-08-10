import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { usePublicRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useGetEmojiList = ({ formattedData = {} }) => {
	const [onClicked, setOnClicked] = useState(false);

	const { id = '' } = formattedData;

	const [{ data: emojisList }, trigger] = usePublicRequest({
		url    : GLOBAL_CONSTANTS.urls.list_emojis,
		method : 'get',
	}, { manual: true });

	const emojiListFetch = useCallback(() => {
		try {
			trigger();
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	useEffect(() => {
		if (id) {
			emojiListFetch();
		}
	}, [emojiListFetch, id]);

	return {
		emojisList,
		setOnClicked,
		onClicked,
	};
};

export default useGetEmojiList;
