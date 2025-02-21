const Alert = ({ className, ...props }) => (
  <div className={`rounded-lg border p-4 ${className}`} {...props} />
);

const AlertDescription = ({ className, ...props }) => (
  <div className={`text-sm ${className}`} {...props} />
);

export { Alert, AlertDescription };
