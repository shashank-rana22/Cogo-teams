import { Button, Modal, Textarea, Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useUpdatePlanData from '../../../../hooks/useUpdatePlanData';

import styles from './styles.module.css';

function MetaDataModal({ metaData, setMetaData, setFeatureModal }) {
	const { t } = useTranslation(['saasSubscription']);

	const jsonMetaData = JSON.stringify(metaData?.info);

	const [newMetaData, setNewMetaData] = useState(jsonMetaData);

	const { loading, submitHandler } = useUpdatePlanData();

	const closeModalHandler = () => {
		setMetaData({ open: false });
	};

	const formSubmitHandler = async (data) => {
		try {
			const validJson = JSON.parse(data);
			await submitHandler({ payload: { id: metaData?.id, metadata: validJson } });

			Toast.success(t('saasSubscription:update_meta_data'));
			setFeatureModal({ apiCall: true });
			closeModalHandler();
		} catch (e) {
			Toast.error(t('saasSubscription:valid_json'));
		}
	};

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
					onClick={() => formSubmitHandler(newMetaData)}
				>
					{t('saasSubscription:save')}
				</Button>
			</div>
		</Modal>
	);
}

export default MetaDataModal;
