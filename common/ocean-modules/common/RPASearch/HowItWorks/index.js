import { Button } from '@cogoport/components';
import { IcMArrowNext, IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function HowItWorks({ setTask }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div
					className={styles.back_button}
					role="button"
					tabIndex={0}
					onClick={() => {
						setTask('search_box');
					}}
				>
					<IcMArrowBack style={{ width: '1.5em', height: '1.5em' }} />
				</div>
				<div className={styles.heading}>HOW IT WORKS</div>
			</div>

			<div className={styles.text}>
				We are constantly improving our systems to give you a seamless
				experience via Machine Learning and AI. RPA is reading all the documents
				which are coming at operations@cogoport.com or zoho and showing them
				here. You can search your mails by subject, name, document number or
				document name and upload them directly.
			</div>

			<div className={styles.text}>
				The working of RPA (Robotic Process Automation) depends on all the mails
				that you receive at operations@cogoport.com or zoho (for maersk), Once
				mail arrives at operations the flow goes this way.
			</div>

			<div className={styles.boxes}>
				<div className={styles.box}>RPA Read Mails (operations@cogoport.com)</div>
				<div className={styles.arrow}><IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} /></div>

				<div className={styles.box}>Classifies Mails</div>
				<div className={styles.arrow}><IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} /></div>

				<div className={styles.box}>Pass it to Cogo Lens</div>
				<div className={styles.arrow}><IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} /></div>

				<div className={styles.box}>Format mails</div>
				<div className={styles.arrow}><IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} /></div>

				<div className={styles.box}>Notify corresponding stakeholder</div>
				<div className={styles.arrow}><IcMArrowNext style={{ width: '1.5em', height: '1.5em' }} /></div>

				<div className={styles.box}>Get visible on this Search Box</div>
			</div>

			<div className={styles.text}>
				<span style={{ color: 'red', fontWeight: 'bold' }}>Important Note </span>
				-&gt; Don&apos;t
				miss out on automations and waste your time checking emails for docs and
				other stuff to update them on the platform, you might be having other
				email ids upon which you are getting shipment updates other than
				operations@cogoport.com. Please let us know in
				&nbsp;
				<span
					className={styles.feedback_click}
					role="button"
					tabIndex={0}
					onClick={() => setTask('feed_back')}
				>
					feedback
				</span>
				&nbsp;
				section and leave the rest to us in automating tasks, invoices, shipment
				updates for all the shipments going on at the Cogoport platform. None of
				your personal mails will be exposed only the ones you will provide
				access to will be read. In
				&nbsp;
				<span
					className={styles.feedback_click}
					role="button"
					tabIndex={0}
					onClick={() => setTask('feed_back')}
				>
					feedback
				</span>
				&nbsp;
				section just provide your email and we will automate all your shipment
				journey. You just sit back and relax.
			</div>

			<div className={styles.cancel_button}>
				<Button
					onClick={() => {
						setTask('search_box');
					}}
				>
					Cancel
				</Button>
			</div>

		</div>
	);
}

export default HowItWorks;
