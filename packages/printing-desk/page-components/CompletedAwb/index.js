import { useTranslation } from 'next-i18next';
import React from 'react';

import List from '../../common/CardList';
import { completedAwbFields } from '../../configurations/completed-awb-fields';

function CompletedAwb({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
}) {
	const { t } = useTranslation(['printingDesk']);
	const fields = completedAwbFields({ t });

	return (
		<List
			fields={fields}
			data={data}
			loading={loading}
			page={page}
			setPage={setPage}
		/>
	);
}

export default CompletedAwb;
