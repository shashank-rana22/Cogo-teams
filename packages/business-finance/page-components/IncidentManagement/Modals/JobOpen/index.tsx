import { Textarea, Modal, Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import usePostJobOpenRemark from '../../apisModal/usePostJobOpenRemark';
import ViewButton from '../../common/ViewButton';
import StakeHolderTimeline from '../../StakeHolderTimeline';
import stakeHolderTimeLineData from '../../utils/formatStakeHolderData';

import styles from './style.module.css';

const geo = getGeoConstants();

const STATUS = {
	approved : 'APPROVED',
	rejected : 'REJECTED',
};

function JobOpen({ id = '', refetch = () => {}, row = {} as any, isEditable = true }) {
	const { t } = useTranslation(['incidentManagement']);

	const [remarks, setRemarks] = useState('');
	const [showModal, setShowModal] = useState(false);

	const { onSubmit = () => {}, loading = false } = usePostJobOpenRemark({
		id,
		remarks,
		setShowModal,
		refetch,
	});

	const { referenceId = '', data = {}, status = '', level1 = {}, level2 = {}, level3 = {} } = row || {};

	const currency = geo.country.currency.code;

	const {
		documentUrls = [],
		jobNumber = '',
		remark = '',
		totalSell = '',
		totalBuy = '',
		profitMargin = '',
		customerName = '',
	} = data?.jobOpenRequest || {};

	const isStatus = {
		display : true,
		value   : status,
	};

	return (
		<div>
			<ViewButton state={setShowModal} />

			{showModal && (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header
						title={
							`${t('incidentManagement:shipment_re_open_request')} - SID ${jobNumber}: ${customerName}`
						}
					/>
					<Modal.Body>
						<div style={{ marginTop: '-28px' }}>
							{(!isEmpty(level1) || !isEmpty(level2) || !isEmpty(level3)) && (
								<StakeHolderTimeline
									timeline={stakeHolderTimeLineData({ level1, level2, level3 })}
									isStatusPill={isStatus}
								/>
							)}
						</div>

						<div className={styles.details_container}>
							<div className={styles.details}>
								{t('incidentManagement:shipment_id')}

								<span className={styles.details_value}>
									#
									{jobNumber || '--'}
								</span>
							</div>

							<div className={styles.details}>
								{t('incidentManagement:incident_id_header')}

								<span className={styles.details_value}>
									{referenceId || '--'}
								</span>
							</div>

							<div className={styles.details}>
								{t('incidentManagement:total_buy_label')}

								<span className={styles.details_value}>
									{formatAmount({
										amount  :	totalBuy,
										currency,
										options : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									})}
								</span>
							</div>

							<div className={styles.details}>
								{t('incidentManagement:total_sell_label')}

								<span className={styles.details_value}>
									{formatAmount({
										amount  :	totalSell,
										currency,
										options : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									})}
								</span>
							</div>

							<div className={styles.details}>
								{t('incidentManagement:profit_margin_label')}

								<span className={styles.details_value}>
									{formatAmount({
										amount  :	profitMargin,
										currency,
										options : {
											style           : 'currency',
											currencyDisplay : 'code',
										},
									})}
								</span>
							</div>
						</div>

						<div className={styles.remark}>
							<div className={styles.label}>
								{t('incidentManagement:remarks')}
							</div>
							{remark}
						</div>

						<div className={styles.document_container}>
							<div className={styles.label}>{`${t('incidentManagement:doc')} - `}</div>

							{!isEmpty(documentUrls)
								? (documentUrls || []).map((url: string) => (
									<a key={url} href={url} target="_blank" rel="noreferrer">
										{t('incidentManagement:view_doc_link')}
										<IcMEyeopen style={{ marginLeft: '4px' }} />
									</a>
								)) : (
									t('incidentManagement:no_doc_available')
								)}
						</div>

						{isEditable && (
							<>
								<div className={styles.label}>
									{`${t('incidentManagement:remarks')}*`}
								</div>

								<Textarea
									className={styles.textarea}
									name="remark"
									size="md"
									placeholder={t('incidentManagement:remarks_placeholder')}
									onChange={(value: string) => setRemarks(value)}
								/>
							</>
						) }

					</Modal.Body>

					{isEditable && (
						<Modal.Footer className={styles.modal_footer}>
							<Button
								size="md"
								themeType="secondary"
								disabled={isEmpty(remarks) || loading}
								loading={loading}
								onClick={() => onSubmit(STATUS.rejected)}
							>
								{t('incidentManagement:reject_btn')}
							</Button>

							<Button
								size="md"
								themeType="primary"
								disabled={isEmpty(remarks) || loading}
								loading={loading}
								onClick={() => onSubmit(STATUS.approved)}
							>
								{t('incidentManagement:approve_btn')}
							</Button>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default JobOpen;
