import { Button, Modal, Textarea } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import usePlanMetaData from '../../../../hooks/usePlanMetaData';

import styles from './styles.module.css';

function MetaDataModal({ metaData, setMetaData }) {
	const { t } = useTranslation(['saasSubscription']);

	const jsonMetaData = JSON.stringify(metaData?.info);

	const [newMetaData, setNewMetaData] = useState(jsonMetaData);

	const { loading, submitHandler, closeModalHandler } = usePlanMetaData({ metaData, setMetaData });

	return (
		<Modal show={metaData.open} onClose={closeModalHandler} closeOnOuterClick>
			<Modal.Header title={t('saasSubscription:meta_data')} />

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
					{t('saasSubscription:cancel')}
				</Button>
				<Button
					themeType="accent"
					loading={loading}
					disabled={newMetaData === jsonMetaData}
					onClick={() => submitHandler(newMetaData)}
				>
					{t('saasSubscription:save')}
				</Button>
			</div>
		</Modal>
	);
}

export default MetaDataModal;
