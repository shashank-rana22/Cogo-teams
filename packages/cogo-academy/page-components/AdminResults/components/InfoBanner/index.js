import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import useAllowReTest from '../../hooks/useAllowReTest';
import PublishNow from '../PublishNow';

import Retest from './Retest';
import styles from './styles.module.css';
import TEXT_MAPPING from './text-mapping';

function InfoBanner({ test_status = '', test_id, validity_end, refetchTest, loading }) {
	const {
		watch,
		control,
		setValue,
		onSubmit,
		errors,
		handleSubmit,
	} = useAllowReTest();

	const isUnderValidity = new Date() < new Date(validity_end);

	const content = TEXT_MAPPING[test_status];

	const [showRetestModal, setShowRetestModal] = useState(false);

	const { key, backgroundColor, text, subText, iconColor, Icon, borderColor } = content || {};

	if (!['published', 'active'].includes(test_status) && loading) {
		return null;
	}

	return (
		<div className={styles.container} style={{ border: `1px solid ${borderColor}`, background: backgroundColor }}>
			<div className={styles.content}>
				<Icon className={styles.icon} style={{ color: iconColor }} />

				<b className={styles.margin_right}>{text}</b>

				<span>{subText}</span>

				{test_status === 'published'
					? (
						<Button
							type="button"
							themeType="accent"
							size="md"
							onClick={() => setShowRetestModal(true)}
						>
							Create Retest
						</Button>
					) : null}
			</div>

			<div>
				{!['published', 'publishing'].includes(key) && !isUnderValidity
					? <PublishNow test_id={test_id} refetchTest={refetchTest} /> : null}
			</div>

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
								watch={watch}
								control={control}
								setValue={setValue}
								errors={errors}
							/>
						</Modal.Body>
						<Modal.Footer>
							<div>
								<div>
									<Button
										themeType="secondary"
										onClick={() => setShowRetestModal(false)}
									>
										Cancel
									</Button>

								</div>
								<div>
									<Button
										themeType="accent"
										onClick={handleSubmit(onSubmit)}
										disabled={loading}
									>
										Submit
									</Button>
								</div>
							</div>
						</Modal.Footer>
					</Modal>

				) : null}
		</div>
	);
}

export default InfoBanner;
