import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import useGetPaidDropData from '../../hooks/useGetPaidDropData';

function PaidDropDown({
	itemData = {},
	setViewId = () => {},
	showAccordian = false,
	setDropDownData = () => {},
	setLoadingDropDown = () => {},
	overseasData = '',
	viewId = null,
}) {
	const { objectId = '' } = itemData || {};
	const { loading, getData, data } = useGetPaidDropData({ itemData, overseasData });
	useEffect(() => {
		if (showAccordian && data) {
			setDropDownData(data);
		} else {
			setDropDownData([]);
		}
	}, [showAccordian, data, setDropDownData, viewId]);

	useEffect(() => {
		if (loading) {
			setLoadingDropDown(true);
		} else {
			setLoadingDropDown(false);
		}
	}, [loading, setLoadingDropDown]);

	const handleClick = () => {
		setViewId(showAccordian ? '' : objectId);
		if (!showAccordian) {
			setLoadingDropDown(true);
			getData();
			setLoadingDropDown(false);
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
