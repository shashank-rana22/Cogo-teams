import { Button, FunnelStepper } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowBack, IcMDelete } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { useGetPermission } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Layout from '../../common/Layout';
import getShowElements from '../../helpers/getShowElements';
import useCreateMargin from '../../hooks/useCreateMargin';
import useUpdateMargin from '../../hooks/useUpdateMargin';
import DeactiveModal from '../MarginValues/Buttons/DeactivateModal';

import DEFAULT_MARGIN_SLABS from './DEFAULT_MARGIN_SLABS';
import getFclControls from './extraControls/getFclControls';
import getFclCustomsControls from './extraControls/getFclCustomsControls';
import getLclFreightControls from './extraControls/getLclFreightControls';
import getLtlFreight from './extraControls/getLtlFreight';
import getControls from './getControls';
import getHandleFormSubmit from './getHandleFormSubmit';
import Margin from './Margin';
import getMarginControls from './marginControls';
import styles from './styles.module.css';

const agent_view = ['margin', 'across_all'];
const ZERO = 0; const ONE = 1;
const items = [
	{ title: <div className={styles.stepper}>CUSTOMIZE YOUR DETAILS</div>, key: 'customize' },
	{ title: <div className={styles.stepper}>ADD THE MARGINS</div>, key: 'add' },
];

let initialCall = false;
function Create({ type = 'create', item = {} }) {
	const { filters = {}, ...rest } = item;
	const router = useRouter();
	const { agent_id } = useSelector(({ profile }) => ({
		agent_id: profile?.user?.id,
	}));

	const { isConditionMatches } = useGetPermission();
	const [activeKey, setActiveKey] = useState(isEmpty(item) ? 'customize' : 'add');
	const [idValues, setIdValues] = useState({ margin_slabs: DEFAULT_MARGIN_SLABS, ...item });
	const { onSubmit: submitForm } = useCreateMargin();
	const { onSubmit: updateForm } = useUpdateMargin();
	const [openModal, setOpenModal] = useState(false);
	const {
		control,
		watch,
		handleSubmit,
		fields,
		setValue,
		formState: { errors = {} } = {},
	} = useForm({ defaultValues: { margin_slabs: DEFAULT_MARGIN_SLABS, ...rest, ...filters } });

	const formValues = watch();
	const initialControls = getControls({
		type,
		marginType : formValues?.margin_type,
		partnerId  : formValues?.partner_id,
		item,
	});
	const marginControls = getMarginControls({ service: formValues?.service });

	const getAllControls = useCallback(() => {
		let extraControls = (getFclControls({ type })[formValues?.service] || []);
		extraControls = (getFclCustomsControls({ type })[formValues?.service] || extraControls);
		extraControls = (getLclFreightControls({ type })[formValues?.service] || extraControls);
		extraControls = (getLtlFreight({ type })[formValues?.service] || extraControls);
		const controls = [...(initialControls || []), ...(extraControls || [])];
		return controls;
	}, [initialControls, formValues?.service, type]);
	const controls = useMemo(() => getAllControls(), [getAllControls]);

	const showElements = getShowElements({
		allPresentControls : controls,
		formValues,
		item               : { ...(item || {}), ...(item?.filters || {}) },
		isConditionMatches,
		agent_view,
	});
	const { margin_slabs = [] } = formValues;
	const customFieldArrayControls = { margin_slabs: [] };
	useEffect(() => {
		margin_slabs?.forEach((_o, index) => {
			setValue(`margin_slabs.${index}.limit_currency`, margin_slabs[index]?.margin_values?.[ZERO]?.currency);
			if (index > ZERO) {
				setValue(`margin_slabs.${index}.lower_limit`, Number(margin_slabs[index - ONE].upper_limit) + ONE);
				setValue(`margin_slabs.${index}.limit_currency`, margin_slabs[index - ONE].limit_currency);
			} else {
				setValue(`margin_slabs.${index}.lower_limit`, '0');
			}
		});
	}, [margin_slabs, setValue]);

	useEffect(() => {
		margin_slabs?.forEach((_o, index) => {
			if (index === ZERO) {
				customFieldArrayControls.margin_slabs[index] = {
					lower_limit: { disabled: true },
				};
			}

			if (index > ZERO) {
				customFieldArrayControls.margin_slabs[index] = {
					lower_limit: { disabled: true },
				};
				customFieldArrayControls.margin_slabs[index - ONE] = {
					lower_limit : { disabled: true },
					upper_limit : { disabled: true },
				};
			}
		});
	}, [margin_slabs, customFieldArrayControls?.margin_slabs]);

	useEffect(() => {
		if (!initialCall) {
			setIdValues(controls.map((dat) => ({ [dat]: '' })));
			initialCall = true;
		}
	}, [controls, setIdValues, formValues?.service]);

	const handleFormSubmit = getHandleFormSubmit({
		activeKey,
		setActiveKey,
		formValues,
		item,
		setIdValues,
		type,
		agent_id,
		router,
		updateForm,
		submitForm,
	});

	const handleSetActive = (key) => {
		if (key === 'customize') {
			setActiveKey(key);
		} else handleSubmit(() => setActiveKey(key))();
	};

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
			<div className={styles.heading_button}>
				{type === 'edit' ? <div className={styles.text}>EDIT MARGIN</div>
					: <div className={styles.text}>CREATE NEW MARGIN</div>}
				{type === 'edit' && (
					<Button themeType="secondary" onClick={() => setOpenModal(true)}>
						<IcMDelete
							style={{ width: '2em', height: '2em', marginRight: '4px' }}
						/>
						deactivate
					</Button>
				)}
			</div>
			{openModal && (
				<DeactiveModal
					type="edit"
					setOpenModal={setOpenModal}
					id={item?.id}
					openModal={openModal}
				/>
			)}
			<div className={styles.sub_container}>
				<FunnelStepper
					className={styles.stepper_container}
					active={activeKey}
					setActive={handleSetActive}
					items={items}
				/>
				{
					activeKey === 'customize' ? (
						<div>
							<Layout
								controls={controls}
								control={control}
								fields={fields}
								errors={errors}
								showElements={showElements}
								customFieldArrayControls={customFieldArrayControls}
							/>
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
									errors={errors}
									customFieldArrayControls={customFieldArrayControls}
								/>
								<div className={styles.margin_button}>
									<Button
										onClick={handleSubmit(handleFormSubmit)}
									>
										{type === 'edit' ? 'update margin' : 'create margin'}
									</Button>
								</div>
							</div>
						)
				}
			</div>

		</div>
	);
}

export default Create;
