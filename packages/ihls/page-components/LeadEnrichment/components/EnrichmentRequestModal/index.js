import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import FieldArray from '../../../../commons/Form/FieldArray';
import { getFieldController } from '../../../../commons/Form/getFieldController';
import constraint_controls from '../../configurations/enrichment-request-constraint-controls';
import enrichment_request_controls from '../../configurations/enrichment-request-controls';
import useCreateEnrichmentRequest from '../../hooks/useCreateEnrichmentRequest';

import styles from './styles.module.css';

function EnrichmentRequestModal({
	lead_count = null,
	checkedRowsId = [],
	showRequest = false,
	setShowRequest = () => {}, params = {},
}) {
	const {
		loading,
		control,
		handleSubmit,
		errors,
		watch,
		reset,
		onSave = () => {},
	} = useCreateEnrichmentRequest({ setShowRequest, params, checkedRowsId });

	const mode = watch('mode');
	const select_first = watch('select_first');

	const countValue = () => {
		let show_count = null;
		if (lead_count) { show_count = lead_count; }
		if (select_first) { show_count = select_first; }
		return show_count;
	};

	const onCloseRequest = () => {
		setShowRequest(false);
		reset();
	};

	return (
		<Modal size="sm" show={showRequest} onClose={onCloseRequest} placement="center">
			<Modal.Header title={(
				<div className={styles.modal_header}>
					<div>
						Enrichment Request
					</div>
					<div className={styles.lead_count_div}>
						Total count: -
						{` ${countValue()}`}
					</div>
				</div>
			)}
			/>
			<Modal.Body>
				{(enrichment_request_controls || []).map((item) => {
					const { name, type, displayName } = item;
					if (name === 'select_first' && mode !== 'select_first') {
						return null;
					}
					const Element = getFieldController(type);
					if (!Element) return null;
					return (
						<div key={name} className={styles.input_field}>
							{displayName}
							<Element
								{...item}
								name={name}
								isClearable
								prefix={null}
								control={control}
								key={name}
								size="sm"
							/>
							{!isEmpty(errors) ? (
								<div className={styles.error_message}>
									{errors[name]?.message}
								</div>
							) : null}
						</div>
					);
				})}
				<div className={styles.field_array}>
					Add Constraints
					<FieldArray
						name="constraints"
						control={control}
						controls={constraint_controls}
						error={errors}
						showElement
						buttonText=""
						size="sm"
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_div}>
					<Button onClick={handleSubmit(onSave)} loading={loading}>Save</Button>
					<Button themeType="secondary" onClick={onCloseRequest}>Close</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default EnrichmentRequestModal;
