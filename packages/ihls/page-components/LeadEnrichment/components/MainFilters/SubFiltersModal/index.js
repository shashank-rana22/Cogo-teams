import { Button, Modal } from '@cogoport/components';

import { getFieldController } from '../../../../../commons/Form/getFieldController';

import styles from './styles.module.css';

function SubFiltersModal({
	control = [], handleSubmit = () => {},
	handleClick = () => {}, onClickCancel = () => {},
	loading = false,
	sub_controls = [],
	watch = () => {}, show = false, onClickOutside = () => {},
}) {
	const enriched = watch('org_enrichment_status');

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
