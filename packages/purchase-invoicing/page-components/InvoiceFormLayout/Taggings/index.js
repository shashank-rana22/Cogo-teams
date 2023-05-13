import { Modal, Tabs, TabPanel, Button, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import TagMap from '../../../common/Taggings/TagMap';

import styles from './styles.module.css';

function Taggings({
	showTagings,
	serviceProviderId,
	shipmentId,
	selectedProforma,
	setSelectedProforma,
	setShowTaggings,
}) {
	const TAGGING_TABS = [
		{ label: 'split', value: 'split', heading: 'Select a proforma you want to split ' },
		{ label: 'merge', value: 'merge', heading: 'Select More then one proforma you want to Merge' },
		{ label: 'normal', value: 'notTaggedIds', heading: 'Select a proforma you want to Tag ' },
	];

	const [activeTab, setActiveTab] = useState('split');

	const handleSave = () => {
		if (isEmpty(selectedProforma)) {
			Toast.error('Please select one proforma to proceed');
			return;
		}
		if (activeTab === 'merge' && selectedProforma?.length < 2) {
			Toast.error('Please select Morethan one proforma to proceed');
			return;
		}
		setShowTaggings(false);
	};

	return (
		<div>
			<Modal
				size="fullscreen"
				show={showTagings}
				placement="center"
				className={styles.modal_container}
				onClose={() => {
					setSelectedProforma([]);
					setShowTaggings(false);
				}}
			>
				<Modal.Header title={(
					<div className={styles.heading}>
						Tag This Purchase Invoice with Proforma Invoice
					</div>
				)}
				/>
				<div className={styles.padding}>
					{showTagings && (
						<Tabs
							activeTab={activeTab}
							themeType="tertiary"
							onChange={(val) => {
								setActiveTab(val);
								setSelectedProforma([]);
							}}
						>
							{(TAGGING_TABS || []).map(({ value, label }) => (
								<TabPanel key={value} name={value} title={label}>
									<TagMap
										serviceProviderId={serviceProviderId}
										shipmentId={shipmentId}
										isNormalTab={value === 'notTaggedIds'}
										selectedProforma={selectedProforma}
										setSelectedProforma={setSelectedProforma}
										activeTab={value}
										showCheck
										key={value}
									/>
								</TabPanel>
							))}
						</Tabs>
					)}
				</div>
				<Modal.Footer>
					<div className={styles.buttoncontainer}>
						<Button
							className={`${styles.cancel}`}
							onClick={() => {
								setSelectedProforma([]);
								setShowTaggings(false);
							}}
							themeType="secondary"
						>
							Cancel
						</Button>
						<Button
							className={styles.button}
							onClick={handleSave}
						>
							Save Taggings
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Taggings;
