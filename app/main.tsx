import React from "react";
import ProtectedRoute from "@/src/auth/ProtectedRoute";

const MainScreen: React.FC = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Bienvenido al menú principal</h1>
      </div>
    </ProtectedRoute>
  );
};

export default MainScreen;
