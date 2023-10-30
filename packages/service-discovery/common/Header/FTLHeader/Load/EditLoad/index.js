import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState, useMemo, useEffect } from 'react';

import getPrefillForm from '../../../../../page-components/SearchResults/utils/getPrefillForm';
import getLocationInfo from '../../../../../page-components/SearchResults/utils/locations-search';

import FormModal from './FormModal';
import styles from './styles.module.css';

const DEFAULT_VALUE = 1;
const SERVICE_KEY = 'search_type';
const SERVICE = 'ftl_freight';

const ACTIVETAB_VALUE_MAPPING = {
	truck             : 'truck',
	cargo_gross       : 'cargo',
	cargo_per_package : 'cargo',
};

const getTabWisePrefilledValues = (activeTab, values = {}) => {
	let formValues = {};

	if (activeTab === 'truck') {
		const { trucks:trucksData = [] } = values || {};

		formValues = {
			trucks: [
				...(trucksData || []).map(({ truck_type = '', trucks_count = 1 }) => ({
					truck_type,
					trucks_count,
					truck: (truck_type.split('_') || []).slice(0, 2).join('_'),
				})),
			],
		};
	}

	if (activeTab === 'cargo_gross') {
		const { packages = [], volume = 0 } = values || {};

		const [packagesData] = packages;

		formValues = {
			packing_type   : packagesData.packing_type || 'box',
			packages_count : packagesData.packages_count || DEFAULT_VALUE,
			package_weight : packagesData.package_weight || DEFAULT_VALUE,
			dimensions     : {
				length : packagesData.length || packagesData.dimensions?.length || DEFAULT_VALUE,
				width  : packagesData.width || packagesData.dimensions?.width || DEFAULT_VALUE,
				height : packagesData.height || packagesData.dimensions?.height || DEFAULT_VALUE,
			},
			volume,
			handling_type : packagesData.handling_type || 'stackable',
			unit          : 'ton',
		};
	}

	if (activeTab === 'cargo_per_package') {
		const { packages:packagesData = [] } = values || {};

		formValues = {
			packages: [
				...(packagesData || []).map((packageItem) => ({
					packing_type   : packageItem.packing_type || 'box',
					packages_count : packageItem.packages_count || DEFAULT_VALUE,
					dimensions     : {
						length : packageItem.length || packageItem.dimensions?.length || DEFAULT_VALUE,
						width  : packageItem.width || packageItem.dimensions?.width || DEFAULT_VALUE,
						height : packageItem.height || packageItem.dimensions?.height || DEFAULT_VALUE,
					},
					package_weight : packageItem.package_weight || DEFAULT_VALUE,
					handling_type  : packageItem.handling_type || 'stackable',
					unit           : 'ton',
				})),
			],
		};
	}

	return formValues;
};

function EditLoad({
	show = false,
	setShow = () => {},
	setRouterLoading = () => {},
	data = {},
	touch_points = {},
	createLoading = false,
	createSearch = () => {},
	isMobile = false,
}) {
	const router = useRouter();

	const defaultValues = useMemo(() => getPrefillForm(data, SERVICE_KEY), [data]);

	const { load_selection_type = '' } = defaultValues;

	const [activeTab, setActiveTab] = useState(ACTIVETAB_VALUE_MAPPING[load_selection_type]);
	const [cargoType, setCargoType] = useState(activeTab === 'truck' ? 'cargo_per_package' : load_selection_type);

	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
		setValue,
	} = useForm();

	const { origin = {}, destination = {} } = getLocationInfo(data, {}, SERVICE_KEY);

	const getLoadType = () => {
		if (activeTab === 'truck') {
			return activeTab;
		}
		return cargoType;
	};

	const loadType = getLoadType();

	const handleApply = async (finalValues) => {
		const requiredParams = {
			organization_id        : data?.importer_exporter_id,
			organization_branch_id : data?.importer_exporter_branch_id,
			user_id                : data?.user_id,
			origin,
			destination,
		};

		const { trip_type = '' } = defaultValues;

		const spot_search_id = await createSearch({
			action : 'edit',
			values : {
				service_type : SERVICE,
				...requiredParams,
				formValues   : {
					...finalValues,
					load_selection_type : loadType,
					trip_type,
					touch_points,
					source              : 'edit',
				},
			},
		});

		if (spot_search_id && typeof spot_search_id === 'string') {
			setRouterLoading(true);

			router.push(
				'/book/[spot_search_id]',
				`/book/${spot_search_id}`,
			);
			setShow(false);
		}
	};

	useEffect(() => {
		const { cargo_readiness_date = '', commodity = '' } = defaultValues;

		setValue('cargo_readiness_date', new Date(cargo_readiness_date));
		setValue('commodity', commodity);

		if (loadType !== load_selection_type) {
			return;
		}

		const prefillingValuesObj = getTabWisePrefilledValues(
			load_selection_type,
			defaultValues,
		);

		Object.entries(prefillingValuesObj).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [defaultValues, loadType, load_selection_type, setValue]);

	const onClose = () => setShow(false);

	return (
		<Modal
			animate
			size="md"
			show={show}
			onClose={onClose}
			placement={isMobile ? 'bottom' : 'right'}
			className={styles.modal}
		>
			<Modal.Body>
				<FormModal
					control={control}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					setValue={setValue}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					cargoType={cargoType}
					setCargoType={setCargoType}
					commodity_type={data?.commodity_type}
					loadType={loadType}
					data={{ origin_country_id: data?.origin_country_id }}
					onClose={onClose}
					isMobile={isMobile}
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

export default EditLoad;
