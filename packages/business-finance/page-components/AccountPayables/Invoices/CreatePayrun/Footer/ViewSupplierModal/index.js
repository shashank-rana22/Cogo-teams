import { Button, Input, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import List from '../../../../../commons/List/index.tsx';
import useDeleteExcludePayrun from '../../../hooks/useDeleteExcludePayrun';
import { SUPPLIER_CONFIG } from '../../Configurations/supplierConfig';
import { CN_CONFIG } from '../../Configurations/viewCnConfig';

import styles from './styles.module.css';

function RenderAccordianData(item) {
	return (
		<div className={styles.listdata}>
			<List itemData={{ list: item?.creditNotes }} config={CN_CONFIG} showPagination={false} />
		</div>
	);
}

const getFunctions = ({ setShowId, showId, getTableBodyCheckbox }) => ({
	renderCn: (itemData) => (
		<Button
			onClick={() => setShowId(itemData?.organizationId === showId ? null : itemData?.organizationId)}
			disabled={isEmpty(itemData?.creditNotes)}
		>
			{itemData?.organizationId === showId ? 'View Less' : 'View CN'}
		</Button>
	),
	renderCheckbox: (itemData) => getTableBodyCheckbox(itemData),
});

function ViewSupplierModal({
	suppliers,
	viewSupplier,
	showViewSupplier,
	refetch = () => { },
	setApiData,
	setFilters,
}) {
	const [showId, setShowId] = useState(null);
	const {
		onExclude,
		loading,
		getTableHeaderCheckbox,
		getTableBodyCheckbox,
	} = useDeleteExcludePayrun({ refetch, setApiData, apiData: suppliers });

	const FUNCTIONS = getFunctions({ setShowId, showId, getTableBodyCheckbox });

	const { list: dataList = [] } = suppliers || {};

	const disableExclude = dataList.filter((item) => (item.checked));

	return (
		<div>
			<Modal
				show={viewSupplier}
				onClose={() => showViewSupplier(false)}
				className={styles.modal_container}
				scroll
				size="lg"
			>
				<Modal.Header />
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
							functions={FUNCTIONS}
							renderHeaderCheckbox={getTableHeaderCheckbox}
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
		</div>

	);
}

export default ViewSupplierModal;
