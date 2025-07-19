import { createPortal } from "react-dom";
import React from "react";
import PropTypes from "prop-types";

export default function Portal({ children }) {
  const portalRoot = document.getElementById("portal-root");
  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center h-6 mt-28 z-50 ml-6">
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg shadow-2xl border border-gray-600">
        {children}
      </div>
    </div>,
    portalRoot
  );
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};