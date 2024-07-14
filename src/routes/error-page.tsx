import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

type ErrorResponse = {
  status: number;
  statusText: string;
  message?: string;
};

const ErrorPage = () => {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Unknown Error</h1>
        <p>An unknown error occurred.</p>
      </div>
    );
  }

  const err = error as ErrorResponse;

  return (
    <div className="error-box">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <div>
        <span>Error {err.status}, </span>
        <span>{err.statusText}</span>
      </div>
      {err.message && <p>{err.message}</p>}
      <Link className="btn" to="/">
        To Home page
      </Link>
    </div>
  );
};

export default ErrorPage;
