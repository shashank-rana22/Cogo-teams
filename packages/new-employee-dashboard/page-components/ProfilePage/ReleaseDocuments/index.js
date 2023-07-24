import { RadioGroup, Button, Modal } from '@cogoport/components';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import React from 'react';

import StyledTable from '../../StyledTable';

import styles from './styles.module.css';
import useReleaseDocuments from './useReleaseDocuments';

const COMPANY_POLICIES_OPTIONS = [
	{ name: 'yes', value: 'Yes', label: 'Yes' },
	{ name: 'no', value: 'No', label: 'No' },
];

function ReleaseDocuments({
	profileData = {},
	getEmployeeDetails = () => {},
}) {
	const profile = useSelector((state) => state.profile);

	const dispatch = useDispatch();

	const {
		columns,
		signedDocumentList,
		setCompanyPolicyValue,
		share_company_policies,
		loading,
		updateEmployeeStatus,
		additionalClause,
		setAdditionalClause,
		BodyTextEditor,
		editorValue,
		setEditorValue,
		RichTextEditor,
	} = useReleaseDocuments({
		profileData,
		getEmployeeDetails,
	});

	const onClickSaveAdditionalClause = () => {
		const { detail } = profileData || {};
		const { id = '' } = detail || {};

		dispatch(
			setProfileState({
				...profile,
				additional_clause: {
					...profile?.additional_clause,
					[id]: editorValue.toString('html'),
				},
			}),
		);

		setAdditionalClause('');
	};

	return (
		<div className={styles.container}>
			<StyledTable columns={columns} data={signedDocumentList} />

			<div className={styles.share_company_policies}>
				<div className={styles.text_container}>
					Share company policies?
				</div>
				<RadioGroup
					options={COMPANY_POLICIES_OPTIONS}
					onChange={setCompanyPolicyValue}
					value={(share_company_policies) ? 'Yes' : 'No'}
				/>
				<div className={styles.styled_button}>
					<Button loading={loading} onClick={() => updateEmployeeStatus()}>
						Save
					</Button>
				</div>
			</div>

			<Modal
				size="lg"
				show={additionalClause}
				onClose={() => setAdditionalClause('')}
			>
				<Modal.Header title={`Add additional Clause to the ${additionalClause}`} />
				<Modal.Body>
					<BodyTextEditor
						editorValue={editorValue}
						setEditorValue={setEditorValue}
						RichTextEditor={RichTextEditor}
					/>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.modal_footer}>
						*NOTE: Please do not refresh or change tabs after entering
						additional clause and sending employee agreement

						<Button
							onClick={onClickSaveAdditionalClause}
							style={{ marginLeft: 12 }}
						>
							SAVE
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ReleaseDocuments;
