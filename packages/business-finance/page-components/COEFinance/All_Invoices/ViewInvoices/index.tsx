import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import useGetBill from '../../hook/useGetBill';

import Header from './Header/index';
import ShipmentDetails from './ShipmentDetails/index';
import styles from './styles.module.css';

function ViewInvoices() {
	const { query } = useRouter();
	const { billId, orgId, status, jobNumber, jobType } = query || {};
	const [remarksVal, setRemarksVal] = useState({
		collectionPartyRemark : [],
		billingPartyRemark    : [],
		invoiceDetailsRemark  : [],
		taggingRemark         : [],
	});
	const [overAllRemark, setOverAllRemark] = useState('');
	const [lineItemsRemarks, setLineItemsRemarks] = useState({});
	const {
		data:  fullResponse,
	} = useGetBill({ billId, orgId });

	const [checkItem, setCheckItem] = useState({
		shipmentDetailsCheck : false,
		documentsCheck       : false,
		taggingCheck         : false,
		sidDataCheck         : false,
		collectionPartyCheck : false,
		billingPartyCheck    : false,
		invoiceDetailsCheck  : false,
		lineItemsCheck       : false,
	});

	const [isTagFound, setIsTagFound] = useState(false);

	useEffect(() => {
		if (!isTagFound) {
			setCheckItem(
				(prev) => ({ ...prev, taggingCheck: true }),
			);
		}
	}, [setCheckItem, isTagFound]);

	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const listenScrollEvent = () => {
			const { scrollY } = window || {};
			if (scrollY > 50) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);

	return (
		<div>
			<div
				className={styles.sticky}
				style={{
					boxShadow: isSticky
						? '0px 4px 8px #bbbbc1'
						: 'none',
					background: isSticky ? '#ecfdff' : 'none',
				}}
			>
				<Header
					data={fullResponse}
					remarksVal={remarksVal}
					overAllRemark={overAllRemark}
					setOverAllRemark={setOverAllRemark}
					lineItemsRemarks={lineItemsRemarks}
					jobNumber={jobNumber}
					status={status}
					checkItem={checkItem}
					isTagFound={isTagFound}
				/>
			</div>

			<ShipmentDetails
				data={fullResponse}
				remarksVal={remarksVal}
				setRemarksVal={setRemarksVal}
				lineItemsRemarks={lineItemsRemarks}
				setLineItemsRemarks={setLineItemsRemarks}
				status={status}
				jobType={jobType}
				billId={billId}
				lineItemsCheck={checkItem?.lineItemsCheck}
				checkItem={checkItem}
				setCheckItem={setCheckItem}
				isTagFound={isTagFound}
				setIsTagFound={setIsTagFound}
			/>
		</div>
	);
}

export default ViewInvoices;
