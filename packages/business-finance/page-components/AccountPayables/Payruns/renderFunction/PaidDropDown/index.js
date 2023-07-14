import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import useGetPaidDropData from '../../hooks/useGetPaidDropData';

function PaidDropDown({
	itemData = {},
	setViewId = () => {},
	showAccordian = false,
	setDropDownData = () => {},
	setLoadingDropDown = () => {},
	overseasData = '',
}) {
	const { objectId = '' } = itemData || {};
	const { getData, data, loading } = useGetPaidDropData({ itemData, overseasData });

	const handleClick = () => {
		setViewId(showAccordian ? '' : objectId);
		if (!showAccordian) {
			getData();
			setDropDownData(data);
			setLoadingDropDown(loading);
		}
	};
	return (
		<div>
			<Button
				themeType="tertiary"
				size="sm"
				onClick={handleClick}
			>
				{showAccordian ? <IcMArrowRotateUp height={16} width={16} />
					: <IcMArrowRotateDown height={16} width={16} />}
			</Button>
		</div>
	);
}

export default PaidDropDown;
