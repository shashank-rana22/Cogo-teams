import { Textarea, Modal, Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import StakeHolderTimeline from '../../../StakeHolderTimeline';
import stakeHolderTimeLineData from '../../../utils/formatStakeHolderData';

import styles from './style.module.css';

const geo = getGeoConstants();

const customFormatAmount = (value) => (
	formatAmount({
		amount   :	value,
		currency : geo.country.currency.code,
		options  : {
			style           : 'currency',
			currencyDisplay : 'code',
		},
	})
);

function JobOpenModal({
	itemData = {},
	setRemarks = () => {},
	remarks = '',
	onSave = () => {},
	showModal = false,
	setShowModal = () => {},
	loadingOnSave = false,
}) {
	const { t } = useTranslation(['incidentManagement']);

	const {
		referenceId = '',
		data = {},
		status = '',
		level1 = {},
		level2 = {},
		level3 = {},
		userNotes = '',
	} = itemData || {};

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
			{/* <ViewButton state={setShowModal} /> */}
			<Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>
				View
			</Button>

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

						{(!isEmpty(level1) || !isEmpty(level2) || !isEmpty(level3)) && (
							<StakeHolderTimeline
								timeline={stakeHolderTimeLineData({ level1, level2, level3 })}
								isStatusPill={isStatus}
							/>
						)}

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
									{customFormatAmount(totalBuy)}
								</span>
							</div>

							<div className={styles.details}>
								{t('incidentManagement:total_sell_label')}

								<span className={styles.details_value}>
									{customFormatAmount(totalSell)}
								</span>
							</div>

							<div className={styles.details}>
								{t('incidentManagement:profit_margin_label')}

								<span className={styles.details_value}>
									{customFormatAmount(profitMargin)}
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
										<IcMEyeopen className={styles.icon} />
									</a>
								)) : (
									t('incidentManagement:no_doc_available')
								)}
						</div>
						<div className={styles.remarks_style}>
							Notes (only visible to self)
							<Textarea
								name="remarks"
								className={styles.text_area}
								size="lg"
								placeholder="Enter here..."
								onChange={(values) => setRemarks(values)}
								defaultValue={userNotes}
							/>
						</div>

					</Modal.Body>

					<Modal.Footer className={styles.modal_footer}>

						<Button
							disabled={!remarks || loadingOnSave}
							onClick={() => {
								onSave();
							}}
						>
							Save

						</Button>

					</Modal.Footer>

				</Modal>
			)}
		</div>
	);
}
export default JobOpenModal;
