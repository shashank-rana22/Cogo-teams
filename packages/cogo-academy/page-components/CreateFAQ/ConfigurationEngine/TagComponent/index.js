import useListFaqTags from '../hooks/useListFaqTags';
import tagListColumns from '../TableConfigurations/tagListColumns';

import Header from './Header';
import TagsTable from './TagsTable';

function TagComponent({ configurationPage, setConfigurationPage }) {
	const { data, tagCurrentPage, setTagCurrentPage } = useListFaqTags();

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
			/>
			<TagsTable
				columns={tagListColumns}
				data={data}
				tagCurrentPage={tagCurrentPage}
				setTagCurrentPage={setTagCurrentPage}
			/>

		</div>
	);
}

export default TagComponent;
