export const getRoleVariant = (
    role?: string
  ): "primary" | "progreso" | "success" => {
    if (!role) return "primary";

    switch (role.toLowerCase()) {
      case "administrador":
        return "primary";
      case "profesor":
        return "progreso";
      case "alumno":
        return "primary";
      default:
        return "primary";
    }
  };