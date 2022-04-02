import Modal from "../utils/ModalSecondary";
import Category from "../sidebar";

export default function SettingsModal({
  open,
  controller,
  categoryList,
  categoryTree,
  selectedCategoryId,
}) {
  return (
    <Modal //
      open={open}
      controller={controller}
      title="Categories"
    >
      <Category
        categoryList={categoryList}
        categoryTree={categoryTree}
        selectedCategoryId={selectedCategoryId}
      />
    </Modal>
  );
}
