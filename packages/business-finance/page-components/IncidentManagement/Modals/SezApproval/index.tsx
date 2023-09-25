import { Textarea, Modal, Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import useSezApproveReject from '../../apisModal/useSezApproveReject';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import styles from './styles.module.css';

interface SezInterface {
	name?: string,
	pincode?: number | string,
	taxNumber?: number | string,
	address?: string,
	documentUrls?: string[],
}

interface Org {
	businessName?: string,
	tradePartyType?: string,
}

interface Props {
	sezRequest?: SezInterface,
	id?: string,
	refetch?: () => void,
	organization?: Org,
	isEditable?: boolean,
	remark?: string,
	row?: object,
}

function SezApproval({
	sezRequest = {}, organization = {}, id = '', refetch = () => { },
	isEditable = true, remark = '', row = {},
}: Props) {
	console.log(row);
	const { t } = useTranslation(['incidentManagement']);
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		remarks: null,
	});
	const { name, pincode, taxNumber, address, documentUrls } = sezRequest || {};
	const { businessName: organizationName, tradePartyType = '' } = organization || {};

	const { useOnAction: OnAction, loading } = useSezApproveReject({
		refetch,
		setShowModal,
		id,
		sezRequest,
		t,
	});

	const details = [
		{ title: t('incidentManagement:org_name'), value: <div>{organizationName || ''}</div> },
		{
			title : t('incidentManagement:trade_party_type'),
			value : <div>{tradePartyType?.replaceAll('_', ' ') || ''}</div>,
		},
		{ title: t('incidentManagement:org_business_name_title'), value: <div>{name || ''}</div> },
		{ title: t('incidentManagement:org_bill_address_title'), value: <div>{address || ''}</div> },
		{ title: t('incidentManagement:org_pincode_title'), value: <div>{pincode || ''}</div> },
		{ title: t('incidentManagement:org_tax_no_title'), value: <div>{taxNumber || ''}</div> },
		{
			title : t('incidentManagement:docs'),
			value : (
				<div>
					{(documentUrls || []).map((item) => (
						<div key={item} className={styles.doc}>
							<a
								target="_blank"
								href={item}
								className={styles.file_link}
								rel="noreferrer"
							>
								{t('incidentManagement:view_doc_link')}
							</a>
							<div className={styles.eye}><IcMEyeopen fill="var(--color-accent-orange-2)" /></div>
						</div>
					))}
				</div>),
		},
	];

	const isDisabled = loading || !inputValues.remarks;

	useEffect(() => {
		if (!showModal) {
			setInputValues({
				remarks: null,
			});
		}
	}, [showModal]);

	return (
		<div>
			<div>
				<ViewButton state={setShowModal} />
			</div>
			{showModal && (
				<Modal
					size="lg"
					show={showModal}
					onClose={() => {
						setShowModal(false);
					}}
				>
					<Modal.Header title={t('incidentManagement:sez_approval_title')} />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						{details?.map((detail) => (
							<div key={detail.title} className={styles.flex}>
								<div className={styles.title}>
									{detail.title}
								</div>
								<div className={styles.divider}>
									:
								</div>
								<div className={styles.name}>
									<div>{detail.value}</div>
								</div>
							</div>
						))}

						<div>
							<div style={{ display: 'flex' }}>
								<div className={styles.input_titles}>{`${t('incidentManagement:remarks')}*`}</div>
								<span className={styles.divider}>:</span>
								<Textarea
									name="remark"
									size="sm"
									placeholder={t('incidentManagement:remarks_placeholder')}
									disabled={!isEditable}
									onChange={(value: string) => setInputValues({ ...inputValues, remarks: value })}
									value={remark}
									className={styles.text_area}
								/>
							</div>
						</div>

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									themeType="secondary"
									size="md"
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										OnAction({ inputValues, status: 'REJECTED' });
									}}
								>
									{t('incidentManagement:reject_btn')}
								</Button>
								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={isDisabled}
									onClick={() => {
										OnAction({ inputValues, status: 'APPROVED' });
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
export default SezApproval;
