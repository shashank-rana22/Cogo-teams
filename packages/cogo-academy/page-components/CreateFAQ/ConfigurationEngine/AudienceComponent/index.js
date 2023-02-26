import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import useLIstFaqAudience from '../hooks/useLIstFaqAudience';
import audienceListColumns from '../TableConfigurations/audienceListColumns';

import AudianceTable from './AudianceTable';
import Header from './Header';
import useUpdateAudience from './useUpdateAudience';

function AudienceComponent({ configurationPage, setConfigurationPage }) {
	const [searchAudienceInput, setSearchAudienceInput] = useState('');

	const {
		fetchFaqAudience,
		data,
		loading,
		activeAudience,
		setActiveAudience,
		audienceCurrentPage,
		setAudienceCurrentPage,
	} = useLIstFaqAudience({ searchAudienceInput });

	const { onClickDeleteIcon = () => {} } = useUpdateAudience({ fetchFaqAudience });

	const router = useRouter();

	const onClickEdit = (item) => {
		setConfigurationPage('audience');
		router.push(
			`/learning/faq/create/configuration?update=audience&id=${item.id}`,
			`/learning/faq/create/configuration?update=audience&id=${item.id}`,
		);
	};

	const { listColumns = [] } = audienceListColumns({ onClickEdit, onClickDeleteIcon });

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
