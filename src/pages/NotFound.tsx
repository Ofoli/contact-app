export default function () {
  return (
    <div data-test="nF-main-div">
      <h1 data-test="nF-h1" className="display-4">
        <span data-test="nF-span" className="text-danger">
          404
        </span>{" "}
        Page Not Found
      </h1>
      <p data-test="nF-p" className="lead">
        Sorry, that page does not exist
      </p>
    </div>
  );
}
