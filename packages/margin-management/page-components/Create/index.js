import { Button, FunnelStepper } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
// import { useGetPermission } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Layout from '../../common/Layout';
import disablePrevFields from '../../helpers/disablePrevFields';
import getFormattedValues from '../../helpers/getFormattedValues';
import useCreateMargin from '../../hooks/useCreateMargin';
// import conditions from '../../utils/condition-constants';
import toastApiError from '../../utils/toastApiError';

import getFclControls from './extraControls/getFclControls';
import getFclCustomsControls from './extraControls/getFclCustomsControls';
import getLclFreightControls from './extraControls/getLclFreightControls';
import getLtlFreight from './extraControls/getLtlFreight';
import getControls from './getControls';
import Margin from './Margin';
import getMarginControls from './marginControls';
import styles from './styles.module.css';
// import getShowElements from '../../helpers/getShowElements';
// const agent_view = ['margin', 'across_all'];
const ZERO = 0;
const items = [
	{ title: <div className={styles.stepper}>CUSTOMIZE YOUR DETAILS</div>, key: 'customize' },
	{ title: <div className={styles.stepper}>ADD THE MARGINS</div>, key: 'add' },
];
let initialCall = false;
function Create({ type = 'create', item = {} }) {
	const { agent_id } = useSelector(({ profile }) => ({
		agent_id: profile?.user?.id,

	}));
	const router = useRouter();
	// const { isConditionMatches } = useGetPermission();
	const [activeKey, setActiveKey] = useState(isEmpty(item) ? 'customize' : 'add');
	const [idValues, setIdValues] = useState({ margin_slabs: [], ...item });
	const { onSubmit: submitForm } = useCreateMargin();

	// useEffect(() => {
	// 	setIdValues(item);
	// }, [item]);
	const {
		control,
		watch,
		handleSubmit,
		fields,
	} = useForm({ defaultValues: idValues });
	const formValues = watch();
	const { controls: initialControls } = getControls({
		type,
		marginType : formValues?.margin_type,
		partnerId  : formValues?.partner_id,
		item,
	});
	const marginControls = getMarginControls({ service: formValues?.service });
	// if (
	// 	isConditionMatches(conditions.SEE_ALL_MARGINS, 'or')
	// 	|| formValues?.addition_type === 'channel_partner'
	// ) {
	// 	fields.partner_id.params = formValues?.addition_type === 'channel_partner'
	// 		? { filters: { entity_manager_id: agent_id, status: 'active' } }
	// 		: { filters: { status: 'active' } };
	// }

	const getAllControls = useCallback(() => {
		let extraControls = (getFclControls({ type })[formValues?.service] || []);
		extraControls = (getFclCustomsControls({ type })[formValues?.service] || extraControls);
		extraControls = (getLclFreightControls({ type })[formValues?.service] || extraControls);
		extraControls = (getLtlFreight({ type })[formValues?.service] || extraControls);
		const controls = [...(initialControls || []), ...(extraControls || [])];
		return controls;
	}, [initialControls, formValues?.service, type]);
	const controls = useMemo(() => getAllControls(), [getAllControls]);
	// const { authorizationparameters } = useSelector(({ profile }) => ({
	// 	authorizationparameters: profile,
	// }));
	// console.log('authorizationparameters', authorizationparameters);
	// const showElements = getShowElements({
	// 	allPresentControls : controls,
	// 	formValues,
	// 	item               : { ...(item || {}), ...(item?.filters || {}) },
	// 	isConditionMatches,
	// 	agent_view,
	// });
	const handleFormSubmit = async (value) => {
		const MV = [];
		const { margin_slabs, ...rest } = value;
		const ms = margin_slabs.map((it) => {
			const { lower_limit, upper_limit, limit_currency, margin_values } = it;
			const new_margin_values = margin_values.map((val) => {
				const { code, currency, min_value, max_value } = val;
				return { code, type: val.type, value: val.value, currency, min_value, max_value };
			});
			MV.push(new_margin_values);
			return { lower_limit, upper_limit, limit_currency };
		});
		const values = { margin_slabs: ms, ...rest, margin_values: MV };
		const [slabs_currency] = values.margin_slabs || [];
		const { limit_currency } = slabs_currency || {};

		const editValues = {
			...values,
			trade_type:
				values?.trade_type
				|| formValues?.trade_type
				|| item?.filters?.trade_type,
		};
		if (activeKey === 'customize') {
			setActiveKey('add');
			setIdValues(values);
		} else if (activeKey === 'add') {
			try {
				const formattedValues = getFormattedValues(
					{ values: editValues },
				);
				const rawPayload = {
					...formattedValues,
					status   : type === 'update' ? item?.status : undefined,
					agent_id : ['demand', 'supply'].includes(formattedValues?.margin_type)
						? agent_id
						: undefined,
					margin_slabs_currency: limit_currency,
				};
				const PAYLOAD = {};
				Object.keys(rawPayload || {}).forEach((key) => {
					if (rawPayload[key] || rawPayload[key] === ZERO) {
						PAYLOAD[key] = rawPayload[key];
					}
				});

				const editPayload = {
					margin_slabs_currency : limit_currency,
					margin_slabs          : formattedValues?.margin_slabs,
					id                    : item?.id,
				};
				const actualPayload = type === 'edit' ? editPayload : PAYLOAD;
				await submitForm({ data: actualPayload });
				router.push('/margins');
			} catch (err) {
				toastApiError(err);
			}
		}
	};
	Object.keys(fields || {}).forEach((key) => {
		if (key === 'margin_slabs') {
			disablePrevFields('margin_slabs', key, fields, formValues);
		}
	});

	useEffect(() => {
		if (!initialCall) {
			setIdValues(controls.map((dat) => ({ [dat]: '' })));
			initialCall = true;
		}
	}, [controls, setIdValues, formValues?.service]);

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
						<Layout controls={controls} control={control} fields={fields} />
						<Button
							onClick={handleSubmit(handleFormSubmit)}
						>
							Save and proceed
						</Button>
					</div>
				)
					: (
						<div>
							<Margin
								idValues={idValues}
								type={type}
								service={formValues?.service}
								marginControls={marginControls}
								control={control}
								data={item}
								watch={watch}
							/>
							<Button
								onClick={handleSubmit(handleFormSubmit)}
							>
								{type === 'edit' ? 'update margin' : 'create margin'}
							</Button>
						</div>
					)
			}
			</div>

		</div>
	);
}

export default Create;
