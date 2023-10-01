import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import FieldArray from '../../../../../commons/Form/FieldArray';
import { getFieldController } from '../../../../../commons/Form/getFieldController';
import constraint_controls from '../../../configurations/enrichment-request-constraint-controls';
import enrichment_request_controls from '../../../configurations/enrichment-request-controls';
import useCreateEnrichmentRequest from '../../../hooks/useCreateEnrichmentRequest';

import styles from './styles.module.css';

function EnrichmentRequestModal({
	lead_count = null,
	checkedRowsId = [],
	showRequest = false,
	onCloseModal = () => {}, params = {},
}) {
	const {
		loading,
		control,
		handleSubmit,
		errors,
		watch,
		reset,
		onSave = () => {},
	} = useCreateEnrichmentRequest({ onCloseModal, params, checkedRowsId });

	const mode = watch('mode');
	const select_first = watch('select_first');
	const enriched_filter_present = params?.filters?.is_user_enriched === false;

	const countValue = () => {
		let show_count = checkedRowsId.length || lead_count || null;
		if (mode === 'checked') {
			show_count = checkedRowsId.length;
		} else if (mode === 'select_first' && select_first) {
			show_count = select_first;
		} else if (mode === 'api_call') {
			show_count = lead_count;
		}
		return show_count;
	};

	const onCloseRequest = () => {
		onCloseModal();
		reset();
	};

	return (
		<Modal style={{ width: '35%' }} show={showRequest} onClose={onCloseRequest} placement="center">
			<Modal.Header title={(
				<div className={styles.modal_header}>
					<div>
						Enrichment Request
					</div>
					<div className={styles.lead_count_div}>
						Total leads: -
						{` ${countValue()}`}
					</div>
				</div>
			)}
			/>
			<Modal.Body>
				<div className={styles.body_container}>
					{!enriched_filter_present
						? (
							<div className={styles.info_message}>
								**The list may contain enriched leads, apply filter to get not enriched leads.
							</div>
						)
						: null}
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
