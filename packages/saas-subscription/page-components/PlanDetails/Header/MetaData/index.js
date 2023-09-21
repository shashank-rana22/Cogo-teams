import { Button, Modal, Textarea } from '@cogoport/components';
import React, { useState } from 'react';

import usePlanMetaData from '../../../../hooks/usePlanMetaData';

import styles from './styles.module.css';

function MetaDataModal({ metaData, setMetaData }) {
	const [newMetaData, setNewMetaData] = useState(JSON.stringify(metaData?.info));

	const { loading, submitHandler, closeModalHandler } = usePlanMetaData({ metaData, setMetaData });

	return (
		<Modal show={metaData.open} onClose={closeModalHandler} closeOnOuterClick>
			<Modal.Header title="Meta Data" />

			<div className={styles.modal_body}>
				<Textarea
					value={newMetaData}
					onChange={setNewMetaData}
					rows={10}
				/>
			</div>

			<div className={styles.modal_footer}>
				<Button
					className={styles.cancel_btn}
					disabled={loading}
					themeType="secondary"
					onClick={closeModalHandler}
				>
					Cancel

				</Button>
				<Button
					themeType="accent"
					loading={loading}
					disabled={!newMetaData}
					onClick={() => submitHandler(newMetaData)}
				>
					Save

				</Button>
			</div>
		</Modal>
	);
}

export default MetaDataModal;
