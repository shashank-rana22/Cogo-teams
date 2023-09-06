import { DatepickerController } from '@cogoport/forms';
import { IcMCalendar } from '@cogoport/icons-react';
import React from 'react';
import styles from './styles.module.css';
function DatePicker({ control, errors }) {

    return (
        <div className={styles.container}>
            <div className={styles.heading}>Last Working Day</div>
            <div className={styles.dates}>
                <IcMCalendar width={20} height={20} className={styles.icon} />
                <DatepickerController
                    placeholder="Select Date"
                    control={control}
                    dateFormat="dd/MM/yyyy"
                    name="date"
                    className={styles.date_picker}
                    rules={{ required: 'this is required' }}
                />
            </div>
        </div>
    );

}

 

export default DatePicker;