import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef, useMemo } from 'react';

import Layout from '../../../../common/Layout';
import useCreateUpdateTnc from '../../../../hooks/useCreateUpdateTnc';
import useValidateTermsAndCondition from '../../../../hooks/useValidateTermsAndCondition';
import getShowElements from '../../../../utlis/getShowElements';
import getOptions from '../../../../utlis/service-to-trade-type-mappings';

import getControls from './controls';
import CONTROLS_FORM_TYPE_MAPPING from './formTypesControls.json';
import styles from './styles.module.css';

function Form({
	item = {}, tncLevel = 'basicInfo', setTncLevel = () => {}, organizationId = null, refetch = () => {},
	setEditTncModalId = () => {}, setShowModal = () => {},
}, ref) {
	const controls = getControls({ item });
	const DEFAULT_VALUES = {};
	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, handleSubmit, formState:{ errors = {} }, watch } = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	const filteredControls = useMemo(() => {
		const controlNames = CONTROLS_FORM_TYPE_MAPPING[tncLevel] || [];

		return controls.filter((ctrl) => controlNames.includes(ctrl.name));
	}, [tncLevel, controls]);

	const watchShippingLineId = watch('shipping_line_id');
	const watchCountry = watch('country');
	const watchAirlineId = watch('airline_id');
	const watchTradeType = watch('trade_type');
	const watchService = watch('service');
	const watchPayingPartyCountry = watch('paying_party_country_ids');
	const watchDescription = watch('description');
	const value = {
		service                  : watchService,
		shipping_line_id         : watchShippingLineId,
		airline_id               : watchAirlineId,
		trade_type               : watchTradeType,
		country_id               : watchCountry,
		paying_party_country_ids : watchPayingPartyCountry,
		description              : watchDescription,
	};
	const newControl = filteredControls.map((field) => {
		const { name } = field;
		let newField = { ...field };

		if (name === 'country_id') {
			newField = {
				...newField,
				label:
				(watchTradeType === 'import' && 'Import To')
				|| (watchTradeType === 'export' && 'Export From')
				|| 'Country',
			};
		}
		if (name === 'trade_type') {
			newField = {
				...newField,
				options: getOptions[watchService],
			};
		}
		return { ...newField };
	});
	const { onSubmit, loading } = useCreateUpdateTnc({
		editTncModalId : item.id,
		setEditTncModalId,
		setShowModal,
		refetch,
		setTncLevel,
		editFormValue  : item,
		action         : item.id ? 'update' : 'create',
		organizationId : null,
	});

	const { onValdidateSubmit, validateLoading } = useValidateTermsAndCondition({
		setTncLevel,
		organizationId,
		setEditTncModalId,
	});
	const onError = (err) => (err);

	useImperativeHandle(ref, () => ({
		formSubmit() {
			handleSubmit(onSubmit, onError)();
		},
	}));

	const showElements = getShowElements({ service: watchService, trade_type: watchTradeType, controls });

	return (
		<div>
			{' '}
			<Layout controls={newControl} control={control} errors={errors} showElements={showElements} />
			<div className={styles.modal_footer}>
				{tncLevel === 'basicInfo' ? (
					<Button
						className="primary md"
						disabled={validateLoading}
						onClick={() => (item.id
							? setTncLevel('termsAndCondition') : onValdidateSubmit(value))}
						style={{ marginLeft: '8px', textTransform: 'capitalize' }}
					>
						Proceed
					</Button>
				)
					: (
						<>
							<Button
								themeType="secondary"
								style={{ marginRight: 8 }}
								onClick={() => setTncLevel('basicInfo')}
							>
								back
							</Button>

							<Button disabled={loading} onClick={() => onSubmit(value)}>Submit</Button>
						</>
					)}
			</div>
		</div>
	);
}

export default forwardRef(Form);
