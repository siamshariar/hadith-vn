import Grid from "@material-ui/core/Grid";
import Container from "../core/container";
import CategoryCard from "./category-card";
import styles from "./category-list.module.scss";

export default function CategoryList({ categories }) {
  return (
    <div className={styles.wrap}>
      <Container>
        <Grid container spacing={2}>
          {categories &&
            categories.map((category) => (
              <Grid key={category.id} item xs={12} md={6} lg={4}>
                <CategoryCard category={category} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
