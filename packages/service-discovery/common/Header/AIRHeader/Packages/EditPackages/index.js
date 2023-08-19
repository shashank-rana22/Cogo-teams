import { Toast, Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import getPrefillForm from '../../../../../page-components/SearchResults/utils/getPrefillForm';
import getLocationInfo from '../../../../../page-components/SearchResults/utils/locations-search';
import useCreateSearch from '../../../../../page-components/ServiceDiscovery/SpotSearch/hooks/useCreateSearch';

import FormModal from './FormModal';
import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';
const SERVICE = 'air_freight';
const MAX_WEIGHT_ALLOWED = 150;

function EditPackages({
	show = false,
	setShow = () => {},
	data = {},
}) {
	const router = useRouter();

	const [showModal, setShowModal] = useState(''); // suggestion,warning

	const { createSearch, loading } = useCreateSearch();

	const defaultValues = getPrefillForm(data, SERVICE_KEY);

	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
		setValue,
		reset,
	} = useForm({ defaultValues });

	const { origin = {}, destination = {} } = getLocationInfo(data, {}, SERVICE_KEY);

	const requiredParams = {
		organization_id        : data?.importer_exporter_id,
		organization_branch_id : data?.importer_exporter_branch_id,
		user_id                : data?.user_id,
		origin,
		destination,
	};

	const handleApply = async (finalValues) => {
		if ((Number(finalValues?.total_weight) / Number(finalValues?.total_quantity) > MAX_WEIGHT_ALLOWED
		&& showModal !== 'proceed')) {
			setShowModal('warning');
			return;
		}

		const hasChanges = JSON.stringify(finalValues) !== JSON.stringify(defaultValues);

		if (!hasChanges) {
			Toast.info('No Changes Found');
			return;
		}

		const spot_search_id = await createSearch({
			action : 'edit',
			values : { service_type: SERVICE, ...requiredParams, formValues: finalValues },
		});

		if (spot_search_id && typeof spot_search_id === 'string') {
			router.push(
				'/book/[spot_search_id]',
				`/book/${spot_search_id}`,
			);
		}

		setShow(false);
	};

	return (
		<Modal
			animate
			size="md"
			show={show}
			onClose={() => setShow(false)}
			placement="right"
			className={styles.modal}
		>
			<Modal.Body>
				<FormModal
					control={control}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					setValue={setValue}
					showModal={showModal}
					setShowModal={setShowModal}
					handleApply={handleApply}
					reset={reset}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="xl"
					themeType="accent"
					className={styles.button}
					loading={loading}
					disabled={loading}
					onClick={handleSubmit(handleApply)}
				>
					Apply Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditPackages;
