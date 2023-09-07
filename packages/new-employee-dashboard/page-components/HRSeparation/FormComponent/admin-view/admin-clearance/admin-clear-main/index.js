import React from 'react';

import NotesHrbp from '../../common/notes-hr';
import Servicelist from '../../common/services-list';
import DatePicker from '../date-picker';

import styles from './styles.module.css';

// function ButtonChildren() {
// 	return (
// 		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// 			<IcMPlus />
// 		</div>
// 	);
// }

// function AccordionTitle() {
// 	return (
// 		<div className={styles.accordiontitle}>
// 			<div className={styles.accordionhead}>Services List</div>
// 			<div>
// 				<Button
// 					size="md"
// 					themeType="secondary"
// 				>
// 					<IcMPlus />
// 					Add Services
// 				</Button>

// 			</div>

// 		</div>
// 	);
// }

const SOURCE = 'admin-clearance';
function AdminClearMain({ control, errors }) {
	return (
		<div className={styles.containermain}>
			<div className={styles.title}>Admin Clareance</div>
			<div className={styles.subtitle}>Collection of company assets</div>
			<DatePicker control={control} errors={errors} />

			{/* <div className={styles.datediv}>
				<div className={styles.datehead}>Last Working Day</div>
			</div> */}

			{/* <div className={styles.container}>
				<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
					<span>Services List</span>

					<div className={styles.accordiontitle}>
						<Button
							size="md"
							themeType="secondary"
							className={styles.servicesbtn}
						>
							<IcMPlus />
							Add Services
						</Button>
						<IcMArrowDown
							width={16}
							height={16}
							className={show ? styles.caret_active : styles.caret_arrow}
						/>
					</div>

				</div>

				<div className={show ? styles.item_container : styles.item_container_closed}>
					<div className={styles.detail}>
						<div className={styles.label}>ID Card Collection</div>
						<Select
							size="md"
							value={idCardStatus}
							onChange={(value) => setIdCardStatus(value)}
							placeholder="Select Status"
							options={id_card_options}
						/>
					</div>

					<div className={styles.detail}>
						<div className={styles.label}>Access Card Collection</div>
						<Select
							size="md"
							value={accesscard}
							onChange={(value) => setaccesscard(value)}
							placeholder="Select Status"
							options={access_card_options}
						/>
					</div>

					<div className={styles.detail}>
						<div className={styles.label}>Parking Charges</div>
						<Input size="md" placeholder="Select Status" />
					</div>
					<div className={styles.detail}>
						<div className={styles.label}>Other Charges</div>
						<Input size="md" placeholder="Select Status" />
					</div>
					<div className={styles.detail}>
						<div className={styles.label}>Specify Other Charges</div>
						<Input size="md" placeholder="Select Status" />
					</div>
					<div className={styles.detail}>
						<div className={styles.label}>Company Assets</div>
						<Select
							size="md"
							value={companyAssetsStatus}
							onChange={(value) => setcompanyAssetsStatus(value)}
							placeholder="Select Status"
							options={company_assets}

						/>
					</div>
				</div>

			</div> */}
			<Servicelist source={SOURCE} />
			<NotesHrbp />

		</div>
	);
}

export default AdminClearMain;
