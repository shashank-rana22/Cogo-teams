import { Toast, Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';

import fclControls from '../../../../../page-components/SearchResults/configurations/fcl/form-controls';
import getPrefillForm from '../../../../../page-components/SearchResults/utils/getPrefillForm';
import getLocationInfo from '../../../../../page-components/SearchResults/utils/locations-search';

import Form from './Form';
import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';
const SERVICE = 'fcl_freight';

function EditContainerModal({
	show = false,
	setShow = () => {},
	setRouterLoading = () => {},
	data = {},
	createLoading = false,
	createSearch = () => {},
	isMobile = false,
}) {
	const router = useRouter();

	const defaultValues = getPrefillForm(data, SERVICE_KEY);

	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
		setValue,
	} = useForm({ defaultValues });

	const controls = fclControls({ setValue });

	const { origin = {}, destination = {} } = getLocationInfo(data, {}, SERVICE_KEY);

	const requiredParams = {
		organization_id        : data?.importer_exporter_id,
		organization_branch_id : data?.importer_exporter_branch_id,
		user_id                : data?.user_id,
		origin,
		destination,
	};

	const handleApply = async (finalValues) => {
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
			setRouterLoading(true);

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
			placement={isMobile ? 'bottom' : 'right'}
			className={styles.modal}
		>
			<Modal.Body>
				<Form
					control={control}
					controls={controls}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					setValue={setValue}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					size="xl"
					themeType="accent"
					className={styles.button}
					loading={createLoading}
					disabled={createLoading}
					onClick={handleSubmit(handleApply)}
				>
					Apply Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditContainerModal;
