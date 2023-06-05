import { Button, Modal, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useAllowReTest from '../../hooks/useAllowReTest';
import PublishNow from '../PublishNow';

import Retest from './Retest';
import styles from './styles.module.css';
import getTestStatus from './testStatus';
import TEXT_MAPPING from './text-mapping';

function InfoBanner({
	test_status = '',
	test_id,
	validity_end,
	refetchTest = () => { },
	loading,
	retest,
	activeAttempt,
}) {
	const [showRetestModal, setShowRetestModal] = useState(false);

	const {
		watch,
		control,
		setValue,
		onSubmit,
		errors,
		handleSubmit,
		loading: retestLoading,
	} = useAllowReTest({ setShowRetestModal, test_id, refetchTest });

	const isUnderValidity = new Date() < new Date(validity_end);

	const status = getTestStatus({ retest, activeAttempt, test_status });

	const content = TEXT_MAPPING[status];

	const formvalues = watch();

	useEffect(() => {
		setValue('filtered_users', '');
		setValue('percentage', '');
		setValue('percentile', '');
	}, [formvalues.users_list, setValue]);

	useEffect(() => {
		if (isEmpty(formvalues?.filtered_users)) {
			setValue('percentage', '');
			setValue('percentile', '');
		} else if (formvalues?.filtered_users?.includes('percentile_checked')) {
			setValue('percentage', '');
		} else if (formvalues?.filtered_users?.includes('percentage_checked')) {
			setValue('percentile', '');
		}
	}, [setValue, formvalues?.filtered_users]);

	const { key, backgroundColor, text, subText, iconColor, Icon, borderColor } = content || {};

	if (retestLoading || loading) {
		return (
			<div className={styles.loading_container}>
				<Placeholder height="48px" />
			</div>
		);
	}

	if (!['published', 'active'].includes(test_status) && loading) {
		return null;
	}

	return (
		<div className={styles.container} style={{ border: `1px solid ${borderColor}`, background: backgroundColor }}>
			<div className={styles.content}>
				<Icon className={styles.icon} style={{ color: iconColor }} />

				<b className={styles.margin_right}>{text}</b>

				<span>{subText}</span>
			</div>

			{test_status === 'published' && retest === false ? (
				<Button
					type="button"
					themeType="accent"
					size="md"
					onClick={() => setShowRetestModal(true)}
				>
					Create Retest
				</Button>
			) : null}

			{!['published', 'publishing'].includes(key) && !isUnderValidity
				? <PublishNow test_id={test_id} refetchTest={refetchTest} /> : null}

			{showRetestModal
				? (
					<Modal
						show={showRetestModal}
						size="md"
						onClose={() => setShowRetestModal(false)}
						className={styles.modal_container}
					>
						<Modal.Header title="Set Retest Criteria" />

						<Modal.Body>
							<Retest
								control={control}
								errors={errors}
								formvalues={formvalues}
							/>
						</Modal.Body>

						<Modal.Footer>
							<div className={styles.button_container}>
								<Button
									themeType="secondary"
									onClick={() => setShowRetestModal(false)}
									className={styles.cancel_button}
								>
									Cancel
								</Button>

								<Button
									themeType="accent"
									onClick={handleSubmit(onSubmit)}
									disabled={loading}
								>
									Create Retest
								</Button>
							</div>
						</Modal.Footer>
					</Modal>

				) : null}
		</div>
	);
}

export default InfoBanner;
