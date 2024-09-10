export default async function Home() {
  const response = await fetch("/api", { cache: "no-cache" });
  return (
    <div className="container mx-auto">
      Results
      <div className="table w-full">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell">Song</div>
            <div className="table-cell">Artist</div>
            <div className="table-cell">Year</div>
          </div>
        </div>
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell">The Sliding Mr. Bones (Next Stop, Pottersville)</div>
            <div className="table-cell">Malcolm Lockyer</div>
            <div className="table-cell">1961</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Witchy Woman</div>
            <div className="table-cell">The Eagles</div>
            <div className="table-cell">1972</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Shining Star</div>
            <div className="table-cell">Earth, Wind, and Fire</div>
            <div className="table-cell">1975</div>
            <div className="table-cell">1975</div>
          </div>
        </div>
      </div>
    </div>
  );
}
