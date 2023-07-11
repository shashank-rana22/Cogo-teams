import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useRequestBf } from '@cogoport/request';
import React from 'react';

function PaidDropDown({
	itemData,
	setViewId = () => {},
	showAccordian,
	setDropDownData,
	// setLoadingDropDown = () => {},
	activeAdvPaid,
}) {
	const { objectId = '' } = itemData || {};
	const [{ data }, trigger] = useRequestBf({
		url     : `/purchase/payrun-bill/list-paid-bill/${objectId}`,
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_bill_by_id',
	}, { manual: true, autoCancel: false });

	const [{ data : advanceData }, advanceTrigger] = useRequestBf({
		url     : `/purchase/payrun-bill/list-paid-advance-doc/${objectId}`,
		method  : 'get',
		authKey : 'get_purchase_payrun_bill_list_paid_advance_doc_by_id',
	}, { manual: true, autoCancel: false });

	const getApi =		activeAdvPaid === 'ADVANCE_PAYMENT'
		? advanceTrigger
		: trigger;
	const getData = () => {
		getApi({});
		setDropDownData(activeAdvPaid ? advanceData : data);
	};

	return (
		<div>
			<Button
				themeType="tertiary"
				size="sm"
				onClick={() => {
					setViewId(showAccordian ? '' : objectId);
					if (!showAccordian) {
						getData();
					}
				}}
			>
				{showAccordian ? <IcMArrowRotateUp height={16} width={16} />
					: <IcMArrowRotateDown height={16} width={16} />}
			</Button>
		</div>
	);
}

export default PaidDropDown;
