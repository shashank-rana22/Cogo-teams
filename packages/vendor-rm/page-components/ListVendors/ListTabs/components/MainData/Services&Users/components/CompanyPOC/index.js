import { Modal, Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import FormLayout from '../../../../../../../../commons/components/FormLayout/FormLayout';
import getPocRole from '../../utils/getPocRole';

import useEditPoc from './hooks/useEditPoc';
import styles from './styles.module.css';

const labelMapping = {
	name           : 'Name',
	email          : 'Email ID',
	mobile_number  : 'Mobile Number',
	poc_role       : 'Role in the Company',
	document_proof : 'Document Proof',
};

function CompanyPOC({
	data,
	refetchVendorInfo = () => {},
}) {
	const details = (data?.pocs || []).map((poc) => {
		const obj = {
			name           : poc?.name,
			email          : poc?.email,
			mobile_number  : `${poc?.mobile_country_code} ${poc?.mobile_number}`,
			poc_role       : poc?.poc_role,
			is_primary     : poc?.is_primary,
			document_proof : (
				<div className={styles.download}>
					<a
						href={poc.contact_proof_url}
						target="_blank"
						className={styles.link}
						style={{
							color: '#F68B21',
						}}
						rel="noreferrer"
					>
						{poc.contact_proof_url}
					</a>
					<div>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/download-icon.svg"
							alt="icon"
						/>
					</div>
				</div>
			),
		};

		return obj;
	}).find((poc_detail) => poc_detail.is_primary === true);

	const {
		control,
		controls,
		handleSubmit,
		errors,
		loading,
		onSubmit,
		showEditPocModal,
		setShowEditPocModal,
	} = useEditPoc({ data, refetchVendorInfo });

	if (isEmpty(details)) {
		return null;
	}

	return (
		<div className={styles.main}>
			<span className={styles.heading}>
				Company POC
			</span>

			<div className={styles.content}>
				<div className={styles.box_info}>
					{Object.keys(details || []).map((poc) => (
						<div className={styles.label_value_container}>
							<div className={styles.top}>
								{labelMapping[poc]}
							</div>

							<div className={styles.bottom}>
								{poc === 'poc_role' ? getPocRole(details[poc]) : details[poc]}
							</div>
						</div>
					))}

					<div
						className={styles.edit_button}
						role="presentation"
						onClick={() => setShowEditPocModal(!showEditPocModal)}
					>
						<IcMEdit height={16} width={16} style={{ marginRight: '4px' }} />
					</div>
				</div>
			</div>

			{showEditPocModal ? (
				<Modal
					show={showEditPocModal}
					size="lg"
					onClose={() => setShowEditPocModal(false)}
				>
					<Modal.Header title="Edit POC Details" />

					<Modal.Body>
						<section
							className={styles.bodyStyle}
						>
							<FormLayout
								control={control}
								fields={controls}
								errors={errors}
							/>
						</section>
					</Modal.Body>

					<Modal.Footer>
						<Button
							size="md"
							type="button"
							style={{ marginRight: 10 }}
							themeType="secondary"
							disabled={loading}
							onClick={() => {
								setShowEditPocModal(false);
							}}
						>
							Cancel
						</Button>

						<Button
							size="md"
							type="submit"
							loading={loading}
							onClick={handleSubmit(onSubmit)}
						>
							submit
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}

			<hr className={styles.dis} />
		</div>
	);
}

export default CompanyPOC;
