import styles from "./styles.module.css";

function BadgesList() {
  const BadgeUrl =
    "https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/nautical_ninja_bronze.svg";

  const starUrl =
    "https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/star-icon.svg";
  return (
    <div className={styles.badge_list_container}>
      <p className={styles.heading}>Badges List</p>
      <div className={styles.badges_container}>
        <div className={styles.container}>
          <img className={styles.badge} src={BadgeUrl} />
          <div className={styles.stars_container}>
            <img className={styles.small_star} src={starUrl} />
            <img className={styles.small_star} src={starUrl} />
            <img className={styles.small_star} src={starUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgesList;
