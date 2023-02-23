import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useListFaqTags from '../hooks/useListFaqTags';
import tagListColumns from '../TableConfigurations/tagListColumns';

import Header from './Header';
import TagsTable from './TagsTable';

function TagComponent({ configurationPage, setConfigurationPage, reset }) {
	const [searchTagsInput, setSearchTagsInput] = useState('');
	const {
		data,
		loading = false,
		activeTag,
		setActiveTag,
		tagCurrentPage,
		setTagCurrentPage,
	} = useListFaqTags({ searchTagsInput });

	const router = useRouter();

	const onClickEdit = (item) => {
		setConfigurationPage('tag');
		router.push(
			`/learning/faq/create/configuration?update=tag&id=${item.id}`,
			`/learning/faq/create/configuration?update=tag&id=${item.id}`,
		);
	};
	const { listColumns = [] } = tagListColumns({ onClickEdit });

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				activeTag={activeTag}
				setActiveTag={setActiveTag}
				searchTagsInput={searchTagsInput}
				setSearchTagsInput={setSearchTagsInput}
				reset={reset}
			/>
			<TagsTable
				columns={listColumns}
				data={data}
				tagsLoading={loading}
				tagCurrentPage={tagCurrentPage}
				setTagCurrentPage={setTagCurrentPage}
				setConfigurationPage={setConfigurationPage}
			/>

		</div>
	);
}

export default TagComponent;
