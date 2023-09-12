import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef, useMemo } from 'react';

import Layout from '../../../../common/Layout';
import getOptions from '../../../../config/service-to-trade-type-mappings';
import getShowElements from '../../../../hooks/getShowElements';
import useCreateUpdateTnc from '../../../../hooks/useCreateUpdateTnc';
import useValidateTermsAndCondition from '../../../../hooks/useValidateTermsAndCondition';

import getControls from './controls';
import CONTROLS_FORM_TYPE_MAPPING from './formTypesControls.json';
import styles from './styles.module.css';

function Form({
	item = {}, tncLevel = 'basicInfo', setTncLevel = () => {}, organizationId = null, refetch = () => {},
	setEditTncModalId = () => {}, setShowModal = () => {}, setAddShowModal = () => {}, setShowEdit = () => {},
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
	const formValue = watch();
	const watchTradeType = watch('trade_type');
	const watchService = watch('service');

	const {
		service,
		trade_type,
	} = formValue;
	const newControl = filteredControls.map((field) => {
		const { name } = field;
		let newField = { ...field };

		if (name === 'country_id') {
			newField = {
				...newField,
				label:
				(trade_type === 'import' && 'Import To')
				|| (trade_type === 'export' && 'Export From')
				|| 'Country',
			};
		}
		if (name === 'trade_type') {
			newField = {
				...newField,
				options: getOptions[service],
			};
		}
		return { ...newField };
	});
	const { onSubmit, loading } = useCreateUpdateTnc({
		editTncModalId : item.id,
		setEditTncModalId,
		setShowModal,
		setAddShowModal,
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
					<>
						<Button
							className="primary md"
							disabled={validateLoading}
							onClick={() => { setAddShowModal(false); setShowEdit(false); }}
							style={{ marginLeft: '8px', textTransform: 'capitalize' }}
						>
							Cancel
						</Button>
						<Button
							className="primary md"
							disabled={validateLoading}
							onClick={() => (item.id
								? setTncLevel('termsAndCondition') : onValdidateSubmit(formValue))}
							style={{ marginLeft: '8px', textTransform: 'capitalize' }}
						>
							Proceed
						</Button>
					</>
				)
					: (
						<>
							<Button
								themeType="secondary"
								style={{ marginRight: 8 }}
								onClick={() => setTncLevel('basicInfo')}
							>
								Back
							</Button>

							<Button disabled={loading} onClick={() => onSubmit(formValue)}>Submit</Button>
						</>
					)}
			</div>
		</div>
	);
}

export default forwardRef(Form);
