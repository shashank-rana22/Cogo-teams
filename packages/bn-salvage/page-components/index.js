import { Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { useState, useMemo } from 'react';

import tabs from '../config/tabs.json';
import { BNSalvageContext } from '../context/BNSalvageContext';
import useListBookingDocuments from '../hooks/useListBookingDocuments';

import Filters from './Filters';
import List from './List';
import Tabs from './Tabs';
import UploadBN from './UploadBN';

export default function BNSalvage() {
	const [activeTab, setActiveTab] = useState(tabs[0].name);
	const [filters, setFilters] = useState({ page: 1 });
	const [showModal, setShowModal] = useState(false);

	const closeModal = () => setShowModal(false);

	const {
		data,
		loading,
		refetchList,
	} = useListBookingDocuments({ filters, activeTab });

	const contextValue = useMemo(() => ({
		activeTab,
		setActiveTab,
		filters,
		setFilters,
		showModal,
		setShowModal,
		closeModal,
		refetchList,
		listLoading : loading,
		listData    : data,
	}), [activeTab, data, filters, loading, refetchList, showModal]);

	return (
		<BNSalvageContext.Provider value={contextValue}>
			<h1>Booking Note Salvage</h1>

			<Tabs />

			<Filters>
				<Button
					key="upload_bn_btn"
					themeType="primary"
					onClick={() => setShowModal('upload_bn')}
				>
					<IcMUpload />
					&nbsp;
					Upload Booking Note
				</Button>
			</Filters>

			<List />

			{showModal === 'upload_bn' ? <UploadBN /> : null}
		</BNSalvageContext.Provider>
	);
}
