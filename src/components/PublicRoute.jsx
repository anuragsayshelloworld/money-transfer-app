import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import React from 'react';

export default function PublicRoute({ children }) {
  
    const isAuthenticated = !!localStorage.getItem("MTAToken");

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
                         }
        return children;
                                                   }

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
                        };
