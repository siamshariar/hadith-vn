import Modal from "./modal";
import Category from "../sidebar";

export default function SettingsModal({ open, controller, categories }) {
  return (
    <Modal //
      open={open}
      controller={controller}
      title="Categories"
    >
      <Category categories={categories} />
    </Modal>
  );
}
