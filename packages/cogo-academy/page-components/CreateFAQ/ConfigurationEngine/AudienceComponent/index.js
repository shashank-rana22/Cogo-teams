import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useLIstFaqAudience from '../hooks/useLIstFaqAudience';
import audienceListColumns from '../TableConfigurations/audienceListColumns';

import AudianceTable from './AudianceTable';
import Header from './Header';
// import TagsTable from './TagsTable';
// import useDeleteTag from './useDeleteTag';

function AudienceComponent({ configurationPage, setConfigurationPage }) {
	const [searchAudienceInput, setSearchAudienceInput] = useState('');

	const {
		// fetchFaqAudience,
		data,
		loading,
		activeAudience,
		setActiveAudience,
		audienceCurrentPage,
		setAudienceCurrentPage,
	} = useLIstFaqAudience({ searchAudienceInput });

	// const { onClickDeleteIcon = () => {} } = useDeleteTag({ fetchFaqAudience });

	// const router = useRouter();

	const onClickEdit = (item) => {
		// setConfigurationPage('tag');
		// router.push(
		// 	`/learning/faq/create/configuration?update=tag&id=${item.id}`,
		// 	`/learning/faq/create/configuration?update=tag&id=${item.id}`,
		// );
		console.log('item', item);
	};

	const { listColumns = [] } = audienceListColumns({ onClickEdit });

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				activeAudience={activeAudience}
				setActiveAudience={setActiveAudience}
				searchAudienceInput={searchAudienceInput}
				setSearchAudienceInput={setSearchAudienceInput}
				// reset={reset}
			/>
			<AudianceTable
				columns={listColumns}
				data={data}
				audianceLoading={loading}
				audienceCurrentPage={audienceCurrentPage}
				setAudienceCurrentPage={setAudienceCurrentPage}
				setConfigurationPage={setConfigurationPage}
			/>

		</div>
	);
}

export default AudienceComponent;
