import useListFaqTags from '../hooks/useListFaqTags';
import tagListColumns from '../TableConfigurations/tagListColumns';

import Header from './Header';
import TagsTable from './TagsTable';

function TagComponent({ configurationPage, setConfigurationPage }) {
	const { data, loading = false, activeTag, setActiveTag, tagCurrentPage, setTagCurrentPage } = useListFaqTags();

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				activeTag={activeTag}
				setActiveTag={setActiveTag}
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
