import { useState, useEffect } from 'react';

import useListFaqTags from '../hooks/useListFaqTags';
import keyWordListColumns from '../TableConfigurations/keyWordListColumns';

import Header from './Header';
import KeywordsTable from './KeywordsTable';
import useDeleteTag from './useDeleteTag';

function KeywordsComponent({ setConfigurationPage, reset }) {
	const [searchTagsInput, setSearchTagsInput] = useState('');
	const [sortType, setSortType] = useState(true);

	const {
		data,
		loading = false,
		activeTag,
		setActiveTag,
		tagCurrentPage,
		setTagCurrentPage,
		fetchFaqTag,
	} = useListFaqTags({ searchTagsInput, sortType });

	const {
		onClickDeleteIcon = () => {},
		showPopOver,
		setShowPopOver = () => {},
		loading:updateApiLoading,
	} = useDeleteTag({ fetchFaqTag });

	const { listColumns = [] } = keyWordListColumns({
		setSortType,
		onClickDeleteIcon,
		showPopOver,
		setShowPopOver,
		updateApiLoading,
		activeTag,
		sortType,
	});

	useEffect(() => {
		setTagCurrentPage(1);
	}, [activeTag, setTagCurrentPage]);

	return (
		<div>
			<Header
				activeTag={activeTag}
				setActiveTag={setActiveTag}
				searchTagsInput={searchTagsInput}
				setSearchTagsInput={setSearchTagsInput}
				reset={reset}
			/>

			<KeywordsTable
				activeTag={activeTag}
				columns={listColumns}
				data={data}
				tagsLoading={loading}
				tagCurrentPage={tagCurrentPage}
				setTagCurrentPage={setTagCurrentPage}
				setConfigurationPage={setConfigurationPage}
				reset={reset}
			/>
		</div>
	);
}

export default KeywordsComponent;
