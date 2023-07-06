import { Modal, Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useCreateSearch from '../../../../ServiceDiscovery/SpotSearch/hooks/useCreateSearch';
import getPrefillForm from '../../../utils/getPrefillForm';
import getLocationInfo from '../../../utils/locations-search';
import FilterContent from '../FilterContent';
import EXTRA_FILTERS from '../FilterContent/extra-filter-controls';
import getFilterControls, { MAIN_CONTROLS_MAPPING } from '../FilterContent/getControls';

import styles from './styles.module.css';

const SERVICE_KEY = 'search_type';

const getSeperateObjects = (mainObj, extraArray) => {
	const filters = extraArray.reduce((arr, key) => ([...arr, ...EXTRA_FILTERS[key].controls]), []);

	const filterKeys = filters.map((item) => item.name);

	const filterObj = filterKeys.reduce((obj, key) => ({ ...obj, [key]: mainObj[key] }), {});
	delete filterObj.detention_demurrage;

	const loadObj = { ...mainObj };

	Object.keys(loadObj).forEach((key) => {
		if (filterKeys.includes(key)) {
			delete loadObj[key];
		}
	});
	delete loadObj.currency;

	return { loadObj, filterObj };
};

function FilterModal({ data, show, setShow, filters, setFilters }) {
	const { createSearch, loading } = useCreateSearch();

	const router = useRouter();

	const service_type = data[SERVICE_KEY];

	const controls = getFilterControls(data, SERVICE_KEY);

	const extraFiltersKeysArray = MAIN_CONTROLS_MAPPING[service_type].extraControls;

	const defaultValues = { ...getPrefillForm(data, SERVICE_KEY, extraFiltersKeysArray), ...filters };

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

		const { filterObj, loadObj: finalLoadObj = {} } = getSeperateObjects(finalValues, extraFiltersKeysArray);
		const { loadObj: initialLoadObj = {} } = getSeperateObjects(defaultValues, extraFiltersKeysArray);

		const hasLoadChanged = JSON.stringify(finalLoadObj) !== JSON.stringify(initialLoadObj);

		if (hasLoadChanged) {
			const spot_search_id = await createSearch({
				action : 'edit',
				values : { service_type, ...requiredParams, formValues: finalValues },
			});

			if (spot_search_id && typeof spot_search_id === 'string') {
				router.push(
					'/book/[spot_search_id]/[importer_exporter_id]',
					`/book/${spot_search_id}/${requiredParams.organization_id}`,
				);
			}
		}

		setFilters({ ...filters, ...filterObj });
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
					Apply Filters
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default FilterModal;
