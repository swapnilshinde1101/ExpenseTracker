import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="bg-white border border-purple-200 p-3 rounded-md">
      <p className="text-sm text-gray-700">{content}</p>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1.5 rounded-md transition-colors"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
