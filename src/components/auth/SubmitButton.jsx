const SubmitButton = ({ loading, disabled, children }) => (
  <button className="auth-submit" type="submit" disabled={loading || disabled}>
    {loading && <span className="button-spinner" aria-hidden="true" />}
    <span>{loading ? "Please wait..." : children}</span>
    {!loading && <span aria-hidden="true">-&gt;</span>}
  </button>
);

export default SubmitButton;
