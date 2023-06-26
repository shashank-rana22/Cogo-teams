import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from '../../../configurations/create-instant-reply';
import { getFieldController } from '../../../utils/getFieldController';

import styles from './styles.module.css';

function CreateTemplateForm({
	createTemplate,
	createLoading,
	refetch,
	setOpenCreateReply,
	setActiveCard,
	isDefaultOpen,
}) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const sucessCallBackFunc = () => {
		setOpenCreateReply(false);
		refetch();
		reset({ title: '', content: '' });
	};

	const onCreateClick = (data) => {
		createTemplate({ data, sucessCallBackFunc });
	};

	return (
		<>
			<div>
				{controls.map((eachControl) => {
					const { name, label, type } = eachControl;
					const Element = getFieldController(type);
					if (!Element) {
						return null;
					}
					return (
						<div key={name}>
							<div className={styles.label}>{label}</div>
							<Element {...eachControl} control={control} />
							<div className={styles.error_text}>
								{errors?.[name] && (errors?.[name]?.message || 'This is Required')}
							</div>
						</div>
					);
				})}
			</div>
			<div className={styles.create_footer}>
				<Button
					themeType="tertiary"
					size="md"
					className={styles.button_styles}
					onClick={() => {
						setOpenCreateReply(false);
						setActiveCard({ show: isDefaultOpen, data: {} });
					}}
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					size="md"
					onClick={handleSubmit(onCreateClick)}
					loading={createLoading}
				>
					Create
				</Button>
			</div>
		</>
	);
}
export default CreateTemplateForm;
