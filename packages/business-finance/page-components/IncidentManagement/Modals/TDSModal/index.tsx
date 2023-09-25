import { Textarea, Modal, Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useGetTdsData from '../../apisModal/useGetTdsData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';
import { toTitleCase } from './utils';

function TDSModal({ tdsData, id, refetch, row, isEditable = true }) {
	console.log(row, tdsData);
	const { t } = useTranslation(['incidentManagement']);
	const [showTdsModal, setShowTdsModal] = useState(false);
	const [remark, setRemark] = useState('');
	const { data = {} } = row || {};
	const { organization = '' } = data || {};

	const tdsTradePartyName = data?.tdsRequest && organization?.tradePartyType;
	const {
		currentTdsRate, requestedTdsRate,
		validFrom, validTo, documentUrls, currentTdsStyle, requestedTdsStyle,
	} = tdsData;

	const getRatePercentageData = [
		{ label: t('incidentManagement:current_tds_rate'), value: currentTdsRate },
		{ label: t('incidentManagement:requested_tds_rate'), value: requestedTdsRate },
	];
	const getAllValidData = [
		{ id: '1', label: t('incidentManagement:valid_data_from'), value: validFrom },
		{ id: '2', label: t('incidentManagement:valid_data_till'), value: validTo },
		{ id: '3', label: t('incidentManagement:current_tds_style'), value: currentTdsStyle },
		{ id: '4', label: t('incidentManagement:requested_tds_style'), value: requestedTdsStyle },
	];

	const { useOnAction:OnAction, loading } = useGetTdsData({
		refetch,
		setShowTdsModal,
		id,
		row,
		remark,
		t,
	});

	return (
		<div>
			<div>
				<ViewButton state={setShowTdsModal} />
			</div>
			{showTdsModal && (
				<Modal
					size="lg"
					show={showTdsModal}
					onClose={() => {
						setShowTdsModal(false);
					}}
				>
					<Modal.Header title={t('incidentManagement:tds_deviation')} />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.flex}>
							<div className={styles.org_name}>
								{`${t('incidentManagement:org_name')} -`}
								{' '}
							</div>
							<div className={styles.name}>
								{tdsTradePartyName ? (
									<div>
										{organization?.tradePartyName || '-'
										|| toTitleCase(organization?.businessName) || '-'}

									</div>
								) : (
									<div>{toTitleCase(organization?.businessName) || '-'}</div>
								)}
							</div>
						</div>
						<div className={styles.flex}>
							{getRatePercentageData.map((itemData) => (
								<div className={styles.rates_data} key={itemData?.label}>
									<div className={styles.rates}>
										{itemData?.value || '-'}
										%
									</div>
									<div className={styles.label}>{itemData?.label || '-'}</div>
								</div>
							))}
						</div>
						<div className={styles.flex}>
							{getAllValidData.map((item) => (
								<div className={styles.value_data} key={item?.id}>
									<div className={styles.label_value}>
										{item?.label || '-'}
									</div>
									<div className={styles.date_value}>
										{(item?.id === '1' || item?.id === '2')
											? item?.value || '-'
											: startCase(item?.value) || '-'}

									</div>
								</div>
							))}
						</div>
						<div className={styles.document_flex}>
							<div className={styles.document}>{`${t('incidentManagement:doc')} -`}</div>
							{documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer" key={url}>
									<div className={styles.view_flex}>
										<div className={styles.view}>
											{`${t('incidentManagement:view_doc_link')}`}
										</div>
										<IcMEyeopen
											fill="#f68b21"
										/>
									</div>
								</a>
							) : (
								<div key={url}>
									{' '}
									{`${t('incidentManagement:no_doc_available')} -`}
								</div>
							)))}
						</div>
						{isEditable && (
							<>
								<div className={styles.remarks}>{`${t('incidentManagement:remarks')}*`}</div>
								<div className={styles.text_area}>
									<Textarea
										name="remark"
										size="md"
										placeholder={t('incidentManagement:remarks_placeholder') || ''}
										onChange={(value: string) => setRemark(value)}
										style={{ height: '80px', marginBottom: '12px' }}
									/>
								</div>
							</>
						) }

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									loading={loading}
									onClick={() => {
										OnAction('REJECTED');
									}}
								>
									{t('incidentManagement:reject_btn')}
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(remark.length) || loading}
									loading={loading}
									onClick={() => {
										OnAction('APPROVED');
									}}
								>
									{t('incidentManagement:approve_btn')}
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default TDSModal;
