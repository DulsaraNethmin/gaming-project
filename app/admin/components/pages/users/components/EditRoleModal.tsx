import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useRoleContext } from "@/context/RoleContext"; // Import the context

interface Role {
  id: string;
  name: string;
}

interface EditRoleModalProps {
  currentRole: Role | any;
  setShowModal: (show: boolean) => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  currentRole,
  setShowModal,
}) => {
  const { editRole } = useRoleContext(); // Destructure editRole from context
  const [newRole, setNewRole] = useState<string>("");

  // Set initial value of newRole when currentRole changes
  useEffect(() => {
    if (currentRole) {
      setNewRole(currentRole.name);
    }
  }, [currentRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newRole.trim() !== "") {
      try {
        await editRole(currentRole!.id, newRole.trim()); // Call editRole with ID and new name
        setShowModal(false); // Close the modal after successful edit
      } catch (error) {
        console.error("Failed to edit role:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center font-medium text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px]">
      <div className="relative w-4/5 bg-gradient-to-tr from-black from-15% to-[#0D6D49] p-[3em] rounded-md border border-[#19D38E] sm:w-auto">
        <button
          className="absolute top-[1em] right-[1em] text-[#00FFA1] text-[1.4em] hover:opacity-80 transition-opacity duration-100"
          onClick={() => setShowModal(false)}
        >
          <IoClose />
        </button>
        <h2 className="font-bold text-[1.5em] pb-[0.6em] border-b border-b-[#0D6D49]">
          Edit Role
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="my-[2.5em]">
            <p className="mb-[0.5em]">Name</p>
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border text-white border-[#D9D9D9] rounded w-full bg-transparent px-[1em] py-[0.5em] outline-none"
              required
            />
          </div>
          <div className="flex gap-x-[6%] justify-between sm:gap-x-[15%]">
            <p className="text-[0.8em]">
              Please review and ensure that all the details you have entered are
              correct before submitting.
            </p>
            <button
              type="submit" // Ensure button submits the form
              className="text-black font-semibold text-[1.1em] px-[1.5em] py-[0.5em] bg-[#0BDB45] rounded hover:opacity-90 transition-opacity duration-100"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
