import { Tooltip, Textarea, Modal, Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import usePostExpense from '../../apisModal/usePostExpense';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';
import StakeHolderTimeline from '../../StakeHolderTimeline';
import StyledTable from '../../StyledTable';
import stakeHolderTimeLineData from '../../utils/formatStakeHolderData';
import mappingNonRecurring from '../../utils/mappingNonRecurring';
import { toTitleCase } from '../../utils/titleCase';

import { getOverHeadConfigs } from './overheadsConfig';
import styles from './style.module.css';

const DEFAULT_MAX_LENGTH = 40;

function NonRecuringModal({
	id = '',
	refetch = () => {},
	row = {},
	isEditable = true,
}: any) {
	const { t } = useTranslation(['incidentManagement']);
	const [showModal, setShowModal] = useState(false);
	const [remarks, setRemarks] = useState('');
	const { data = {}, level3, level2, level1 } = row || {};
	const {
		overheadConfirmationRequest,
		organization,
		referenceId = '',
	} = data;
	const {
		lineItems,
		remarks: remarkData,
		documents,
		expenseType,
	} = overheadConfirmationRequest || {};

	const { useOnAction: onAction, loading } = usePostExpense({
		refetch,
		setShowModal,
		id,
		remark: remarks,
		t,
	});

	const { businessName } = organization || {};

	const { INCIDENT_MAPPING = [] } = mappingNonRecurring({
		overheadConfirmationRequest,
	});

	return (
		<div>
			<div>
				<ViewButton state={setShowModal} />
			</div>

			<Modal
				size="lg"
				show={showModal}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header
					title={`${t('incidentManagement:expense_approval')} -  ${toTitleCase(
						businessName,
					)} (${toTitleCase(startCase(expenseType))}) ${referenceId}`}
				/>
				<Modal.Body>
					{!isEditable && <ApproveAndReject row={row} />}
					{
							(!isEmpty(level1) || !isEmpty(level2) || !isEmpty(level3)) && (
								<StakeHolderTimeline timeline={stakeHolderTimeLineData({ level1, level2, level3 })} />
							)
						}

					<div className={styles.flex}>
						{INCIDENT_MAPPING?.map((item) => (
							<div className={styles.value_data} key={item.key}>
								<div className={styles.label_value}>
									{item?.key || '-'}
								</div>
								<div className={styles.date_value}>
									{item?.value || '-'}
								</div>
							</div>
						))}
					</div>

					<div className={styles.document_flex}>
						<div className={styles.document}>{`${t('incidentManagement:remarks')} -`}</div>
						{remarkData?.length > DEFAULT_MAX_LENGTH ? (
							<Tooltip
								className={styles.tooltip}
								interactive
								content={remarkData || '-'}
							>
								<div className={styles.wrapper}>
									{remarkData || '-'}
								</div>
							</Tooltip>
						) : (
							remarkData || '-'
						)}
					</div>

					<div className={styles.document_flex}>
						<div className={styles.document}>{`${t('incidentManagement:doc')} -`}</div>
						{(documents || []).map((url: any) => (url !== '' ? (
							<a
								href={url}
								target="_blank"
								rel="noreferrer"
								key={url}
							>
								<div className={styles.view_flex}>
									<div className={styles.view}>
										{t('incidentManagement:view_doc_link')}
									</div>
									<div>
										<IcMEyeopen />
									</div>
								</div>
							</a>
						) : (
							<div key={url}>
								{' '}
								{t('incidentManagement:no_doc_available')}
							</div>
						)))}
					</div>
					{!isEmpty(lineItems) ? (
						<div className={styles.list_container}>
							<StyledTable
								columns={getOverHeadConfigs({ t })}
								showPagination={false}
								data={lineItems}
							/>
						</div>
					) : (
						<div className={styles.line_item_empty}>
							{t('incidentManagement:no_line_items_available')}
						</div>
					)}
					{isEditable && (
						<>
							<div className={styles.remarks}>{`${t('incidentManagement:remarks')}*`}</div>

							<Textarea
								name="remark"
								size="md"
								placeholder={t('incidentManagement:remarks_placeholder')}
								onChange={(value: string) => setRemarks(value)}
								style={{
									width        : '700',
									height       : '100px',
									marginBottom : '12px',
								}}
							/>
						</>
					)}

				</Modal.Body>
				{isEditable && (
					<Modal.Footer>
						<div className={styles.button}>
							<Button
								size="md"
								themeType="secondary"
								style={{ marginRight: '8px' }}
								disabled={!remarks.length || loading}
								loading={loading}
								onClick={() => {
									onAction('REJECTED');
								}}
							>
								{t('incidentManagement:reject_btn')}
							</Button>

							<Button
								size="md"
								style={{ marginRight: '8px' }}
								disabled={!remarks.length || loading}
								loading={loading}
								onClick={() => {
									onAction('APPROVED');
								}}
							>
								{t('incidentManagement:approve_btn')}
							</Button>
						</div>
					</Modal.Footer>
				)}
			</Modal>
		</div>
	);
}
export default NonRecuringModal;
