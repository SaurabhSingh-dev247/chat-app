export default function Input({ id, label, ...props }) {
  return (
    <p className="input-controller">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props}  />
    </p>
  );
}
