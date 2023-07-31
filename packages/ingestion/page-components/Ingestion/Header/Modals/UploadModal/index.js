import { getElementController } from '../../../../../utils/get-element-controls';
import uploadControls from '../../../../../utils/upload-controls';

import styles from './styles.module.css';

function UploadModal({
	uploadData = {}, formProps = {},

}) {
	const { control, formState: { errors } } = formProps;
	const { final_modal_header:finalModalHeading } = uploadData;

	return (

		<div>
			<div style={{ margin: '0 0 4px 16px' }}>
				{finalModalHeading || '___'}
			</div>

			<div className={styles.modal_container}>
				{uploadControls.map((controlItem) => {
					const el = { ...controlItem };
					const Element = getElementController(el.component);
					if (!Element) return null;
					return (
						<div key={el.name} style={el.style} className={styles.control_container}>
							<span className={styles.control_label}>
								{el.label}
								{!el?.rules?.required

									? (<div className={styles.optional}>optional</div>) : null}

							</span>
							<Element
								{...el}
								size="md"
								key={el.name}
								control={control}
								className={styles.upload}
							/>

							<div className={styles.error_message}>
								{errors?.[el.name]?.message}
							</div>
						</div>
					);
				})}
			</div>

		</div>

	);
}

export default UploadModal;
