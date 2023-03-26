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

	const {
		onClickDeleteIcon = () => {},
		showPopOver,
		setShowPopOver,
		loading:updateApiLoading,
	} = useUpdateAudience({ fetchFaqAudience });

	const { listColumns = [] } = audienceListColumns({
		onClickDeleteIcon,
		showPopOver,
		setShowPopOver,
		updateApiLoading,

	});

	return (
		<div>
			<Header
				configurationPage={configurationPage}
				setConfigurationPage={setConfigurationPage}
				activeAudience={activeAudience}
				setActiveAudience={setActiveAudience}
				searchAudienceInput={searchAudienceInput}
				setSearchAudienceInput={setSearchAudienceInput}
			/>

			<AudianceTable
				columns={listColumns}
				data={data}
				activeAudience={activeAudience}
				audianceLoading={loading}
				audienceCurrentPage={audienceCurrentPage}
				setAudienceCurrentPage={setAudienceCurrentPage}
				setConfigurationPage={setConfigurationPage}
			/>

		</div>
	);
}

export default AudienceComponent;
