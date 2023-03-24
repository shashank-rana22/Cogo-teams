import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import React, {
	useImperativeHandle,
	forwardRef,
	useEffect,
	useState,
} from 'react';

import ParameterDetail from '../ParameterDetail';

import styles from './styles.module.css';

const KEYS = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'packing_type',
	'packages_count',
	'volume',
	'weight',
	'bl_type',
	'bls_count',
	'cargo_weight_per_container',
];

const KEYS_AIR_FREIGHT = ['packages'];

function EditParams({
	detail, controls = [], shipment_type = '', onCancel = () => {},
}, ref) {
	const newControls = (controls || []).map((control) => ({
		...control,
		value: detail?.[control.name],
	}));

	const initialValues = {};
	newControls.forEach((control) => {
		if (control.value) {
			initialValues[control.name] = control.value;
		}
	});
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState(initialValues);

	const {
		fields,
		watch,
		handleSubmit,
		setValues: setFormValues,
		setValue,
	} = useForm(newControls);

	// const airFreightControls = {};
	// KEYS_AIR_FREIGHT.forEach((field) => {
	// 	airFreightControls[field] = fields[field];
	// });

	const formValues = watch('packages');

	let volume = 0;
	formValues?.forEach((pack) => {
		volume += Number(
			pack.length * pack.width * pack.height * pack.packages_count * 10 ** -6,
		);
	});

	volume = Number(volume.toFixed(6));

	let weight = 0;
	formValues?.forEach((pack) => {
		weight += Number(pack.total_packages_weight);
	});

	let package_count = 0;
	formValues?.forEach((pack) => {
		package_count += Number(pack.packages_count);
	});

	formValues?.forEach((pack) => {
		if (pack === 'total_packages_weight') {
			setValue(pack, formValues?.total_packages_weight);
		}
	});

	useEffect(() => {
		if (shipment_type === 'air_freight') {
			const formVolume =				formValues[0]?.length && formValues[0]?.width && formValues[0]?.height
				? volume
				: detail?.volume;

			const formWeight = formValues[0]?.total_packages_weight
				? weight
				: detail?.weight;

			const formPackageCount = formValues[0]?.packages_count
				? package_count
				: detail?.packages_count;

			setFormValues({
				volume         : formVolume,
				weight         : formWeight,
				packages_count : formPackageCount,
			});
		}
	}, [JSON.stringify(formValues)]);

	// const packingArray = [
	// 	{
	// 		label : 'Total Weight (kgs)',
	// 		key   : 'weight',
	// 	},
	// 	{
	// 		label : 'Total Volume (cbm)',
	// 		key   : 'volume',
	// 	},
	// 	{
	// 		label : 'Total Packages Count',
	// 		key   : 'packages_count',
	// 	},
	// ];

	const renderValue = (key) => {
		switch (key) {
			case 'container_size':
				return {
					label : 'Container Size',
					value : `${detail?.container_size}FT`,
					key,
				};
			case 'cargo_weight_per_container':
				return {
					label : 'Container Weight(Mt)',
					value : detail?.cargo_weight_per_container,
					key,
				};
			case 'containers_count':
				return {
					label : 'Containers Count',
					value : detail?.containers_count,
					key,
				};
			case 'packing_type':
				return {
					label: 'Packing Type',
					value:
						shipment_type === 'rail_domestic_freight'
							? detail?.packing_type
							: detail?.packages?.packing_type,
					key,
				};
			case 'length':
				return {
					label : 'Length (in cm)',
					value : detail?.packages?.length,
					key,
				};
			case 'width':
				return {
					label : 'Width (in cm)',
					value : detail?.packages?.width,
					key,
				};
			case 'height':
				return {
					label : 'Height (in cm)',
					value : detail?.packages?.height,
					key,
				};
			case 'packages_count':
				return {
					label : 'Packages Count',
					value : detail?.packages_count,
					key,
				};
			case 'package_count':
				return {
					label : 'Total Package Count',
					value : detail?.packages_count,
				};
			case 'trucks_count':
				return { label: 'Total Trucks', value: detail?.trucks_count, key };
			case 'container_type':
				return {
					label : 'Container Type',
					value : startCase(detail?.container_type),
					key,
				};
			case 'trade_type':
				return { label: 'Trade Type', value: detail?.trade_type, key };
			case 'commodity':
				return { label: 'Commodity', value: detail?.commodity, key };
			case 'inco_term':
				return { label: 'Inco Term', value: detail?.inco_term, key };
			case 'volume':
				return {
					label : 'Total Volume(cbm)',
					value : detail?.volume,
					key,
				};
			case 'weight':
				return {
					label : 'Total Weight(kgs)',
					value : detail?.weight,
					key,
				};
			case 'bl_type':
				return { label: 'BL Type', value: detail?.bl_type, key };
			case 'bls_count':
				return { label: 'BL Count', value: detail?.bls_count, key };
			case 'packages':
				return {
					label : 'Dimension (lxbxh)',
					value : [
						{
							length : 1,
							width  : 2,
							height : 3,
						},
					],
					key,
				};
			default:
				return null;
		}
	};

	const onError = (errs) => {
		setErrors(errs);
	};

	useEffect(() => {
		const subscription = watch((value) => {
			setValues(value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	useImperativeHandle(ref, () => ({
		values,
		detail,
		handleSubmit,
		onError,
	}));

	// if (shipment_type === 'ltl_freight')
	// 	return <LtlEditParams detail={detail} onCancel={onCancel} />;

	return (
		<div className={styles.body_container}>

			{KEYS.map((key) => {
				if (detail[key] || detail?.packages?.[0]) {
					return (
						<ParameterDetail />
					);
				}
				return null;
			})}

			{/* {shipment_type === 'air_freight' ? (
				<div className={styles.border}>
					<div className={styles.field_wrapper}>
						<LayoutWrapper
							fields={airFreightControls}
							errors={errors}
							controls={controls}
						/>
					</div>
					<hr />
					<div className={styles.wrapper}>
						{packingArray.map((pack) => (
							<div className={styles.styled_package_count}>
								<label>{pack.label}</label>
								<InputController {...fields[pack.key]} />
							</div>
						))}
					</div>
				</div>
			) : (
				KEYS.map((key) => {
					if (detail[key] || detail?.packages?.[0]) {
						return (
							<ParameterDetail
								controls={newControls}
								key={key}
								shipment_type={shipment_type}
								valueDetails={renderValue(key)}
								field={fields[key]}
								fields={fields}
								errors={errors}
								error={errors[key]}
							/>
						);
					}
					return null;
				})
			)} */}
		</div>
	);
}
export default forwardRef(EditParams);
