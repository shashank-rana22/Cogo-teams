import { Button, Accordion, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import getPrefillForm from '../../../../../utils/getPrefillForm';
import getLocationInfo from '../../../../../utils/locations-search';

import EXTRA_FILTERS from './extra-filter-controls';
import FilterItem from './FilterItem';
import getFilterControls, { MAIN_CONTROLS_MAPPING } from './getControls';
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

function FilterContent({ data = {}, setShow, createSearch, createSearchLoading, filters, setFilters }) {
	const router = useRouter();

	const service_type = data[SERVICE_KEY];

	const controls = getFilterControls(data, SERVICE_KEY);

	const extraFiltersKeysArray = MAIN_CONTROLS_MAPPING[service_type].extraControls;

	const defaultValues = getPrefillForm(data, SERVICE_KEY, extraFiltersKeysArray);

	const {
		control,
		watch,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm({ defaultValues: { ...defaultValues, ...filters } });

	const editFormValues = watch();

	const { origin = {}, destination = {} } = getLocationInfo(data, {}, SERVICE_KEY);

	const requiredParams = {
		organization_id        : data?.importer_exporter_id,
		organization_branch_id : data?.importer_exporter_branch_id,
		user_id                : data?.user_id,
		origin,
		destination,
	};

	const handleApply = async () => {
		if (!isEmpty(errors)) {
			return;
		}

		const hasChanges = JSON.stringify(editFormValues) !== JSON.stringify(defaultValues);

		if (!hasChanges) {
			Toast.info('No Changes Found');
			return;
		}

		const { filterObj, loadObj: finalLoadObj = {} } = getSeperateObjects(editFormValues, extraFiltersKeysArray);
		const { loadObj: initialLoadObj = {} } = getSeperateObjects(defaultValues, extraFiltersKeysArray);

		const hasLoadChanged = JSON.stringify(finalLoadObj) !== JSON.stringify(initialLoadObj);

		if (hasLoadChanged) {
			const spot_search_id = await createSearch({
				action : 'edit',
				values : { service_type, ...requiredParams, formValues: editFormValues },
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
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const { label: itemLabel, controls: itemControls } = controlItem;

					return (
						<div className={styles.filter_item} key={controlItem?.label}>
							<Accordion type="text" title={itemLabel} style={{ width: '100%' }}>

								<FilterItem
									controls={itemControls}
									control={control}
									watch={watch}
									errors={errors}
									handleSubmit={handleSubmit}
									setValue={setValue}
								/>
							</Accordion>
						</div>
					);
				})}
			</div>

			<div className={styles.button}>
				<Button
					type="button"
					size="xl"
					themeType="accent"
					className={styles.button}
					onClick={handleSubmit(handleApply)}
					loading={createSearchLoading}
				>
					Apply Filters
				</Button>
			</div>
		</div>
	);
}

export default FilterContent;
