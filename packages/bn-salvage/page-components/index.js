import { Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import tabs from '../config/tabs.json';
import useListBookingDocuments from '../hooks/useListBookingDocuments';

import Filters from './Filters';
import List from './List';
import Tabs from './Tabs';
import UploadBN from './UploadBN';

export default function BNSalvage() {
	const [activeTab, setActiveTab] = useState(tabs[0].name);
	const [filters, setFilters] = useState({ page: 1 });

	const {
		data,
		loading,
		refetchList,
	} = useListBookingDocuments({ filters, activeTab });

	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<h1>Booking Note Salvage</h1>

			<Tabs
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				setFilters={setFilters}
				stats={data.stats}
			/>

			<Filters filters={filters} setFilters={setFilters}>
				<Button
					key="upload_bn_btn"
					themeType="primary"
					onClick={() => setShowModal(true)}
				>
					<IcMUpload />
					&nbsp;
					Upload Booking Note
				</Button>
			</Filters>

			<List
				filters={filters}
				setFilters={setFilters}
				data={data}
				loading={loading}
				refetchList={refetchList}
			/>

			{showModal ? <UploadBN setShow={setShowModal} refetchList={refetchList} /> : null}
		</div>
	);
}
