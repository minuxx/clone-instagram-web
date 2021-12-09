import Feed from "./Feed";

function Home() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Feed />
      <Feed />
      <Feed />
      <Feed />
    </div>
  );
}

export default Home;
