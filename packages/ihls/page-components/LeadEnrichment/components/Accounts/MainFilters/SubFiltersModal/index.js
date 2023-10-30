import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../../commons/Form/getFieldController';
import sub_controls from '../../../../configurations/sub-filter-controls';

import getDefaultFormValues from './get-default-form-values';
import styles from './styles.module.css';

const STRING_BOOL_MAPPINGS = {
	true  : true,
	false : false,
	null  : null,
};

function SubFiltersModal({
	onClickCancel = () => {},
	loading = false,
	params = {},
	setParams = () => {},
	show = false,
	onClickOutside = () => {},
}) {
	const DEFAULT_VALUES = getDefaultFormValues(params?.filters);
	const { control, handleSubmit, watch } = useForm({ defaultValues: DEFAULT_VALUES });

	const enriched = watch('is_user_enriched');

	const getFormattedParam = (param_attr) => {
		const formatted_attr = (param_attr || []).map((item) => STRING_BOOL_MAPPINGS[item] || item);
		return formatted_attr;
	};

	const handleClick = async (formValues) => {
		const {
			segment,
			registration_type,
			platform_lifecycle_stage,
			is_channel_partner,
			min_lead_score,
			is_user_enriched,
			is_mobile_present,
			is_email_present,
			is_mobile_bounce_check,
			is_email_bounce_check,
			is_mobile_verified,
			is_email_verified,
			contact_count,
			shipment_count,
			lead_source,
		} = formValues;

		const formatted_is_email_bounce_check = getFormattedParam(is_email_bounce_check);
		const formatted_is_mobile_bounce_check = getFormattedParam(is_mobile_bounce_check);
		const formatted_is_mobile_verified = getFormattedParam(is_mobile_verified);
		const formatted_is_email_verified = getFormattedParam(is_email_verified);

		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				platform_lifecycle_stage: platform_lifecycle_stage && !isEmpty(platform_lifecycle_stage)
					? platform_lifecycle_stage : undefined,
				is_channel_partner : is_channel_partner ? STRING_BOOL_MAPPINGS[is_channel_partner] : undefined,
				segment            : segment && !isEmpty(segment) ? segment : undefined,
				registration_type  : registration_type && !isEmpty(registration_type) ? registration_type : undefined,
				is_user_enriched   : is_user_enriched
					? STRING_BOOL_MAPPINGS[is_user_enriched] : undefined,
				lead_source       : lead_source || undefined,
				objective_filters : {
					...previousParams?.filters?.objective_filters,
					min_lead_score: min_lead_score || undefined,
				},
				users_filters: {
					is_mobile_present: is_mobile_present
						? STRING_BOOL_MAPPINGS[is_mobile_present] : undefined,
					is_email_present: is_email_present
						? STRING_BOOL_MAPPINGS[is_email_present] : undefined,
					is_mobile_bounce_check: !isEmpty(formatted_is_mobile_bounce_check)
						? formatted_is_mobile_bounce_check : undefined,
					is_email_bounce_check: !isEmpty(formatted_is_email_bounce_check)
						? formatted_is_email_bounce_check : undefined,
					is_mobile_verified: !isEmpty(formatted_is_mobile_verified)
						? formatted_is_mobile_verified : undefined,
					is_email_verified: !isEmpty(formatted_is_email_verified)
						? formatted_is_email_verified : undefined,
					contact_count: contact_count || undefined,
				},
				shipment_filters: {
					...previousParams?.filters?.shipment_filters,
					shipment_count: shipment_count || undefined,
				},
			},
		}));

		onClickOutside();
	};

	return (
		<Modal size="md" show={show} onClose={onClickOutside} placement="center">
			<Modal.Header title="More filters" />
			<div className={styles.modal_container}>
				<Modal.Body>
					<div>
						{Object.entries(sub_controls).map(([key, values]) => {
							if (key === 'user_filters' && (enriched === 'false' || !enriched)) {
								return null;
							}
							return (
								<div key={key}>
									<div className={styles.filter_title}>{values.title}</div>
									<div className={styles.container}>
										{values.fields.map((item) => {
											const ele = { ...item };
											const { name, displayName, placeholder, type, width, options } = item;
											const Element = getFieldController(type);
											return (
												<div key={name} className={styles.input_field}>
													<span className={styles.label}>{displayName}</span>
													<Element
														{...ele}
														prefix={null}
														placeholder={placeholder}
														options={options}
														isClearable
														style={{ width }}
														control={control}
														key={name}
														size="sm"
													/>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</Modal.Body>
			</div>
			<Modal.Footer>
				<div className={styles.modal_footer}>
					<Button
						disabled={loading}
						onClick={handleSubmit(handleClick)}
						size="md"
						themeType="primary"
					>
						Apply

					</Button>
					<Button onClick={onClickCancel} size="md" themeType="secondary">Cancel</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default SubFiltersModal;
