import { useState, useEffect } from 'react';

import useListKeywords from '../hooks/useListKeywords';
import keyWordListColumns from '../TableConfigurations/keyWordListColumns';

import Header from './Header';
import KeywordsTable from './KeywordsTable';
import useDeleteTag from './useDeleteTag';

function KeywordsComponent({ setConfigurationPage, reset }) {
	const [searchKeyWord, setSearchKeyWord] = useState('');
	const [sortType, setSortType] = useState(true);

	const {
		data,
		loading = false,
		activeKeyword,
		setActiveKeyword,
		keywordCurrentPage,
		setKeywordCurrentPage,
		fetchFaqKeyword,
	} = useListKeywords({ searchKeyWord, sortType });

	const {
		onClickDeleteIcon = () => {},
		showPopOver,
		setShowPopOver = () => {},
		loading:updateApiLoading,
	} = useDeleteTag({ fetchFaqKeyword });

	const { listColumns = [] } = keyWordListColumns({
		setSortType,
		onClickDeleteIcon,
		showPopOver,
		setShowPopOver,
		updateApiLoading,
		activeKeyword,
		sortType,
	});

	useEffect(() => {
		setKeywordCurrentPage(1);
	}, [activeKeyword, setKeywordCurrentPage]);

	return (
		<div>
			<Header
				activeKeyword={activeKeyword}
				setActiveKeyword={setActiveKeyword}
				searchKeyWord={searchKeyWord}
				setSearchKeyWord={setSearchKeyWord}
			/>

			<KeywordsTable
				activeKeyword={activeKeyword}
				columns={listColumns}
				data={data}
				tagsLoading={loading}
				keywordCurrentPage={keywordCurrentPage}
				setKeywordCurrentPage={setKeywordCurrentPage}
				setConfigurationPage={setConfigurationPage}
				reset={reset}
			/>
		</div>
	);
}

export default KeywordsComponent;
