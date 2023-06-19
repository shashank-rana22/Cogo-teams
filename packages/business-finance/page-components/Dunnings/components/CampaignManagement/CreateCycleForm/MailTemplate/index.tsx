import { AsyncSelect } from '@cogoport/forms';

import SegmentedControl from '../../../../../commons/SegmentedControl';

import Details from './Details';
import styles from './styles.module.css';

interface FormData {
	severityLevel?:string,
	templateData?:{ name?:string, subject?:string, body?:string[] },
}
interface Props {
	setFormData?:Function,
	formData?:FormData,
}

function MailTemplate({ formData, setFormData }:Props) {
	return (
		<div className={styles.container}>
			<div className={styles.severity}>
				<div><h4>Select Level Of Severity :</h4></div>
				<div
					style={{ margin: '0px 20px' }}
				>
					<SegmentedControl
						options={[
							{
								label : 'Low',
								value : '1',
							},
							{
								label : 'Medium',
								value : '2',
							},
							{
								label : 'High',
								value : '3',
							}]}
						activeTab={formData?.severityLevel}
						setActiveTab={(val:string) => { setFormData({ ...formData, severityLevel: val }); }}
						color="#ED3726"
						background="#FFEAAD"
					/>

				</div>
			</div>
			<div
				style={{ margin: '20px 0px' }}
			>
				<h4>Select Template</h4>
				<AsyncSelect
					name="template"
					asyncKey="list_dunning_templates"
					valueKey="name"
					initialCall
					value={formData?.templateData?.name}
					onChange={(id, object) => {
						setFormData((prev) => ({
							...prev,
							templateData: {
								name    : object?.name,
								subject : object?.subject,
								body    : object?.body,
								id      : object?.id,
							},
						}));
					}}
					placeholder="Select Template"
					size="sm"
					style={{ width: '40%' }}
				/>
			</div>

			<div className={styles.heading}>Email recipients</div>
			<div className={styles.section}>
				<div className={styles.keys}>From :</div>
				<div className={styles.recipient_values}>
					<Details text="Cogoport Finance Team" />
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.keys}>To :</div>
				<div className={styles.recipient_values}>
					<Details text="N/A" />
				</div>
			</div>

			<div className={styles.section}>
				<div className={styles.keys}>CC :</div>
				<div className={styles.recipient_values}>
					<Details text="N/A" />
				</div>
			</div>

			<div className={styles.heading_subject}>Email subject</div>
			<div className={styles.subject}>
				<Details
					text={formData?.templateData?.subject || 'Select template to prefill subject'}
				/>
			</div>

			<div className={styles.heading_body}>Email body</div>
			<div className={styles.subject}>
				<Details
					isBody
					bodyData={formData?.templateData?.body?.[0]}
				/>
			</div>

		</div>
	);
}
export default MailTemplate;
