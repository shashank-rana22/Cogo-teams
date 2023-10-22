/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack, IcMDelete } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { useGetPermission } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import Layout from '../../common/Layout';
import getModifiedControls from '../../helpers/getModifiedControls';
import getShowElements from '../../helpers/getShowElements';
// import ORGANIZATION_SUBTYPE_OPTIONS from '../../helpers/organization-subtype-oprions';
import useCreateMargin from '../../hooks/useCreateMargin';
import useGetActiveSubscription from '../../hooks/useGetActiveSubscription';
import useUpdateMargin from '../../hooks/useUpdateMargin';
import DeactiveModal from '../MarginValues/Buttons/DeactivateModal';

import AdvancedLabel from './components/AdvancedLabel';
import SubscriptionDiscounts from './components/SubscriptionDiscounts';
import DEFAULT_MARGIN_SLABS from './DEFAULT_MARGIN_SLABS';
import getFclControls from './extraControls/getFclControls';
import getFclCustomsControls from './extraControls/getFclCustomsControls';
import getLclFreightControls from './extraControls/getLclFreightControls';
import getLtlFreight from './extraControls/getLtlFreight';
import getControls from './getControls';
import Margin from './Margin';
import getMarginControls from './marginControls';
import styles from './styles.module.css';
import useGetHandleFormSubmit from './useGetHandleFormSubmit';

const agent_view = ['margin', 'across_all'];
const ONE = 1;
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
	const [showAdvancedForm, setShowAdvancedForm] = useState(false);

	const {
		control,
		watch,
		fields,
		setValue,
		formState: { errors = {} } = {},
		handleSubmit,
	} = useForm({
		defaultValues: { margin_slabs: DEFAULT_MARGIN_SLABS, ...rest, ...filters },
	});

	const formValues = watch();

	const { saasPlansData = {} } =	useGetActiveSubscription({
		organization_id   : formValues?.organization_id,
		organization_type : formValues?.organization_type,
		formValues,
	});

	const initialControls = getControls({
		type,
		marginType : formValues?.margin_type,
		partnerId  : formValues?.partner_id,
		item,
	});
	const marginControls = getMarginControls({ service: formValues?.service });

	const extraControls = useMemo(() => {
		let result = getFclControls({ type })[formValues?.service] || [];
		result = getFclCustomsControls({ type })[formValues?.service] || result;
		result = getLclFreightControls({ type })[formValues?.service] || result;
		result = getLtlFreight({ type })[formValues?.service] || result;
		return result;
	}, [type, formValues?.service]);

	const controls = useMemo(() => [...(initialControls || []), ...(extraControls || [])], [initialControls, extraControls]);

	const newControls = getModifiedControls({ controls, formValues });

	const showElements = getShowElements({
		allPresentControls : [...newControls, ...marginControls],
		formValues,
		item               : { ...(item || {}), ...(item?.filters || {}) },
		isConditionMatches,
		agent_view,
	});

	const { margin_slabs = [] } = formValues;
	const customFieldArrayControls = { margin_slabs: [] };
	useEffect(() => {
		margin_slabs?.forEach((_o, index) => {
			setValue(
				`margin_slabs.${index}.limit_currency`,
				margin_slabs[index]?.margin_values?.[GLOBAL_CONSTANTS.zeroth_index]?.currency,
			);
			if (index > GLOBAL_CONSTANTS.zeroth_index) {
				setValue(
					`margin_slabs.${index}.lower_limit`,
					Number(margin_slabs[index - ONE].upper_limit) + ONE,
				);
				setValue(
					`margin_slabs.${index}.limit_currency`,
					margin_slabs[index - ONE].limit_currency,
				);
			} else {
				setValue(`margin_slabs.${index}.lower_limit`, '0');
			}
		});
	}, [margin_slabs, setValue]);

	useEffect(() => {
		margin_slabs?.forEach((_o, index) => {
			if (index === GLOBAL_CONSTANTS.zeroth_index) {
				customFieldArrayControls.margin_slabs[index] = {
					lower_limit: { disabled: true },
				};
			}

			if (index > GLOBAL_CONSTANTS.zeroth_index) {
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

	const { handleFormSubmit = () => { } } = useGetHandleFormSubmit({
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

	const basicControls = newControls.filter(
		(ctrl) => !extraControls.some((ctrl2) => ctrl2.name === ctrl.name),
	);

	return (
		<div className={styles.container}>
			<div className={styles.header_wrap}>
				<Link href="/margins">
					<Button themeType="link">
						<IcMArrowBack style={{ width: '2em', height: '2em', marginRight: '4px' }} />
						<div className={styles.text}>
							{type === 'edit' ? 'EDIT MARGIN' : 'CREATE MARGIN'}
						</div>
					</Button>
				</Link>
				{type === 'edit' && (
					<Button themeType="secondary" onClick={() => setOpenModal(true)}>
						<IcMDelete
							style={{ width: '2em', height: '2em', marginRight: '4px' }}
						/>
						DEACTIVATE
					</Button>
				)}
			</div>

			<form onSubmit={handleSubmit(handleFormSubmit)} className={styles.sub_container}>
				<div className={styles.basic_layout_ontainer}>
					<Layout
						controls={basicControls}
						control={control}
						fields={fields}
						errors={errors}
						showElements={showElements}
						// customFieldArrayControls={customFieldArrayControls}
					/>
					{showAdvancedForm ? (
						<Layout
							controls={extraControls}
							control={control}
							fields={fields}
							errors={errors}
							showElements={showElements}
							// customFieldArrayControls={customFieldArrayControls}
						/>
					) : null}
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
						<Button
							onClick={() => setShowAdvancedForm(!showAdvancedForm)}
							disabled={!formValues?.service}
						>
							<AdvancedLabel showAdvancedForm={showAdvancedForm} />
						</Button>
					</div>
				</div>

				<div className={styles.hr_line} />

				{formValues.organization_type === 'channel_partner'
					&& formValues?.service ? (
						<SubscriptionDiscounts
							saasPlansData={saasPlansData}
							selectedService={formValues?.service}
						/>
					) : null}

				<Margin
					idValues={idValues}
					type={type}
					service={formValues?.service}
					marginControls={marginControls}
					control={control}
					data={item}
					watch={watch}
					setValue={setValue}
					errors={errors}
					// customFieldArrayControls={customFieldArrayControls}
					showElements={showElements}
				/>

				<div className={styles.btn_wrapper}>
					<Button
						size="lg"
						type="submit"
						onClick={handleSubmit(handleFormSubmit)}
					>
						{type === 'edit' ? 'Update margin' : 'Create margin'}
					</Button>
				</div>
			</form>

			{openModal && (
				<DeactiveModal
					type="edit"
					setOpenModal={setOpenModal}
					id={item?.id}
					openModal={openModal}
				/>
			)}
		</div>
	);
}

export default Create;
