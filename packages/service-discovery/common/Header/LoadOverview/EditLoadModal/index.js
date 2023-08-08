import { Toast, Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import FilterContent from '../../../../page-components/SearchResults/common/Filters/FilterContent';
import getFilterControls from '../../../../page-components/SearchResults/common/Filters/FilterContent/getControls';
import getPrefillForm from '../../../../page-components/SearchResults/utils/getPrefillForm';
import getLocationInfo from '../../../../page-components/SearchResults/utils/locations-search';
import useCreateSearch from '../../../../page-components/ServiceDiscovery/SpotSearch/hooks/useCreateSearch';

import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';

function EditLoadModal({
	data = {},
	show = false,
	setShow = () => {},
	showLoadControlsOnly = true,
}) {
	const { createSearch, loading } = useCreateSearch();

	const router = useRouter();

	const service_type = data[SERVICE_KEY];

	const controls = getFilterControls(data, SERVICE_KEY, showLoadControlsOnly);

	const defaultValues = getPrefillForm(data, SERVICE_KEY);

	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
		setValue,
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
		if (!isEmpty(errors)) {
			return;
		}

		const hasChanges = JSON.stringify(finalValues) !== JSON.stringify(defaultValues);

		if (!hasChanges) {
			Toast.info('No Changes Found');
			return;
		}

		const spot_search_id = await createSearch({
			action : 'edit',
			values : { service_type, ...requiredParams, formValues: finalValues },
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
				<FilterContent
					controls={controls}
					control={control}
					watch={watch}
					errors={errors}
					setValue={setValue}
					handleSubmit={handleSubmit}
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

export default EditLoadModal;
