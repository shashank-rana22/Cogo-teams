import { cl } from '@cogoport/components';

import styles from './styles.module.css';

export function ExtraHardCodeData() {
	return (
		<>
			<div className={cl`${styles.mt_40} ${styles.font_md}`}>
				Kindly submit the ORIGINAL BILL OF LADING with endorsements to release
				the shipment
			</div>
			<div className={styles.font_md}>
				the above-mentioned vessel is expected to arrive on or about: 26-JUN-21
				at CHENNAI
			</div>
			<div className={cl`${styles.font_md} ${styles.mt_7}`}>
				Kindly arrange to present the original Bill of Lading & Freight
				Certificate (if it is Collect Shipment) and obtain a delivery order
				against payment of necessary charges by DEMAND DRAFT. Please note we
				will not hold the FCL Container(s) in the Terminal beyond 3 days or as
				specified by the Terminal and or Carrier from the day of vessel arrival.
				We will move the container to off-Dock CFS after completion of free-days
				under your cost and risk. Looking forward to your speedy clearance of
				cargo.
			</div>
			<div className={cl`${styles.font_md_wt} ${styles.mt_28}`}>
				PENALTY SLABS FOR LATE COLLECTION OF DELIVERY ORDER
			</div>
			<div className={cl`${styles.font_md} ${styles.mt_4}`}>
				Upto14 days : No fine (starting from the devanning date).
			</div>
			<div className={styles.font_md}>Between 15-30 days: Rs.1500/BL</div>
			<div className={styles.font_md}>Between 31-60 days: Rs.2500/BL</div>
			<div className={styles.font_md}>Above 61 days: Rs.6000/BL</div>

			<div className={cl`${styles.font_md_wt} ${styles.mt_40}`}>
				For COGO FREIGHT PVT LTD
			</div>

			<div className={cl`${styles.font_md} ${styles.mt_4}`}>
				A/C Name : COGO FREIGHT PRIVATE LIMITED
			</div>
			<div className={styles.font_md}>
				Bank Name : RBL BANK A/C No: 409000876343
			</div>
			<div className={styles.font_md}>
				Address : ONE INDIA BULLS CENTRE, 3RD FLOOR, MUMBAI -400013
			</div>
			<div className={styles.font_md}>IFSC Code – RATN0000088</div>
			<div className={cl`${styles.font_md} ${styles.mt_30}`}>
				Please note that cargoes remaining undelivered for 30 days from the date
				of arrival will be listed for auction and will be duly auctioned upon
				completion of Customs & CFS Formalities
			</div>
		</>
	);
}
