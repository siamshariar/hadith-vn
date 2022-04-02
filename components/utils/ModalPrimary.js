import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./ModalPrimary.module.scss";
import css from "../core/scrollbar.module.scss";

const style = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 500,
    maxHeight: "85vh",
    maxWidth: "85vw",
    bgcolor: "var(--bg11)",
    boxShadow: 24,
    p: 0,
    paddingTop: 1,
    paddingBottom: 1,
  },
  content: {
    marginTop: 2,
  },
};

const PrimaryModal = ({ open, closer, title, content }) => {
  // const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    closer(false)(e);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      // aria-labelledby="modal-modal-title"
      // aria-describedby="modal-modal-description"
    >
      <Box sx={style.wrapper}>
        <div className={`${css.scrollbar} ${styles.scrollbar}`}>
          <Typography variant="h6" component="h2">
            <p className={styles.title}>{title}</p>
          </Typography>
          <Typography sx={style.content} component="div">
            {content}
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default PrimaryModal;
