const Loading: React.FC = () => {
  return (
    <div className="card-body">
      <div className="row">
        <div className="h4 col-6 placeholder-glow">
          <span className="placeholder col-12"></span>
        </div>
        <div className="h4 col-6 placeholder-glow text-end">
          <span className="placeholder col-12"></span>
        </div>
      </div>
      <h5 className="card-title placeholder-glow">
        <span className="placeholder col-6"></span>
      </h5>
      <p className="card-text placeholder-glow">
        <span className="placeholder col-7"></span>
        <span className="placeholder col-4"></span>
        <span className="placeholder col-4"></span>
        <span className="placeholder col-6"></span>
        <span className="placeholder col-8"></span>
      </p>
    </div>
  );
};

export default Loading;
