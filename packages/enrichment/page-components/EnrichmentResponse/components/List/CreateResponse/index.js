import { Button } from '@cogoport/components';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import { getCardHeaders } from '../../../../../constants/get-card-details';
import useCreateResponse from '../../../hooks/useCreateResponse';

import styles from './styles.module.css';

const cardHeading = getCardHeaders('form');

function CreateResponse(props) {
	const { loading, activeTab, type, setShowAddPoc } = props;

	const { handleSubmit, onSave, controls, control, errors } = useCreateResponse(props);

	return (
		<section className={styles.card}>
			<form onSubmit={handleSubmit(onSave)}>
				<div className={styles.card_header}>
					<div className={styles.card_header_icons}>
						{cardHeading[activeTab]?.icon}
					</div>

					<div>{cardHeading[activeTab]?.label}</div>
				</div>

				<div className={styles.row_container}>
					{controls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getFieldController(el.type);

						if (!Element) return null;

						return (
							<div style={el.style} className={styles.control_container}>
								<span className={styles.control_label}>{el.label}</span>

								<Element
									{...el}
									size="md"
									key={el.name}
									control={control}
									id={`${el.name}_input`}
								/>

								<div className={styles.error_message}>
									{errors?.[el.name]?.message}
								</div>
							</div>
						);
					})}
				</div>

				<div className={styles.card_footer}>
					{type === 'addPoc' && (
						<Button
							type="button"
							size="md"
							themeType="secondary"
							disabled={loading}
							className={styles.cancel_cta}
							onClick={() => setShowAddPoc(false)}
						>
							Cancel
						</Button>
					)}

					<Button
						type="submit"
						size="md"
						themeType="primary"
						disabled={loading}
					>
						Save
					</Button>
				</div>
			</form>
		</section>
	);
}

export default CreateResponse;
