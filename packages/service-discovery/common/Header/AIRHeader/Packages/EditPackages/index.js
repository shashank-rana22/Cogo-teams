import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useState, useEffect, useMemo } from 'react';

import CLASS_MAPPING from '../../../../../page-components/SearchResults/configurations/air/classMapping';
import getPrefillForm from '../../../../../page-components/SearchResults/utils/getPrefillForm';
import getLocationInfo from '../../../../../page-components/SearchResults/utils/locations-search';

import FormModal from './FormModal';
import styles from './styles.module.css';

const DEFAULT_VALUE = 1;
const SERVICE_KEY = 'search_type';
const SERVICE = 'air_freight';
const MAX_WEIGHT_ALLOWED = 150;

const getTabWisePrefilledValues = (activeTab, values = {}) => {
	let formValues = {};
	if (activeTab === 'cargo_gross') {
		const {
			total_quantity = 1,
			total_volume = 1,
			total_weight = 1,
			packing_list,
			packages = [],
			commodity_details = [],
		} = values || {};

		formValues = {
			total_quantity : total_quantity || DEFAULT_VALUE,
			total_weight   : total_weight || DEFAULT_VALUE,
			total_volume   : total_volume || DEFAULT_VALUE,
			handling_type  : packages?.[GLOBAL_CONSTANTS.zeroth_index]?.handling_type || 'stackable',
			packing_type   : packages?.[GLOBAL_CONSTANTS.zeroth_index]?.packing_type || 'box',
			packing_list   : packing_list || commodity_details?.[GLOBAL_CONSTANTS.zeroth_index]?.packing_list,
		};
	}

	if (activeTab === 'cargo_per_package') {
		const { packages:packagesData = [] } = values || {};

		formValues = {
			packages: [
				...(packagesData || []).map((packageItem) => ({
					packages_count  : packageItem.packages_count || DEFAULT_VALUE,
					packing_type    : packageItem.packing_type || 'box',
					length          : packageItem.length || DEFAULT_VALUE,
					width           : packageItem.width || DEFAULT_VALUE,
					height          : packageItem.height || DEFAULT_VALUE,
					package_weight  : packageItem.package_weight || DEFAULT_VALUE,
					handling_type   : packageItem.handling_type || 'stackable',
					dimensions_unit : 'cm',
					weight_unit     : 'kg_unit',
				})),
			],
		};
	}

	return formValues;
};

function EditPackages({
	show = false,
	setShow = () => {},
	setRouterLoading = () => {},
	data = {},
	createLoading = false,
	createSearch = () => {},
	isMobile = false,
}) {
	const router = useRouter();

	const [showModal, setShowModal] = useState(''); // suggestion,warning

	const defaultValues = useMemo(() => getPrefillForm(data, SERVICE_KEY), [data]);

	const [activeTab, setActiveTab] = useState(defaultValues?.load_selection_type); // cargo_gross and cargo_per_package

	const {
		control,
		formState: { errors },
		watch,
		handleSubmit,
		setValue,
		getValues,
	} = useForm();

	const handleApply = async (finalValues) => {
		const { origin = {}, destination = {} } = getLocationInfo(data, {}, SERVICE_KEY);

		const requiredParams = {
			organization_id        : data?.importer_exporter_id,
			organization_branch_id : data?.importer_exporter_branch_id,
			user_id                : data?.user_id,
			origin,
			destination,
		};

		const spot_search_id = await createSearch({
			action : 'edit',
			values : {
				service_type : SERVICE,
				...requiredParams,
				formValues   : { ...finalValues, load_selection_type: activeTab },
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

	const onSubmit = () => {
		const formValues = getValues();

		if ((Number(formValues?.total_weight) / Number(formValues?.total_quantity) > MAX_WEIGHT_ALLOWED
		&& showModal !== 'proceed')) {
			setShowModal('warning');
			return;
		}

		handleSubmit(handleApply)();
	};

	useEffect(() => {
		const { cargo_clearance_date = '', commodity = '', commodity_details = [] } = defaultValues;

		const {
			commodity_class = {},
			commodity_type = '',
			commodity_subtype = '',
			temp_controlled_range = '',
			temp_controlled_type = '',
		} = commodity_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};

		const commodityPrefill = () => {
			if (commodity === 'general') {
				return commodity;
			}
			return commodity_type;
		};

		const commoditySubTypePrefill = () => {
			if (commodity === 'general') {
				return commodity_subtype || commodity_type;
			}
			if (commodity === 'special_consideration' && commodity_type === 'other_special') {
				return commodity_subtype;
			}
			if (commodity === 'special_consideration' && commodity_type === 'dangerous') {
				let classDescription = '';

				Object.keys(CLASS_MAPPING).forEach((element) => {
					const newElement = CLASS_MAPPING[element];
					if (
						newElement?.class_id === commodity_class?.class_id
						&& newElement?.subclass_id === commodity_class?.subclass_id
						&& newElement?.subclass_codes?.toString()
							=== commodity_class?.subclass_codes?.toString()
					) { classDescription = element; }
				});

				return classDescription;
			}
			if (commodity === 'special_consideration' && commodity_type === 'temp_controlled') {
				const tempControlled = `${temp_controlled_type}-${temp_controlled_range}`;
				return tempControlled;
			}

			return null;
		};

		const commodityData = commodityPrefill();
		const subCommodityData = commoditySubTypePrefill();

		setValue('cargo_clearance_date', new Date(cargo_clearance_date));
		setValue('commodity_type', commodityData);
		setValue('commodity_subtype', subCommodityData);

		if (activeTab !== defaultValues?.load_selection_type) {
			return;
		}

		const prefillingValuesObj = getTabWisePrefilledValues(activeTab, defaultValues);

		Object.entries(prefillingValuesObj).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [activeTab, defaultValues, setValue]);

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
				<FormModal
					control={control}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					setValue={setValue}
					showModal={showModal}
					setShowModal={setShowModal}
					handleApply={handleApply}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
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
					onClick={onSubmit}
				>
					Create Search
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditPackages;
