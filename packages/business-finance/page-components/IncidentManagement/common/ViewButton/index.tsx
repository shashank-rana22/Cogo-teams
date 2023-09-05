import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface StateInterface {
	state: React.Dispatch<React.SetStateAction<boolean>>
}
function ViewButton({ state }:StateInterface) {
	const { t } = useTranslation(['incidentManagement']);
	return 	(
		<Button
			themeType="secondary"
			onClick={() => {
				state(true);
			}}
		>
			{t('incidentManagement:view_btn')}
		</Button>
	);
}
export default ViewButton;
