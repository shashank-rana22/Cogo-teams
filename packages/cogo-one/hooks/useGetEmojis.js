import { usePublicRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

const useGetEmojiList = ({ formattedData = {} }) => {
	const [onClicked, setOnClicked] = useState(false);

	const { id = '' } = formattedData;

	const [{ data: emojisList }, trigger] = usePublicRequest({
		url    : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/emoji-list.json',
		method : 'get',
	}, { manual: true });

	const emojiListFetch = useCallback(async () => {
		try {
			await trigger();
		} catch (error) {
			console.log(error);
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
