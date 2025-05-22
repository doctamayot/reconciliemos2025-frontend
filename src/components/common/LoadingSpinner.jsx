// src/components/common/LoadingSpinner.jsx

const LoadingSpinner = ({
  size = "md",
  message,
  textColor = "text-gray-600",
  spinnerColor = "border-blue-500",
}) => {
  let spinnerSizeClasses = "w-12 h-12"; // Default medium
  if (size === "sm") {
    spinnerSizeClasses = "w-8 h-8";
  } else if (size === "lg") {
    spinnerSizeClasses = "w-16 h-16";
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div
        className={`${spinnerSizeClasses} ${spinnerColor} border-t-transparent border-solid rounded-full animate-spin`}
        style={{ borderWidth: size === "sm" ? "3px" : "4px" }} // Grosor del borde
      ></div>
      {message && <p className={`mt-3 text-sm ${textColor}`}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
