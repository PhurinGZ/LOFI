
import React, { useState } from "react";
import MyEditor from "./editor";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Editor Modal</button>
      <div>
        <MyEditor isOpen={isModalOpen} handleClose={closeModal} />
      </div>
    </div>
  );
};

export default App;
