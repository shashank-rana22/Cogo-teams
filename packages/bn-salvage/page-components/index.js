import { Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import tabs from '../config/tabs.json';

import Filters from './Filters';
import List from './List';
// import styles from './styles.module.css';
import Tabs from './Tabs';
import UploadBN from './UploadBN';

export default function BNSalvage() {
	const [activeTab, setActiveTab] = useState(tabs[0].name);
	const [filters, setFilters] = useState({ page: 1 });

	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<h1>Booking Note Salvage</h1>

			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} setFilters={setFilters} />

			<Filters filters={filters} setFilters={setFilters}>
				<Button key="upload_bn_btn" themeType="primary" onClick={() => setShowModal(true)}>
					<IcMUpload />
					&nbsp;
					Upload Booking Note
				</Button>
			</Filters>

			<List filters={filters} setFilters={setFilters} activeTab={activeTab} />

			{showModal ? <UploadBN setShow={setShowModal} /> : null}
		</div>
	);
}
