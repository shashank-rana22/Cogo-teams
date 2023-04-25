import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import Spinner from '../../../../commons/Spinner';
import useAllowReTest from '../../hooks/useAllowReTest';
import PublishNow from '../PublishNow';

import Retest from './Retest';
import styles from './styles.module.css';
import TEXT_MAPPING from './text-mapping';

function InfoBanner({ test_status = '', test_id, validity_end, refetchTest = () => {}, loading }) {
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

	const content = TEXT_MAPPING[test_status];

	const { key, backgroundColor, text, subText, iconColor, Icon, borderColor } = content || {};

	if (!['published', 'active'].includes(test_status) && loading) {
		return null;
	}

	if (retestLoading) return <Spinner />;

	return (
		<div className={styles.container} style={{ border: `1px solid ${borderColor}`, background: backgroundColor }}>
			<div className={styles.content}>
				<Icon className={styles.icon} style={{ color: iconColor }} />

				<b className={styles.margin_right}>{text}</b>

				<span>{subText}</span>

			</div>

			{!['published', 'publishing'].includes(key) && !isUnderValidity
				? <PublishNow test_id={test_id} refetchTest={refetchTest} /> : (
					<Button
						type="button"
						themeType="accent"
						size="md"
						onClick={() => setShowRetestModal(true)}
					>
						Create Retest
					</Button>
				)}

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
