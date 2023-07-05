import { Button, Popover } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import CommonLoader from '../../../../common/Loader';
import PreviewDocumet from '../../../../common/PreviewDocumet';
import useUpdateEmployeeDocuments from '../../../hooks/useUpdateEmployeeDocuments';
import RejectPopoverContent from '../RejectPopoverContent';

import styles from './styles.module.css';

const IDENTIFICATION_DOCUMENT_EXCLUSION_LIST = ['resume'];

function IdentificationDocuments({ mainApiLoading, profileData, getEmployeeDetails, getEmployeeDetailsLoading }) {
	const { documents } = profileData || {};

	const {
		onClickApproveButton, showRejectPopover, onClickSubmitButton,
		inputValue,
		setInputValue,
		setShowRejectPopover = () => {},
		loading,
	} = useUpdateEmployeeDocuments({ getEmployeeDetails });

	if (getEmployeeDetailsLoading) return <CommonLoader />;

	if (isEmpty(documents)) {
		return <EmptyState emptyText="Identification documents not found" />;
	}

	return (
		<div className={styles.container}>
			{(documents || []).map((doc) => {
				const { document_type, document_url, id, status } = doc || {};
				if (IDENTIFICATION_DOCUMENT_EXCLUSION_LIST.includes(document_type)) {
					return null;
				}

				return (
					<div className={styles.card_wrapper} key={id}>
						<div className={styles.tick_content}>
							<div className={styles.header}>{startCase(document_type)}</div>
							{['rejected', 'approved'].includes(status) ? (
								<div
									className={styles.verified_text}
									style={{ backgroundColor: status === 'approved' ? '#c4dc91' : '#f8aea8' }}
								>
									{startCase(status)}
								</div>
							) : null}
						</div>

						<PreviewDocumet
							document_header={startCase(document_type)}
							document_url={document_url}
							preview="true"
						/>

						{!['rejected', 'approved'].includes(status) ? (
							<div className={styles.button_container}>
								<div>
									<Popover
										placement="top"
										caret={false}
										render={(
											<div style={{ width: 360 }}>
												<RejectPopoverContent
													id={id}
													onClickSubmitButton={onClickSubmitButton}
													inputValue={inputValue}
													setInputValue={setInputValue}
													setShowRejectPopover={setShowRejectPopover}

												/>
											</div>
										)}
										interactive
										visible={showRejectPopover === id}
									>
										<Button
											onClick={() => setShowRejectPopover(id)}
											loading={loading || mainApiLoading}
										>
											Reject
										</Button>
									</Popover>
								</div>

								<div className={styles.approve_btn}>
									<Button
										onClick={() => onClickApproveButton(id)}
										loading={loading || mainApiLoading}
									>
										Approve
									</Button>
								</div>
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default IdentificationDocuments;
