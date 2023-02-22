import { useState } from 'react';

import useListFaqTags from '../hooks/useListFaqTags';
import tagListColumns from '../TableConfigurations/tagListColumns';

import Header from './Header';
import TagsTable from './TagsTable';

function TagComponent({ configurationPage, setConfigurationPage }) {
	const [searchTagsInput, setSearchTagsInput] = useState('');
	const {
		data,
		loading = false,
		activeTag,
		setActiveTag,
		tagCurrentPage,
		setTagCurrentPage,
	} = useListFaqTags({ searchTagsInput });

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				activeTag={activeTag}
				setActiveTag={setActiveTag}
				searchTagsInput={searchTagsInput}
				setSearchTagsInput={setSearchTagsInput}
			/>
			<TagsTable
				columns={tagListColumns}
				data={data}
				tagsLoading={loading}
				tagCurrentPage={tagCurrentPage}
				setTagCurrentPage={setTagCurrentPage}
			/>

		</div>
	);
}

export default TagComponent;
