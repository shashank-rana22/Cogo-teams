/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

import useUpdateColletctionParty from '../hooks/useUpdateCollectionParty';

import getPurchaseReplica from './get-purchase-replica';
import mappingsFunc from './mappingsFunc';

const useHandleFinalSave = ({
	data = {},
	purchaseInvoiceValues = {},
	collectionPartyId = '',
	onClose = () => { },
	editData = {},
	setGlobalSelected,
	globalSelected,
}) => {
	const isLockedMode = ['approval_pending', 'coe_approved'].includes(
		editData.status,
	);

	const charges = purchaseInvoiceValues?.line_items || [];
	const allCodes = charges.map((charge) => charge?.code || charge?.name);
	const buyCodes = [];
	let existingMappings = [];
	if (Object.keys(globalSelected).length && !isLockedMode) {
		existingMappings = mappingsFunc(
			data,
			globalSelected,
			purchaseInvoiceValues,
		);
	}

	const mappingsToTake = isLockedMode ? editData.mappings : existingMappings;
	mappingsToTake?.forEach((item) => {
		const buyCodesTemp = (item.buy_line_items || []).map(
			(itemMap) => `${itemMap.code}:${itemMap.service_id}`,
		);
		buyCodes.push(...buyCodesTemp);
	});

	const [currentSelected, setCurrentSelected] = useState({
		pi  : allCodes,
		buy : buyCodes,
	});
	const { updateCp, loading } = useUpdateColletctionParty({ onClose });

	const handleChange = (item, type) => {
		const selectedValues = currentSelected[type] || [];
		const indexOfItem = selectedValues.indexOf(item);
		if (indexOfItem === -1) {
			const obj = {
				...currentSelected,
				[type]: [...selectedValues, item],
			};
			setCurrentSelected(obj);
			setGlobalSelected({
				0: {
					purchase_line_items : obj.pi,
					buy_line_items      : obj.buy,
				},
			});
		} else {
			const remainingItems = selectedValues.filter(
				(selectedItem) => selectedItem !== item,
			);
			const obj = {
				...currentSelected,
				[type]: remainingItems,
			};
			setCurrentSelected(obj);
			setGlobalSelected({
				0: {
					purchase_line_items : obj.pi,
					buy_line_items      : obj.buy,
				},
			});
		}
	};

	useEffect(() => {
		if (setGlobalSelected) {
			setGlobalSelected({
				0: {
					purchase_line_items : allCodes,
					buy_line_items      : buyCodes,
				},
			});
		}
	}, []);

	const handleFinalSubmit = async (values) => {
		const purchase_replica = getPurchaseReplica(
			data,
			globalSelected,
			purchaseInvoiceValues,
		);

		let finalMapping = mappingsFunc(
			data,
			globalSelected,
			purchaseInvoiceValues,
		);
		if (purchase_replica.length) {
			finalMapping = finalMapping.map((mapping) => ({
				...mapping,
				buy_line_items: purchase_replica,
			}));
		}

		const payload = values?.is_deviation_accepted
			? {
				mappings : finalMapping,
				id       : editData.finance_job_number || collectionPartyId,
				status   : 'locked',
				...(values || {}),
				billType : purchaseInvoiceValues?.billType || values?.billType,
			}
			: {
				mappings               : finalMapping,
				id                     : editData.finance_job_number || collectionPartyId,
				status                 : 'locked',
				exchange_rate_document : values?.exchange_rate_document,
				is_deviation_accepted  : values?.is_deviation_accepted,
				billType               : purchaseInvoiceValues?.billType || values?.billType,
			};

		await updateCp(payload);
	};

	return {
		handleFinalSubmit,
		handleChange,
		currentSelected,
		loading,
		isLockedMode,
	};
};

export default useHandleFinalSave;
