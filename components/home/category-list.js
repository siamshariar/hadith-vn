import Grid from "@mui/material/Grid";
import Container from "../core/container";
import CategoryCard from "./category-card";
import styles from "./category-list.module.scss";

export default function CategoryList({ categories }) {
  return (
    <div className={styles.wrap}>
      <Container>
        <Grid container className={styles.gridContainer}>
          {categories &&
            categories.map((category) => (
              <Grid key={category.id} className={styles.gridItem}>
                <CategoryCard category={category} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
