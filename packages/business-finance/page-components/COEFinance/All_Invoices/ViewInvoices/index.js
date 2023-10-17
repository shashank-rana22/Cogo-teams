import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetBill from '../../hook/useGetBill';
import useGetTaggingBills from '../../hook/useGetMappings';

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

	const [currentTab, setCurrentTab] = useState('shipmentDetailsTab');
	const [combinedRemarks, setCombinedRemarks] = useState({});

	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const listenScrollEvent = () => {
			if (window) {
				const { scrollY } = window || {};
				if (scrollY > 50) {
					setIsSticky(true);
				} else {
					setIsSticky(false);
				}
			}
		};

		window.addEventListener('scroll', listenScrollEvent);
		return () => {
			window.removeEventListener('scroll', listenScrollEvent);
		};
	}, []);

	const { mappingsData, loading } = useGetTaggingBills({
		billId,
	});

	const isTagFound = !loading && !isEmpty(mappingsData);

	useEffect(() => {
		if (!isTagFound && !loading) {
			// deleting tagging check if there is no tagging data
			setCheckItem(
				(prev) => {
					const newCheckItem = { ...prev };
					delete newCheckItem.taggingCheck;
					return ({ ...newCheckItem });
				},
			);
		}
	}, [isTagFound, loading]);

	return (
		<div>
			<div
				className={cl`${styles.sticky} ${isSticky ? styles.sticky_container : null}`}
			>
				<Header
					data={fullResponse}
					remarksVal={combinedRemarks}
					overAllRemark={overAllRemark}
					setOverAllRemark={setOverAllRemark}
					lineItemsRemarks={lineItemsRemarks}
					jobNumber={jobNumber}
					status={status}
					checkItem={checkItem}
					isTagFound={isTagFound}
					currentTab={currentTab}
					jobType={jobType}
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
				lineItemsCheck={checkItem?.lineItemsCheck}
				checkItem={checkItem}
				setCheckItem={setCheckItem}
				isTagFound={isTagFound}
				setCurrentTab={setCurrentTab}
				setCombinedRemarks={setCombinedRemarks}
				jobNumberByQuery={jobNumber}
				mappingsData={mappingsData}
			/>
		</div>
	);
}

export default ViewInvoices;
