import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useImperativeHandle, forwardRef, useMemo } from 'react';

import Layout from '../../../../common/Layout';
import SERVICE_TRADE_TYPE_OPTION_MAPPING from '../../../../config/service-to-trade-type-mappings';
import getShowElements from '../../../../hooks/getShowElements';
import useCreateUpdateTnc from '../../../../hooks/useCreateUpdateTnc';
import useValidateTermsAndCondition from '../../../../hooks/useValidateTermsAndCondition';

import getControls from './controls';
import CONTROLS_FORM_TYPE_MAPPING from './formTypesControls.json';
import styles from './styles.module.css';

const LABEL_MAPPING = {
	import  : 'Import To',
	export  : 'Export From',
	default : 'Country',
};
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

	const { service, trade_type } = watch();

	filteredControls.forEach((ctrl, index) => {
		if (ctrl?.name === 'country_id') {
			filteredControls[index].label = LABEL_MAPPING?.[trade_type] || LABEL_MAPPING.default;
		}

		if (ctrl?.name === 'trade_type') {
			filteredControls[index].options = SERVICE_TRADE_TYPE_OPTION_MAPPING[service] || [];
		}
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

	const showElements = getShowElements({ service, trade_type, controls });

	return (
		<div>
			{' '}
			<Layout controls={filteredControls} control={control} errors={errors} showElements={showElements} />
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
								? setTncLevel('termsAndCondition') : handleSubmit(onValdidateSubmit))}
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

							<Button disabled={loading} onClick={() => handleSubmit(onSubmit())}>Submit</Button>
						</>
					)}
			</div>
		</div>
	);
}

export default forwardRef(Form);
