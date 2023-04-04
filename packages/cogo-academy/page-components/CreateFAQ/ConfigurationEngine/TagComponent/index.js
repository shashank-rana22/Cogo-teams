import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import useListFaqTags from '../hooks/useListFaqTags';
import tagListColumns from '../TableConfigurations/tagListColumns';

import Header from './Header';
import TagsTable from './TagsTable';
import useDeleteTag from './useDeleteTag';

function TagComponent({ configurationPage, setConfigurationPage, reset }) {
	const [searchTagsInput, setSearchTagsInput] = useState('');

	const {
		data,
		loading = false,
		activeTag,
		setActiveTag,
		tagCurrentPage,
		setTagCurrentPage,
		fetchFaqTag,
	} = useListFaqTags({ searchTagsInput });

	const {
		onClickDeleteIcon = () => {},
		showPopOver,
		setShowPopOver = () => {},
		loading:updateApiLoading,
	} = useDeleteTag({ fetchFaqTag });

	const router = useRouter();

	const onClickEdit = (item) => {
		setConfigurationPage('tag');
		router.push(
			`/learning/faq/create/configuration?update=tag&id=${item.id}`,
			`/learning/faq/create/configuration?update=tag&id=${item.id}`,
		);
	};

	const { listColumns = [] } = tagListColumns({
		onClickEdit,
		onClickDeleteIcon,
		showPopOver,
		setShowPopOver,
		updateApiLoading,
		activeTag,
	});

	useEffect(() => {
		setTagCurrentPage(1);
	}, [activeTag, setTagCurrentPage]);

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

export default TagComponent;
