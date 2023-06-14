import styles from './styles.module.css'

function Card({singleRateCardData,index}){
    console.log(singleRateCardData,'singleCardData')
    return (
       <div className={styles.container}>
            <div className={styles.left_section}>
                {index+1}
            </div>
            <div className={styles.right_section}>
                <div className={styles.upper_section}>
                    <div className={styles.upper_left_section}>
                        <div>
                            {singleRateCardData}
                        </div>
                    </div>
                    <div className={styles.upper_right_section}>
                        right
                    </div>
                </div>
                <div className={styles.lower_section}>
                        lower
                </div>
            </div>
       </div>
    )
}

export default Card;