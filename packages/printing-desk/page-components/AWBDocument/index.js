import ChargeDetails from '@cogoport/air-modules/components/AWBTemplate/ChargeDetails/index.tsx';
import ContainerDetails from '@cogoport/air-modules/components/AWBTemplate/ContainerDetails/index.tsx';
import ShipmentDetails from '@cogoport/air-modules/components/AWBTemplate/ShipmentDetails/index.tsx';
import ShipperConsigneeDetails from '@cogoport/air-modules/components/AWBTemplate/ShipperConsigneeDetails/index.tsx';
import { cl } from '@cogoport/components';
import React, { createRef, useState } from 'react';

import Modal from '../../common/Modal';
import { FOOTER_VALUES } from '../../constants/footer-values';

import DownloadDocumentContainer from './DownloadDocumentContainer';
import SaveDocumentContainer from './SaveDocumentContainer';
import styles from './styles.module.css';

function AWBDocument({
	item = {},
	viewDoc = false,
	formData = {},
	setViewDoc = () => {},
	edit = false,
	setEdit = () => {},
	setItem = () => {},
	listAPI = () => {},
	back = false,
	setBack = () => {},
}) {
	const [whiteout, setWhiteout] = useState(false);
	const [saveDocument, setSaveDocument] = useState(false);

	const ref = createRef(null);

	const { documentData } = item || {};

	const taskItem = {
		...item,
		...documentData,
		...formData,
	};

	const { documentType = 'mawb' } = taskItem;

	const category = documentType === 'draft_airway_bill' ? 'mawb' : 'hawb';

	let agentCharge = 0;
	taskItem?.agentOtherCharges?.forEach((itm) => {
		agentCharge += Number(itm.price);
	});
	let carrierCharge = 0;
	taskItem?.carrierOtherCharges?.forEach((itm) => {
		carrierCharge += Number(itm.price);
	});
	const chargeData = {
		totalCharge: Number(taskItem.amount),
		agentCharge,
		carrierCharge,
		finalCharge:
		Number(taskItem.amount) + agentCharge + carrierCharge,
	};

	return (
		<div className={styles.file_container}>
			{(back || viewDoc) && (
				<Modal
					onClose={() => { setBack(false); setViewDoc(false); }}
					style={{ width: '900px', height: '92vh' }}
				>
					<div className={styles.flex_col}>
						{viewDoc && (
							<DownloadDocumentContainer
								whiteout={whiteout}
								setWhiteout={setWhiteout}
								saveDocument={saveDocument}
								setSaveDocument={setSaveDocument}
								setEdit={setEdit}
								category={category}
								taskItem={taskItem}
								setViewDoc={setViewDoc}
								setItem={setItem}
							/>
						)}
						<div
							className={cl`${styles.flex_col} ${styles.document}`}
							id="awb"
							ref={ref}
						>
							<div style={{ position: 'relative' }}>
								<ShipperConsigneeDetails
									formData={taskItem}
									taskItem={taskItem}
									whiteout={whiteout}
									activeCategory={category}
									edit={edit}
									viewDoc={viewDoc}
								/>
								<ShipmentDetails
									formData={taskItem}
									whiteout={whiteout}
									taskItem={taskItem}
								/>
								<ContainerDetails
									formData={taskItem}
									chargeableWeight={taskItem?.chargeableWeight}
									whiteout={whiteout}
								/>
								<ChargeDetails
									taskItem={taskItem}
									footerValues={FOOTER_VALUES}
									data={chargeData}
									formData={taskItem}
									whiteout={whiteout}
									activeCategory={category}
									edit={edit}
									viewDoc={viewDoc}
								/>
							</div>
						</div>

						{!viewDoc && (
							<SaveDocumentContainer
								back={back}
								edit={edit}
								setBack={setBack}
								setViewDoc={setViewDoc}
								saveDocument={saveDocument}
								setSaveDocument={setSaveDocument}
								category={category}
								taskItem={taskItem}
								formData={formData}
								listAPI={listAPI}
								setEdit={setEdit}
							/>
						)}
					</div>
				</Modal>
			)}
		</div>
	);
}

export default AWBDocument;
