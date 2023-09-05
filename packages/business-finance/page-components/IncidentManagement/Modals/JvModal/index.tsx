import { Textarea, Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import useGetJvData from '../../apisModal/useGetJvData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

function JvModal({ journalVoucherRequest, id, refetch, isEditable = true, row }) {
	const { t } = useTranslation(['incidentManagement']);
	const [showJvModal, setShowJVModal] = useState(false);
	const [remark, setRemark] = useState('');
	const {
		currency,
		ledCurrency,
		amount,
		entityCode,
		type,
		category,
		exchangeRate,
		validityDate,
		tradePartyName,
		accMode,
		description,
	} = journalVoucherRequest || {};

	const getAllValidData = [
		{ id: '1', label: t('incidentManagement:entity_label'), value: entityCode },
		{ id: '2', label: t('incidentManagement:business_partner_label'), value: tradePartyName },
		{ id: '3', label: t('incidentManagement:jv_type'), value: type },
		{ id: '4', label: t('incidentManagement:jv_category'), value: category },
		{ id: '5', label: t('incidentManagement:jv_mode'), value: accMode },
	];

	const getAllData = [
		{ id: '1', label: t('incidentManagement:currency_label'), value: currency },
		{ id: '2', label: t('incidentManagement:amount_label'), value: amount.toFixed(2) },
		{ id: '3', label: t('incidentManagement:exchange_rate_label'), value: exchangeRate },
		{ id: '4', label: t('incidentManagement:ledger_currency_label'), value: ledCurrency },
		{
			id    : '5',
			label : t('incidentManagement:validity_date_label'),
			value : formatDate({
				date       : new Date(validityDate),
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) || '___',
		},
	];

	const { useOnAction:OnAction, loading } = useGetJvData({
		refetch,
		setShowJVModal,
		id,
		journalVoucherRequest,
		remark,
		t,
	});

	return (
		<div>
			<div>
				<ViewButton state={setShowJVModal} />
			</div>
			{showJvModal && (
				<Modal
					size="lg"
					show={showJvModal}
					onClose={() => {
						setShowJVModal(false);
					}}
				>
					<Modal.Header title={t('incidentManagement:journal_voucher_label')} />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.flex}>
							{getAllValidData.map((item) => (
								<div className={styles.value_data} key={item?.id}>
									<div className={styles.label_value}>
										{item?.label || '-'}
									</div>
									<div className={styles.date_value}>

										{startCase(item?.value) || '-'}

									</div>
								</div>
							))}
						</div>

						<div className={styles.border} />

						<div className={styles.flex}>
							{getAllData.map((item) => (
								<div className={styles.value_data} key={item?.id}>
									<div className={styles.label_value}>
										{item?.label || '-'}
									</div>
									<div className={styles.date_value}>
										{ item?.label === t('incidentManagement:amount_label')
										|| item?.label === t('incidentManagement:exchange_rate_label')
											? item?.value : startCase(item?.value)}
									</div>
								</div>
							))}
						</div>

						<div className={styles.document_flex}>
							<div className={styles.document}>{`${t('incidentManagement:remark_title')} -`}</div>
							<div>{description}</div>
						</div>

						{isEditable && (
							<>
								<div className={styles.remarks}>{`${t('incidentManagement:remarks')}*`}</div>

								<Textarea
									name="remark"
									size="md"
									placeholder={t('incidentManagement:remarks_placeholder')}
									onChange={(value: string) => setRemark(value)}
									style={{ width: '700', height: '100px', marginBottom: '12px' }}
								/>
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
export default JvModal;
