import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import useGetHawb from '../Helpers/hooks/useGetHawb';

interface NestedObj {
	[key: string]: string | number | boolean;
}

interface Props {
	edit?: boolean | string;
	setGenerate?:Function;
	setEdit?:Function;
	activeCategory?: string;
	hawbDetails?: Array<string>;
	setHawbDetails?: Function;
	setActiveHawb?: Function;
	setActiveKey?: Function;
	handleClick?: Function;
	getHawb?: Function;
	activeHawb?: NestedObj;
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
	handleClick = () => {},
	activeHawb = {},
}:Props) => {
	let url = '/air-coe/documents/create-shipment-document';
	let authKey = 'post_air_coe_documents_create_shipment_document';

	if ((activeCategory === 'hawb' && activeHawb.isNew === false) || (edit && activeCategory === 'mawb')) {
		url = '/air-coe/documents/update-shipment-document';
		authKey = 'post_air_coe_documents_update_shipment_document';
	}

	const [success, setSuccess] = useState(false);

	const [{ loading }, trigger] = useRequestAir({
		url,
		method: 'POST',
		authKey,
	});

	const { hawbData, getHawb, hawbSuccess, setHawbSuccess } = useGetHawb();

	useEffect(() => {
		if (hawbSuccess) {
			const updatedDetails = (hawbDetails || []).map((item:any) => {
				if (item.id === activeHawb.id) {
					return {
						...item,
						id         : hawbData?.data?.id,
						documentNo : hawbData?.data?.data?.document_number,
						isNew      : false,
					};
				}
				return item;
			});
			setHawbDetails(updatedDetails);
			setSuccess(true);
			setHawbSuccess(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hawbSuccess]);

	useEffect(() => {
		if (success) {
			setActiveHawb(hawbDetails[hawbDetails.length - 1]);
			setActiveKey('basic');
			setSuccess(false);
			handleClick();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
				if (!edit) { setHawbDetails([...hawbDetails, { id: uuid(), documentNo: null, isNew: true }]); }
				getHawb(!activeHawb.isNew ? res?.data?.id : res?.data?.ids?.[0]);
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
