import styles from "./FileInput.module.css";
import { useState } from "react";

export default function FileInput({onFileChange}) {
  const [selectedImage, setSelectedImage] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      onFileChange(file);
    }
  }

  return (
    <div className={styles["input-controller"]}>
      <label htmlFor="avatar-input" className={styles["avatar-input"]}>
        {!selectedImage && <span>Upload your avatar here.</span>}
        {selectedImage && (
          <div className={styles["selected-image-container"]}>
            <img src={selectedImage} />
          </div>
        )}
      </label>
      <input
        type="file"
        name="avatar-input"
        id="avatar-input"
        accept=".png, .jpeg, .jpg"
        multiple={false}
        required
        style={{
          display: "none",
        }}
        onChange={handleFileChange}
      />
    </div>
  );
}
