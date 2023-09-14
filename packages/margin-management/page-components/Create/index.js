import { Button, FunnelStepper } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';
import { useGetPermission } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Layout from '../../common/Layout';
// import getChargeCodes from '../../helpers/getChargeCodes';
// import getAllTheControls from '../../helpers/getControls';
import getShowElements from '../../helpers/getShowElements';
// import useCreateMargin from '../../hooks/useCreateMargin';
// import useListRateChargeCodes from '../../hooks/useListRateChargeCodes';

import getFclControls from './extraControls/getFclControls';
import getFclCustomsControls from './extraControls/getFclCustomsControls';
import getLclFreightControls from './extraControls/getLclFreightControls';
import getLtlFreight from './extraControls/getLtlFreight';
import getControls from './getControls';
import Margin from './Margin';
import { marginControls } from './marginControls';
import styles from './styles.module.css';

// const payload = {
// 	service      : 'fcl_freight',
// 	margin_type  : 'demand',
// 	margin_slabs : [
// 		{
// 			margin_values: [
// 				{
// 					code     : 'BAS',
// 					type     : 'percentage',
// 					value    : 10,
// 					currency : 'INR',
// 				},
// 			],
// 			lower_limit : 0,
// 			upper_limit : 10,
// 		},
// 	],
// 	filters               : {},
// 	agent_id              : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
// 	margin_slabs_currency : 'INR',
// };
const items = [
	{ title: <div className={styles.stepper}>CUSTOMIZE YOUR DETAILS</div>, key: 'customize' },
	{ title: <div className={styles.stepper}>ADD THE MARGINS</div>, key: 'add' },
];
let initialCall = false;
function Create({ type = 'create', item = {} }) {
	const { isConditionMatches } = useGetPermission();
	const [activeKey, setActiveKey] = useState('customize');
	const [idValues, setIdValues] = useState({});
	const [partnerId, setPartnerId] = useState('');
	const [marginType, setMarginType] = useState('');
	// const [additionType, setAdditionType] = useState('');
	// const { onSubmit: trigger } = useCreateMargin();
	// const [chargeCodes, setChargeCodes] = useState([]);
	// const { trigger:chargeCodesTrigger } = useListRateChargeCodes({ defaultFilters: { autoCancel: false } });

	const { controls: initialControls } = getControls({ type, marginType, partnerId });
	const [service, setService] = useState('');
	const {
		control,
		watch,
		handleSubmit,
	} = useForm({ defaultValues: idValues });
	const formValues = watch();

	// useEffect(() => {
	// 	if (formValues?.service) {
	// 		getChargeCodes({ setChargeCodes, service: formValues?.service, trigger: chargeCodesTrigger });
	// 		setService(formValues?.service);
	// 	}
	// }, [formValues?.service, chargeCodesTrigger]);

	useEffect(() => {
		if (formValues?.partner_id) {
			setPartnerId(formValues?.partner_id);
		}
	}, [formValues?.partner_id]);
	useEffect(() => {
		if (formValues?.margin_type) {
			setMarginType(formValues?.margin_type);
		}
	}, [formValues?.margin_type]);
	useEffect(() => {
		setService(formValues?.service);
		initialCall = false;
	}, [formValues?.service]);
	const getAllControls = useCallback(() => {
		let extraControls = (getFclControls({ type })[service] || []);
		extraControls = (getFclCustomsControls({ type })[service] || extraControls);
		extraControls = (getLclFreightControls({ type })[service] || extraControls);
		extraControls = (getLtlFreight({ type })[service] || extraControls);
		const controls = [...(initialControls || []), ...(extraControls || [])];
		return controls;
	}, [initialControls, service, type]);
	const controls = useMemo(() => getAllControls(), [getAllControls]);

	// const marginValuedControls = getAllTheControls({
	// 	allPresentControls: marginControls,
	// 	item,
	// 	chargeCodes,
	// 	additionType,
	// 	service,
	// 	isConditionMatches,
	// });
	// const allPresentValuedControls = getAllTheControls(
	// 	{
	// 		allPresentControls: controls,
	// 		item,
	// 		chargeCodes,
	// 		additionType,
	// 		service,
	// 		isConditionMatches,
	// 	},
	// );

	// const allControls = [...allPresentValuedControls, ...marginValuedControls];

	useEffect(() => {
		if (!initialCall) {
			setIdValues(controls.map((dat) => ({ [dat]: '' })));
			initialCall = true;
		}
	}, [controls, setIdValues, service]);

	const onSubmit = (values) => {
		setIdValues(values);
		setActiveKey('add');
	};
	const showElements = getShowElements({ allPresentControls: controls, formValues, isConditionMatches });
	return (
		<div className={styles.container}>
			<div className={styles.header_wrap}>
				<div style={{ alignItems: 'center', margin: '16px 0px 32px 0px' }}>
					<Link href="/margins">
						<Button themeType="link">
							<IcMArrowBack style={{ width: '2em', height: '2em', marginRight: '4px' }} />
							<div className={styles.heading}>Margin Management</div>
						</Button>
					</Link>

				</div>

			</div>
			<div className={styles.text}>CREATE NEW MARGIN</div>
			<div className={styles.sub_container}>
				<FunnelStepper
					className={styles.stepper_container}
					active={activeKey}
					setActive={setActiveKey}
					items={items}
				/>
				{
					activeKey === 'customize' ? (
						<div>
							<Layout controls={controls} control={control} showElements={showElements} />
							<Button
								onClick={handleSubmit(onSubmit)}
							>
								Save and proceed
							</Button>
						</div>
					)
						: (
							<Margin
								formValues={formValues}
								idValues={idValues}
								type={type}
								service={service}
								marginControls={marginControls}
								control={control}
								data={item}
							/>
						)
				}
			</div>

		</div>
	);
}
export default Create;
