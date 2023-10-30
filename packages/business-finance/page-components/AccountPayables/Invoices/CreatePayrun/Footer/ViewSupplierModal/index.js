import { Button, Input, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import List from '../../../../../commons/List/index';
import SUPPLIER_CONFIG from '../../Configurations/supplierConfig.json';
import CN_CONFIG from '../../Configurations/viewCnConfig.json';

import GetTableBodyCheckbox from './GetTableBodyCheckbox';
import styles from './styles.module.css';
import { GetTableHeaderCheckbox, onChangeTableBodyCheckbox } from './SupplierCheckbox';

function RenderAccordianData({ singleitem = {} }) {
	return (
		<div className={styles.listdata}>
			<List itemData={{ list: singleitem?.creditNotes }} config={CN_CONFIG} showPagination={false} />
		</div>
	);
}

const getFunctions = ({ setShowId = () => {}, showId = '', apiData = {}, setApiData = () => {} }) => ({
	renderCn: (itemData) => (
		<Button
			onClick={() => setShowId(itemData?.organizationId === showId ? null : itemData?.organizationId)}
			disabled={isEmpty(itemData?.creditNotes)}
		>
			{itemData?.organizationId === showId ? 'View Less' : 'View CN'}
		</Button>
	),
	renderCheckbox: (itemData) => (
		<GetTableBodyCheckbox
			itemData={itemData}
			onChangeTableBodyCheckbox={onChangeTableBodyCheckbox}
			apiData={apiData}
			setApiData={setApiData}
		/>
	),
});

function ViewSupplierModal({
	suppliers = {},
	viewSupplier = false,
	showViewSupplier = () => { },
	setApiData = () => {},
	setFilters = () => {},
	onExclude = () => {},
	loading = false,
}) {
	const [showId, setShowId] = useState(null);

	const renderHeaderCheckbox = () => GetTableHeaderCheckbox({ apiData: suppliers, loading, setApiData });

	const LIST_FUNCTIONS = getFunctions({
		setShowId,
		showId,
		onChangeTableBodyCheckbox,
		apiData: suppliers,
		setApiData,
	});

	const { list: dataList = [] } = suppliers || {};

	const disableExclude = dataList?.filter((item) => (item.checked));

	return (
		<Modal
			show={viewSupplier}
			onClose={() => showViewSupplier(false)}
			className={styles.modal_container}
			scroll
			size="lg"
		>
			<Modal.Body>
				<div className={styles.input}>
					<Input
						placeholder="Search By Supplier"
						onChange={(val) => { setFilters((p) => ({ ...p, search: val })); }}
					/>
				</div>
				<div className={styles.list}>
					<List
						itemData={suppliers}
						config={SUPPLIER_CONFIG}
						functions={LIST_FUNCTIONS}
						renderHeaderCheckbox={renderHeaderCheckbox}
						RenderAccordianData={RenderAccordianData}
						showId={showId}
						idKey="organizationId"
						rowStyle="border"
						showPagination
						paginationType="number"
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					className={styles.button}
					themeType="secondary"
					disabled={loading}
					onClick={() => showViewSupplier(false)}
				>
					Back
				</Button>
				<Button onClick={onExclude} disabled={loading || isEmpty(disableExclude)}>
					Exclude From Payrun
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ViewSupplierModal;
