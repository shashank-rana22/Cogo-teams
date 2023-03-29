/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import useGetHawb from '../Helpers/hooks/useGetHawb';

interface Props {
	edit?: boolean | String;
	setGenerate?:Function;
	setEdit?:Function;
	activeCategory?: String;
	hawbDetails?: Array<any>;
	setHawbDetails?: Function;
	setActiveHawb?: Function;
	setActiveKey?: Function;
	handleClick?: Function;
	result?: object;
	setResult?: Function;
	getHawb?: Function;
	activeHawb?: object;
}

const useCreateShipmentDocument = ({
	edit = false,
	setGenerate = () => {},
	setEdit = () => {},
	activeCategory = '',
	hawbDetails = [],
	setHawbDetails = () => {},
	setActiveHawb = () => {},
	setActiveKey = () => {},
	// handleClick = () => {},
	activeHawb = {},
}:Props) => {
	let api = 'create_shipment_document';
	if (edit) api = 'update_shipment_document';

	const [success, setSuccess] = useState(false);

	const [{ loading }, trigger] = useRequest({
		url    : `${api}`,
		method : 'POST',
	});

	const { hawbData, getHawb, hawbSuccess, setHawbSuccess } = useGetHawb();

	useEffect(() => {
		if (hawbSuccess) {
			const updatedDetails = (hawbDetails || []).map((item:any) => {
				if (item.id === activeHawb) {
					return { ...item, id: hawbData?.data?.id, isNew: false };
				}
				return item;
			});
			setHawbDetails(updatedDetails);
			setSuccess(true);
			setHawbSuccess(false);
		}
	}, [hawbSuccess]);

	useEffect(() => {
		if (success) {
			// handleClick();
			setActiveHawb(hawbDetails[hawbDetails.length - 1].id);
			setActiveKey('basic');
			setSuccess(false);
		}
	}, [success]);

	const upload = async ({ payload }) => {
		try {
			const res = await trigger({
				data: payload,
			});
			Toast.success('Document saved successfully');
			if (activeCategory === 'mawb') {
				setGenerate(false);
				setEdit(false);
			} else {
				setHawbDetails([...hawbDetails, { id: new Date().getTime(), isNew: true }]);
				getHawb(res.data.ids[0]);
			}
		} catch (error) {
			Toast.error(error?.response?.data?.message || error?.message || 'Failed to save Document');
		}
	};

	return {
		upload,
		loading,
	};
};

export default useCreateShipmentDocument;
