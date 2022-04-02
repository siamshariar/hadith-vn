import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./arabic-dialog.module.scss";

export default function ArabicDialog() {
  const { view, changeView } = useContext(SettingsContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const arabicDialog = localStorage.getItem("arabicDialog");
    if (arabicDialog === null) {
      setOpen(true);
      localStorage.setItem("arabicDialog", "opened");
    }
  }, []);

  const handleClickYes = () => {
    const newView = { ...view, ["arabic"]: true };
    changeView(newView);
    setOpen(false);
  };

  const handleClickNo = () => {
    const newView = { ...view, ["arabic"]: false };
    changeView(newView);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClickYes}
      //aria-labelledby="alert-dialog-title"
      //aria-describedby="alert-dialog-description"
      classes={{
        paper: styles.paper,
      }}
    >
      <DialogTitle
        //id="alert-dialog-title"
        classes={{
          root: styles.title,
        }}
      >
        Bạn có muốn hiển thị tiếng Ả rập không?
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          //id="alert-dialog-description"
          classes={{
            root: styles.desc,
          }}
        >
          {
            "Bạn có thể thay đổi hiển thị trong phần cài đặt 'Settings -> View'."
          }
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClickNo} className={styles.btn}>
          Không
        </Button>
        <Button onClick={handleClickYes} className={styles.btn}>
          Đúng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
