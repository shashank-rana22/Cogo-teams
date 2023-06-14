import SegmentedControl from '../../../../../commons/SegmentedControl';

import Details from './Details';
import styles from './styles.module.css';

interface Props {
	setFormData?:Function,
	formData?:{ severityLevel?:string }
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
								value : 'low',
							},
							{
								label : 'Medium',
								value : 'medium',
							},
							{
								label : 'High',
								value : 'high',
							}]}
						activeTab={formData?.severityLevel}
						setActiveTab={(val:string) => { setFormData({ ...formData, severityLevel: val }); }}
						color="#ED3726"
						background="#FFEAAD"
					/>

				</div>
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
				<Details text="Prefilled Subject here" />
			</div>

			<div className={styles.heading_body}>Email body</div>
			<div className={styles.subject}>
				<Details
					isBody
				/>
			</div>

		</div>
	);
}
export default MailTemplate;
